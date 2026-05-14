/**
 * useLocationWatcher
 *
 * Behaviour:
 *  1. On mount, show the native OS location permission dialog once (if not yet decided)
 *  2. If granted  → stream live coords
 *  3. If denied   → status = "denied", coords = null
 *  4. If device GPS off → status = "disabled", coords = null
 *  5. When app returns from background, recheck silently
 *  6. `recheck()` exposed for manual triggers (pull-to-refresh, retry button, etc.)
 *
 * NO polling — call recheck() explicitly when you need a fresh status check.
 */

import * as Location from "expo-location";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

export type LocationStatus =
  | "checking"
  | "granted"
  | "denied"
  | "disabled"
  | "error";

export interface WatchedCoords {
  lat: number;
  lon: number;
  accuracy: number | null;
  heading: number | null;
  speed: number | null;
  altitude: number | null;
  timestamp: number;
}

interface UseLocationWatcherOptions {
  updateInterval?: number;
  accuracy?: Location.Accuracy;
  onUpdate?: (coords: WatchedCoords) => void;
  onStatusChange?: (status: LocationStatus) => void;
}

interface UseLocationWatcherReturn {
  coords: WatchedCoords | null;
  status: LocationStatus;
  recheck: () => Promise<void>;
}

export function useLocationWatcher(
  options: UseLocationWatcherOptions = {},
): UseLocationWatcherReturn {
  const {
    updateInterval = 5000,
    accuracy = Location.Accuracy.Balanced,
    onUpdate,
    onStatusChange,
  } = options;

  const [coords, setCoords] = useState<WatchedCoords | null>(null);
  const [status, setStatus] = useState<LocationStatus>("checking");

  const watchRef = useRef<Location.LocationSubscription | null>(null);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const isStartingRef = useRef(false);
  const hasPromptedRef = useRef(false);

  const updateStatus = useCallback(
    (next: LocationStatus) => {
      setStatus((prev) => {
        if (prev === next) return prev;
        onStatusChange?.(next);
        return next;
      });
    },
    [onStatusChange],
  );

  const stopWatcher = useCallback(() => {
    if (watchRef.current) {
      watchRef.current.remove();
      watchRef.current = null;
    }
  }, []);

  const startWatcher = useCallback(async () => {
    if (isStartingRef.current) return;
    isStartingRef.current = true;

    try {
      const providerEnabled = await Location.hasServicesEnabledAsync();
      if (!providerEnabled) {
        stopWatcher();
        setCoords(null);
        updateStatus("disabled");
        return;
      }

      const { status: currentPerm } =
        await Location.getForegroundPermissionsAsync();
      let finalPerm = currentPerm;

      if (currentPerm === "undetermined" && !hasPromptedRef.current) {
        hasPromptedRef.current = true;
        const { status: requested } =
          await Location.requestForegroundPermissionsAsync();
        finalPerm = requested;
      }

      if (finalPerm !== "granted") {
        stopWatcher();
        setCoords(null);
        updateStatus("denied");
        return;
      }

      // Stop existing watcher before starting a fresh one
      stopWatcher();

      watchRef.current = await Location.watchPositionAsync(
        {
          accuracy,
          timeInterval: updateInterval,
          distanceInterval: 10,
        },
        (location) => {
          const next: WatchedCoords = {
            lat: location.coords.latitude,
            lon: location.coords.longitude,
            accuracy: location.coords.accuracy ?? null,
            heading: location.coords.heading ?? null,
            speed: location.coords.speed ?? null,
            altitude: location.coords.altitude ?? null,
            timestamp: location.timestamp,
          };
          setCoords(next);
          updateStatus("granted");
          onUpdate?.(next);
        },
      );

      updateStatus("granted");
    } catch (err: any) {
      console.warn("[useLocationWatcher] error:", err?.message ?? err);
      updateStatus("error");
    } finally {
      isStartingRef.current = false;
    }
  }, [accuracy, updateInterval, onUpdate, updateStatus, stopWatcher]);

  // Mount
  useEffect(() => {
    startWatcher();
    return () => stopWatcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recheck when app comes to foreground
  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      const prev = appStateRef.current;
      appStateRef.current = nextState;

      const comingToForeground =
        (prev === "background" || prev === "inactive") &&
        nextState === "active";

      if (comingToForeground) {
        setTimeout(() => startWatcher(), 350);
      }
    };

    const sub = AppState.addEventListener("change", handleAppStateChange);
    return () => sub.remove();
  }, [startWatcher]);

  // Call this from pull-to-refresh, a retry button, etc.
  const recheck = useCallback(async () => {
    updateStatus("checking");
    await startWatcher();
  }, [startWatcher, updateStatus]);

  return { coords, status, recheck };
}
