import { useLocationStatus } from "@/src/contexts/LocationContext";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";

/**
 * `prompt: false` never shows the OS dialog: it waits for PermissionPrompt
 * (after login) and re-runs once the watcher reports "granted".
 */
export function useLocation(
  enabled: boolean = true,
  { prompt = true }: { prompt?: boolean } = {},
) {
  const watcherGranted = useLocationStatus() === "granted";
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Check if the physical hardware/switch is ON
        const enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
          setError("Location services are disabled. Please turn on GPS.");
          setLoading(false);
          return;
        }

        // 2. Check for App Permissions
        const { status } = prompt
          ? await Location.requestForegroundPermissionsAsync()
          : await Location.getForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission denied. We need location for local weather.");
          setLoading(false);
          return;
        }

        // 3. Get the Position (falls back to the last known fix if a fresh
        // GPS lock takes too long, rather than hanging indefinitely)
        const loc = await Promise.race([
          Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          }),
          new Promise<null>((resolve) =>
            setTimeout(() => resolve(null), 15000),
          ),
        ]).then((result) => result ?? Location.getLastKnownPositionAsync({}));

        if (!loc) {
          console.warn(
            "[useLocation] no fix (timed out, no last-known either)",
          );
          setError("Unable to find location.");
          setLoading(false);
          return;
        }

        setCoords({
          lat: loc.coords.latitude,
          lon: loc.coords.longitude,
        });
      } catch (err) {
        console.warn("[useLocation] error:", err);
        setError("Unable to find location.");
      } finally {
        setLoading(false);
      }
    })();
    // watcherGranted: re-run when permission is granted from PermissionPrompt.
  }, [enabled, prompt, requestVersion, watcherGranted]);

  const retry = useCallback(() => setRequestVersion((value) => value + 1), []);

  return { coords, loading, error, retry };
}
