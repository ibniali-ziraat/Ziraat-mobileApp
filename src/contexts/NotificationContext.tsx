import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Platform } from "react-native";

// ─── Native-only Firebase Messaging ──────────────────────────────────────────
const isNative = Platform.OS === "ios" || Platform.OS === "android";

let messaging: typeof import("@react-native-firebase/messaging").default;
let FirebaseMessagingTypes: typeof import("@react-native-firebase/messaging");

if (isNative) {
  const messagingModule = require("@react-native-firebase/messaging");

  messaging = messagingModule.default;
  FirebaseMessagingTypes = messagingModule;
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface NotificationContextType {
  fcmToken: string | null;
  notification: any | null;
  error: Error | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }

  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

// ─── Provider ────────────────────────────────────────────────────────────────
export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  const [notification, setNotification] = useState<any | null>(null);

  const [error, setError] = useState<Error | null>(null);

  const tokenRefreshUnsubscribeRef = useRef<(() => void) | null>(null);

  // ─── Init FCM ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isNative) return;

    const init = async () => {
      try {
        const authStatus = await messaging().requestPermission();

        const enabled =
          authStatus ===
            FirebaseMessagingTypes.AuthorizationStatus.AUTHORIZED ||
          authStatus === FirebaseMessagingTypes.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          setError(new Error("Push notification permission denied"));
          return;
        }

        const token = await messaging().getToken();

        console.log("✅ FCM Token:", token);

        setFcmToken(token);

        // ─── Token refresh listener ────────────────────────────────────────
        tokenRefreshUnsubscribeRef.current = messaging().onTokenRefresh(
          (newToken: string) => {
            console.log("🔄 FCM Token refreshed:", newToken);

            setFcmToken(newToken);
          },
        );
      } catch (err) {
        console.log("❌ Notification init error:", err);

        setError(err instanceof Error ? err : new Error(String(err)));
      }
    };

    init();

    return () => {
      tokenRefreshUnsubscribeRef.current?.();
    };
  }, []);

  // ─── Foreground messages ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isNative) return;

    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log("🔔 Foreground notification:", remoteMessage);

      setNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  // ─── Background / quit state ──────────────────────────────────────────────
  useEffect(() => {
    if (!isNative) return;

    const unsubscribeOpened = messaging().onNotificationOpenedApp(
      (remoteMessage: any) => {
        console.log("📲 Opened from background:", remoteMessage);

        setNotification(remoteMessage);
      },
    );

    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {
          console.log("🚀 Opened from quit state:", remoteMessage);

          setNotification(remoteMessage);
        }
      });

    return unsubscribeOpened;
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        fcmToken,
        notification,
        error,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
