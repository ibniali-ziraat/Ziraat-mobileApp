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
import { useSignalR } from "./SignalRContext";

type MessageHandler = (msg: FirebaseMessagingTypes.RemoteMessage) => void;

interface NotificationContextValue {
  notification: FirebaseMessagingTypes.RemoteMessage | null;

  items: StoredNotification[];
  count: number;

  addNotification: (msg: FirebaseMessagingTypes.RemoteMessage) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  markAllAsRead: () => void;

  onForegroundMessage: (cb: MessageHandler) => () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

const STORAGE_KEY = "APP_NOTIFICATIONS";

function formatBalanceAmount(balance: number): string {
  return `₹${balance.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function buildSignalRBody(properties: any): string | undefined {
  const parts: string[] = [];

  if (properties?.Message) parts.push(properties.Message);

  if (typeof properties?.Balance === "number") {
    parts.push(`Remaining balance: ${formatBalanceAmount(properties.Balance)}`);
  }

  return parts.length ? parts.join(" — ") : undefined;
}

function mapSignalRPayloadToStoredNotification(
  payload: any,
): StoredNotification | null {
  const detail = payload?.detail;
  const properties = detail?.data?.properties;

  if (!payload?.id || !detail) return null;

  const createdOn = detail.createdOn ? Date.parse(detail.createdOn) : NaN;

  return {
    id: String(payload.id),
    title: properties?.Title ?? detail.notificationName ?? "Notification",
    body: buildSignalRBody(properties),
    receivedAt: Number.isNaN(createdOn) ? Date.now() : createdOn,
    isRead: false,
  };
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { onNotification } = useSignalR();

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
   * Push a notification into the list + persist, deduping by id
   */
  const pushStoredNotification = useCallback(
    (newNotification: StoredNotification) => {
      setItems((prev) => {
        if (prev.some((n) => n.id === newNotification.id)) return prev;
        const updated = [newNotification, ...prev];
        persist(updated);
        return updated;
      });
    },
    [],
  );

  /**
   * Add notification (from Firebase or manual)
   */
  const addNotification = useCallback(
    (msg: FirebaseMessagingTypes.RemoteMessage) => {
      pushStoredNotification({
        id: `${Date.now()}-${Math.random()}`,
        title: msg.notification?.title ?? "Notification",
        body: msg.notification?.body,
        receivedAt: Date.now(),
        isRead: false,
      });
    },
    [pushStoredNotification],
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
   * Mark every stored notification as read (called when the user views the
   * notifications list) — the badge count only reflects unread items.
   */
  const markAllAsRead = useCallback(() => {
    setItems((prev) => {
      if (prev.every((n) => n.isRead)) return prev;
      const updated = prev.map((n) => ({ ...n, isRead: true }));
      persist(updated);
      return updated;
    });
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
   * SignalR socket notifications
   */
  useEffect(() => {
    const unsubscribe = onNotification((payload) => {
      const mapped = mapSignalRPayloadToStoredNotification(payload);
      if (mapped) pushStoredNotification(mapped);
    });

    return unsubscribe;
  }, [onNotification, pushStoredNotification]);

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
        count: items.filter((n) => !n.isRead).length,
        addNotification,
        removeNotification,
        clearNotifications,
        markAllAsRead,
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
