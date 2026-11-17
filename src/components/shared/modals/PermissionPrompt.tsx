import { useLocationContext } from "@/src/contexts/LocationContext";
import {
  hasNotificationPermission,
  requestNotificationPermission,
} from "@/src/utils/permissions";
import * as Location from "expo-location";
import { useEffect } from "react";

/**
 * Runs once per login: shows the phone's own location dialog, then the
 * notification dialog — no custom screen in front of them. Nothing renders.
 *
 * Only dialogs the OS can still show are requested; a "denied for good"
 * answer is left alone here, and the Home weather card and Notifications
 * screen offer a button to turn it on later.
 */
export default function PermissionPrompt() {
  const { recheck } = useLocationContext();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const location = await Location.getForegroundPermissionsAsync();
        if (location.status !== "granted" && location.canAskAgain) {
          await Location.requestForegroundPermissionsAsync();
        }
        if (cancelled) return;

        if (!(await hasNotificationPermission())) {
          await requestNotificationPermission();
        }
        if (cancelled) return;

        // Starts the app-wide location watcher, which wakes up everything
        // waiting on GPS (Home weather, device registration).
        await recheck();
      } catch (err) {
        console.warn("[PermissionPrompt] request failed:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
    // Once per mount; RouteGuard remounts it (keyed by token) on each login.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
