// import { useLocationContext } from "@/src/contexts/LocationContext";
// import { useNotification } from "@/src/contexts/NotificationContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
// import { useCallback, useEffect, useState } from "react";
// import { Alert } from "react-native";
// import { StoredNotification } from "../types/Notification.types";

// const STORAGE_KEY = "APP_NOTIFICATIONS";

// function getNotificationImage(
//   notification: FirebaseMessagingTypes.RemoteMessage,
// ): string | undefined {
//   const data = notification?.data as Record<string, any> | undefined;

//   if (data?._richContent?.image) {
//     return data._richContent.image;
//   }

//   return (
//     (notification as any)?.notification?.android?.imageUrl ??
//     (notification as any)?.notification?.apple?.imageUrl
//   );
// }

// export function useNotifications() {
//   const { notification } = useNotification();
//   const { recheck } = useLocationContext();

//   const [items, setItems] = useState<StoredNotification[]>([]);
//   const [refreshing, setRefreshing] = useState(false);

//   // Load saved notifications on app start
//   useEffect(() => {
//     loadNotifications();
//   }, []);

//   const loadNotifications = async () => {
//     try {
//       const stored = await AsyncStorage.getItem(STORAGE_KEY);

//       if (stored) {
//         setItems(JSON.parse(stored));
//       }
//     } catch (error) {
//       console.log("Load notifications error:", error);
//     }
//   };

//   const saveNotifications = async (notifications: StoredNotification[]) => {
//     try {
//       await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
//     } catch (error) {
//       console.log("Save notifications error:", error);
//     }
//   };

//   // Append incoming push notifications
//   useEffect(() => {
//     if (!notification) return;

//     const newNotification: StoredNotification = {
//       id: `${Date.now()}-${Math.random()}`,
//       title: notification.notification?.title ?? "Notification",
//       body: notification.notification?.body,
//       imageUrl: getNotificationImage(notification),
//       receivedAt: Date.now(),
//     };

//     setItems((prev) => {
//       const updated = [newNotification, ...prev];

//       saveNotifications(updated);

//       return updated;
//     });
//   }, [notification]);

//   const deleteOne = useCallback((id: string) => {
//     setItems((prev) => {
//       const updated = prev.filter((n) => n.id !== id);

//       saveNotifications(updated);

//       return updated;
//     });
//   }, []);

//   const deleteAll = useCallback(() => {
//     Alert.alert("Clear All", "Remove all notifications?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Clear All",
//         style: "destructive",
//         onPress: async () => {
//           setItems([]);

//           await AsyncStorage.removeItem(STORAGE_KEY);
//         },
//       },
//     ]);
//   }, []);

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);

//     try {
//       await Promise.all([recheck()]);

//       const stored = await AsyncStorage.getItem(STORAGE_KEY);

//       if (stored) {
//         const parsed = JSON.parse(stored);

//         setItems([...parsed].sort((a, b) => b.receivedAt - a.receivedAt));
//       }
//     } finally {
//       setRefreshing(false);
//     }
//   }, [recheck]);

//   return {
//     items,
//     refreshing,
//     deleteOne,
//     deleteAll,
//     onRefresh,
//   };
// }

import { useLocationContext } from "@/src/contexts/LocationContext";
import { useNotification } from "@/src/contexts/NotificationContext";

import { deleteItem, getItem, setItem } from "@/src/utils/universalSecureToken";
import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { StoredNotification } from "../types/Notification.types";

const STORAGE_KEY = "APP_NOTIFICATIONS";

function getNotificationImage(
  notification: FirebaseMessagingTypes.RemoteMessage,
): string | undefined {
  const data = notification?.data as Record<string, any> | undefined;

  if (data?._richContent?.image) {
    return data._richContent.image;
  }

  return (
    (notification as any)?.notification?.android?.imageUrl ??
    (notification as any)?.notification?.apple?.imageUrl
  );
}

export function useNotifications() {
  const { notification } = useNotification();
  const { recheck } = useLocationContext();

  const [items, setItems] = useState<StoredNotification[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Load saved notifications on app start
  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const stored = await getItem(STORAGE_KEY);

      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (error) {
      console.log("Load notifications error:", error);
    }
  };

  const saveNotifications = async (notifications: StoredNotification[]) => {
    try {
      await setItem(STORAGE_KEY, JSON.stringify(notifications));
    } catch (error) {
      console.log("Save notifications error:", error);
    }
  };

  // Append incoming push notifications
  useEffect(() => {
    if (!notification) return;

    const newNotification: StoredNotification = {
      id: `${Date.now()}-${Math.random()}`,
      title: notification.notification?.title ?? "Notification",
      body: notification.notification?.body,
      imageUrl: getNotificationImage(notification),
      receivedAt: Date.now(),
    };

    setItems((prev) => {
      const updated = [newNotification, ...prev];

      saveNotifications(updated);

      return updated;
    });
  }, [notification]);

  const deleteOne = useCallback((id: string) => {
    setItems((prev) => {
      const updated = prev.filter((n) => n.id !== id);

      saveNotifications(updated);

      return updated;
    });
  }, []);

  const deleteAll = useCallback(() => {
    Alert.alert("Clear All", "Remove all notifications?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear All",
        style: "destructive",
        onPress: async () => {
          setItems([]);

          await deleteItem(STORAGE_KEY);
        },
      },
    ]);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      await Promise.all([recheck()]);

      const stored = await getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        setItems([...parsed].sort((a, b) => b.receivedAt - a.receivedAt));
      }
    } finally {
      setRefreshing(false);
    }
  }, [recheck]);

  return {
    items,
    refreshing,
    deleteOne,
    deleteAll,
    onRefresh,
  };
}
