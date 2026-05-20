import { useNotification } from "@/src/contexts/NotificationContext";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export default function GlobalBanner() {
  const { onForegroundMessage } = useNotification();

  useEffect(() => {
    const unsub = onForegroundMessage(async (msg) => {
      const title = msg.notification?.title ?? "New notification";
      const body = msg.notification?.body ?? "";

      // Schedule a local notification immediately to show system UI
      await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: body,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          // Pass any data you need for navigation
          data: msg.data || {},
        },
        trigger: null, // Show immediately
      });
    });

    return unsub;
  }, [onForegroundMessage]);

  // This component no longer renders UI, it just triggers system notifications
  return null;
}
