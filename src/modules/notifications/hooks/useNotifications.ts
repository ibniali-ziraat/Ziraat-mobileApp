import { useLocationContext } from "@/src/contexts/LocationContext";
import { useNotification } from "@/src/contexts/NotificationContext";
import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { StoredNotification } from "../types/Notification.types";

function getNotificationImage(
  notification: FirebaseMessagingTypes.RemoteMessage,
): string | undefined {
  const data = notification?.data as Record<string, any> | undefined;
  if (data?._richContent?.image) return data._richContent.image;
  return (
    (notification as any)?.notification?.android?.imageUrl ??
    (notification as any)?.notification?.apple?.imageUrl
  );
}

export function useNotifications() {
  const { notification } = useNotification();
  const { recheck } = useLocationContext(); // ← pull recheck from shared context
  const [items, setItems] = useState<StoredNotification[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Append incoming push notifications
  useEffect(() => {
    if (!notification) return;
    setItems((prev) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        title: notification.notification?.title ?? "Notification",
        body: notification.notification?.body,
        imageUrl: getNotificationImage(notification),
        receivedAt: Date.now(),
      },
      ...prev,
    ]);
  }, [notification]);

  const deleteOne = useCallback((id: string) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const deleteAll = useCallback(() => {
    Alert.alert("Clear All", "Remove all notifications?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear All",
        style: "destructive",
        onPress: () => setItems([]),
      },
    ]);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        recheck(),
        // fetchNotificationsFromServer(), // add your API call here
      ]);
      setItems((prev) => [...prev].sort((a, b) => b.receivedAt - a.receivedAt));
    } finally {
      setRefreshing(false);
    }
  }, [recheck]);

  return { items, refreshing, deleteOne, deleteAll, onRefresh };
}
