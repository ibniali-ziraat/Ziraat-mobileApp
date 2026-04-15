// useNotificationNavigation.ts
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export function useNotificationNavigation() {
  const router = useRouter();

  useEffect(() => {
    // ✅ Cold launch — app was killed when notification was tapped
    const lastResponse = Notifications.getLastNotificationResponse();
    if (lastResponse?.notification) {
      router.push("/notifications");
    }

    // ✅ Foreground / background — app was running when notification was tapped
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
