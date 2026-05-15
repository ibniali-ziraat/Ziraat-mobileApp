import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export function useNotificationNavigation() {
  const router = useRouter();

  // Prevent duplicate navigation
  const handled = useRef(false);

  useEffect(() => {
    const checkInitialNotification = async () => {
      const response = await Notifications.getLastNotificationResponseAsync();

      // Only navigate once
      if (response?.notification && !handled.current) {
        handled.current = true;

        router.push("/notifications");

        // OPTIONAL:
        // Clear badge or cleanup here
      }
    };

    checkInitialNotification();

    // Foreground/background notification taps
    const sub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        if (response?.notification) {
          router.push("/notifications");
        }
      },
    );

    return () => sub.remove();
  }, []);
}
