/**
 * NotificationContext
 *
 * - Background / quit state: Firebase shows OS system tray notification automatically.
 * - Foreground: Firebase suppresses system notification.
 *   We fire `onForegroundMessage` listeners so GlobalBanner can show the in-app banner.
 *
 * NOTE: No AppState gate here — messaging().onMessage already ONLY fires in foreground.
 */

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
import { Platform } from "react-native";

type MessageHandler = (msg: FirebaseMessagingTypes.RemoteMessage) => void;

interface NotificationContextValue {
  notification: FirebaseMessagingTypes.RemoteMessage | null;
  onForegroundMessage: (cb: MessageHandler) => () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] =
    useState<FirebaseMessagingTypes.RemoteMessage | null>(null);

  // Ref so listeners are always current without re-running the onMessage effect
  const listenersRef = useRef<Set<MessageHandler>>(new Set());

  useEffect(() => {
    // messaging().onMessage fires ONLY when app is foreground — no AppState check needed
    if (Platform.OS === "web") return;
    const unsubForeground = messaging().onMessage(async (msg) => {
      setNotification(msg);
      listenersRef.current.forEach((cb) => cb(msg));
    });

    // User tapped a background notification
    const unsubOpened = messaging().onNotificationOpenedApp((msg) => {
      setNotification(msg);
    });

    // App launched from quit state via notification tap
    messaging()
      .getInitialNotification()
      .then((msg) => {
        if (msg) setNotification(msg);
      });

    return () => {
      unsubForeground();
      unsubOpened();
    };
  }, []);

  // Stable reference — consumers can safely put this in a useEffect dep array
  const onForegroundMessage = useCallback((cb: MessageHandler) => {
    listenersRef.current.add(cb);
    return () => {
      listenersRef.current.delete(cb);
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, onForegroundMessage }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useNotification must be used inside <NotificationProvider>",
    );
  return ctx;
}
