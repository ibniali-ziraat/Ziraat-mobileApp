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
import { AppState, Platform } from "react-native";

import { getAdvisoryLinkFromSignalR } from "../modules/farmer-advisories/utils/advisoryNotification";
import { StoredNotification } from "../modules/notifications/types/Notification.types";
import {
  mapRemoteMessageToStoredNotification,
  mergeNotifications,
  NOTIFICATIONS_STORAGE_KEY,
  readStoredNotifications,
} from "../modules/notifications/utils/notificationStorage";
import { useSignalR } from "./SignalRContext";

type MessageHandler = (msg: FirebaseMessagingTypes.RemoteMessage) => void;

interface NotificationContextValue {
  notification: FirebaseMessagingTypes.RemoteMessage | null;
  // the push the user tapped to open the app (not foreground messages)
  openedNotification: FirebaseMessagingTypes.RemoteMessage | null;
  clearOpenedNotification: () => void;

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

const STORAGE_KEY = NOTIFICATIONS_STORAGE_KEY;

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
  const advisory = getAdvisoryLinkFromSignalR(
    detail.notificationName,
    properties,
  );

  return {
    id: String(payload.id),
    title: properties?.Title ?? detail.notificationName ?? "Notification",
    body: buildSignalRBody(properties),
    receivedAt: Number.isNaN(createdOn) ? Date.now() : createdOn,
    isRead: false,
    ...(advisory ? { advisory } : {}),
  };
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { onNotification, isConnected: socketConnected } = useSignalR();

  // read inside the FCM listener without re-subscribing it on every change
  const socketConnectedRef = useRef(socketConnected);
  socketConnectedRef.current = socketConnected;

  const [notification, setNotification] =
    useState<FirebaseMessagingTypes.RemoteMessage | null>(null);

  const [openedNotification, setOpenedNotification] =
    useState<FirebaseMessagingTypes.RemoteMessage | null>(null);
  const clearOpenedNotification = useCallback(
    () => setOpenedNotification(null),
    [],
  );

  const [items, setItems] = useState<StoredNotification[]>([]);

  const listenersRef = useRef<Set<MessageHandler>>(new Set());

  /**
   * Persist helper
   */
  const persist = async (data: StoredNotification[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  /**
   * Load from storage on app start and every time the app comes back to the
   * foreground: the FCM background handler saves pushes there while the app is
   * in the background or closed. Merged (not replaced) so nothing added in
   * memory meanwhile is lost.
   */
  useEffect(() => {
    const syncFromStorage = async () => {
      const stored = await readStoredNotifications();
      setItems((prev) => {
        const merged = mergeNotifications(prev, stored);
        if (merged.length !== prev.length) persist(merged);
        return merged;
      });
    };

    syncFromStorage();

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") syncFromStorage();
    });
    return () => subscription.remove();
  }, []);

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
      // keyed by the FCM messageId, so a push already saved by the background
      // handler isn't added twice
      const mapped = mapRemoteMessageToStoredNotification(msg);
      if (mapped) pushStoredNotification(mapped);
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

    // Permission is asked by PermissionPrompt after login, not on launch.

    const unsubForeground = messaging().onMessage(async (msg) => {
      setNotification(msg);

      // while the app is open the socket already delivers this notification;
      // only store the FCM copy if the socket is down, so it shows once
      if (!socketConnectedRef.current) addNotification(msg);

      listenersRef.current.forEach((cb) => cb(msg));
    });

    // tapped while the app was in the background
    const unsubOpened = messaging().onNotificationOpenedApp((msg) => {
      setNotification(msg);
      addNotification(msg);
      setOpenedNotification(msg);
    });

    messaging()
      .getInitialNotification()
      .then((msg) => {
        // tapped while the app was closed
        if (!msg) return;
        setNotification(msg);
        addNotification(msg);
        setOpenedNotification(msg);
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
        openedNotification,
        clearOpenedNotification,
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
