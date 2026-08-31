import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid, Platform } from "react-native";

import { StoredNotification } from "../modules/notifications/types/Notification.types";

type MessageHandler = (msg: FirebaseMessagingTypes.RemoteMessage) => void;

interface NotificationContextValue {
  notification: FirebaseMessagingTypes.RemoteMessage | null;

  items: StoredNotification[];
  count: number;

  addNotification: (msg: FirebaseMessagingTypes.RemoteMessage) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  onForegroundMessage: (cb: MessageHandler) => () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

const STORAGE_KEY = "APP_NOTIFICATIONS";

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] =
    useState<FirebaseMessagingTypes.RemoteMessage | null>(null);

  const [items, setItems] = useState<StoredNotification[]>([]);

  const listenersRef = useRef<Set<MessageHandler>>(new Set());

  /**
   * Load from storage once (app start)
   */
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    })();
  }, []);

  /**
   * Persist helper
   */
  const persist = async (data: StoredNotification[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  /**
   * Add notification (from Firebase or manual)
   */
  const addNotification = useCallback(
    (msg: FirebaseMessagingTypes.RemoteMessage) => {
      const newNotification: StoredNotification = {
        id: `${Date.now()}-${Math.random()}`,
        title: msg.notification?.title ?? "Notification",
        body: msg.notification?.body,
        receivedAt: Date.now(),
      };

      setItems((prev) => {
        const updated = [newNotification, ...prev];
        persist(updated);
        return updated;
      });
    },
    [],
  );

  /**
   * Remove one
   */
  const removeNotification = useCallback((id: string) => {
    setItems((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      persist(updated);
      return updated;
    });
  }, []);

  /**
   * Clear all
   */
  const clearNotifications = useCallback(() => {
    setItems([]);
    AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  /**
   * Firebase listeners
   */
  useEffect(() => {
    if (Platform.OS === "web") return;

    if (Platform.OS === "android" && Platform.Version >= 33) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ).catch((err) =>
        console.warn("[NotificationProvider] permission request failed:", err),
      );
    } else if (Platform.OS === "ios") {
      messaging()
        .requestPermission()
        .catch((err) =>
          console.warn("[NotificationProvider] permission request failed:", err),
        );
    }

    const unsubForeground = messaging().onMessage(async (msg) => {
      setNotification(msg);

      addNotification(msg);

      listenersRef.current.forEach((cb) => cb(msg));
    });

    const unsubOpened = messaging().onNotificationOpenedApp((msg) => {
      setNotification(msg);
    });

    messaging()
      .getInitialNotification()
      .then((msg) => {
        if (msg) setNotification(msg);
      });

    return () => {
      unsubForeground();
      unsubOpened();
    };
  }, [addNotification]);

  /**
   * Foreground listeners (for banner UI etc.)
   */
  const onForegroundMessage = useCallback((cb: MessageHandler) => {
    listenersRef.current.add(cb);

    return () => {
      listenersRef.current.delete(cb);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        items,
        count: items.length,
        addNotification,
        removeNotification,
        clearNotifications,
        onForegroundMessage,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);

  if (!ctx) {
    throw new Error(
      "useNotification must be used inside <NotificationProvider>",
    );
  }

  return ctx;
}
