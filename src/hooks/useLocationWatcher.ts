/**
 * useLocationWatcher
 *
 * The approach used by Google Maps, Uber, Zomato:
 *  1. Ask for permission once (mandatory gate handled by LocationPermissionModal)
 *  2. Start a live watchPositionAsync subscription — coords update as user moves
 *  3. Listen to AppState changes — when the app comes to foreground after being
 *     backgrounded (e.g. user went to Settings to toggle location), recheck
 *     permission and restart the watcher if it was off
 *  4. Detect if the device's location services are disabled at the OS level
 *     and surface that separately so the UI can show the right prompt
 *
 * Usage:
 *   const { coords, status, accuracy } = useLocationWatcher();
 *
 *  status:
 *   "checking"   – initial load
 *   "granted"    – live position available
 *   "denied"     – permission denied (show gate)
 *   "disabled"   – device GPS is off at OS level (show OS-level prompt)
 *   "error"      – unexpected error
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
  accuracy: number | null; // metres
  heading: number | null;
  speed: number | null; // m/s
  altitude: number | null;
  timestamp: number;
}

interface UseLocationWatcherOptions {
  /** How often to update in milliseconds (default 5000ms = 5s) */
  updateInterval?: number;
  /** expo-location accuracy preset (default Balanced) */
  accuracy?: Location.Accuracy;
  /** Called every time coords update */
  onUpdate?: (coords: WatchedCoords) => void;
  /** Called when permission/status changes */
  onStatusChange?: (status: LocationStatus) => void;
}

interface UseLocationWatcherReturn {
  coords: WatchedCoords | null;
  status: LocationStatus;
  /** Manually trigger a one-shot recheck (e.g. after opening Settings) */
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

  // Keep a ref to the active subscription so we can remove it
  const watchRef = useRef<Location.LocationSubscription | null>(null);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  // Prevent double-starting when AppState fires rapidly
  const isStartingRef = useRef(false);

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
      // 1. Check device-level GPS (provider enabled)
      const providerEnabled = await Location.hasServicesEnabledAsync();
      if (!providerEnabled) {
        stopWatcher();
        updateStatus("disabled");
        isStartingRef.current = false;
        return;
      }

      // 2. Check app-level permission
      const { status: permStatus } =
        await Location.getForegroundPermissionsAsync();
      if (permStatus !== "granted") {
        stopWatcher();
        updateStatus("denied");
        isStartingRef.current = false;
        return;
      }

      // 3. Stop any existing subscription before creating a new one
      stopWatcher();

      // 4. Subscribe to live position updates
      watchRef.current = await Location.watchPositionAsync(
        {
          accuracy,
          timeInterval: updateInterval,
          distanceInterval: 10, // also update if moved 10m
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

  // ── Mount: start watcher
  useEffect(() => {
    startWatcher();
    return () => stopWatcher();
  }, []);

  // ── AppState: recheck when app comes to foreground
  // This is the key pattern used by top apps — catches the moment the user
  // returns from Settings after granting/revoking location.
  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      const prev = appStateRef.current;
      appStateRef.current = nextState;

      const comingToForeground =
        (prev === "background" || prev === "inactive") &&
        nextState === "active";

      if (comingToForeground) {
        // Small delay so the OS has time to reflect the new permission state
        setTimeout(() => startWatcher(), 350);
      }

      // If going to background, keep the watcher alive for a short grace
      // period (foreground location is fine; background needs extra perms).
      // On iOS the OS will suspend delivery anyway.
    };

    const sub = AppState.addEventListener("change", handleAppStateChange);
    return () => sub.remove();
  }, [startWatcher]);

  // ── Manual recheck (called by the modal after Linking.openSettings resolves)
  const recheck = useCallback(async () => {
    updateStatus("checking");
    await startWatcher();
  }, [startWatcher, updateStatus]);

  return { coords, status, recheck };
}
