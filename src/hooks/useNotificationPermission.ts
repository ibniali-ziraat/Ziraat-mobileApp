import {
  enableNotifications,
  hasNotificationPermission,
} from "@/src/utils/permissions";
import { useCallback, useEffect, useState } from "react";
import { AppState } from "react-native";

/**
 * Live notification permission. Re-checks whenever the app returns to the
 * foreground, so turning it on in Settings updates the screen straight away.
 */
export function useNotificationPermission() {
  const [granted, setGranted] = useState<boolean | null>(null);

  const check = useCallback(async () => {
    try {
      setGranted(await hasNotificationPermission());
    } catch {
      setGranted(true); // can't tell — don't nag
    }
  }, []);

  useEffect(() => {
    check();
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") check();
    });
    return () => sub.remove();
  }, [check]);

  const enable = useCallback(async () => {
    await enableNotifications();
    await check();
  }, [check]);

  return { granted, enable };
}
