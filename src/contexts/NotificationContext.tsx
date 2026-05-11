import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface NotificationContextType {
  fcmToken: string | null;
  notification: FirebaseMessagingTypes.RemoteMessage | null;
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

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<FirebaseMessagingTypes.RemoteMessage | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const tokenRefreshUnsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          setError(new Error("Push notification permission denied"));
          return;
        }

        const token = await messaging().getToken();
        console.log("FCM Token:", token);
        setFcmToken(token);

        tokenRefreshUnsubscribeRef.current = messaging().onTokenRefresh(
          (newToken) => {
            console.log("FCM Token refreshed:", newToken);
            setFcmToken(newToken);
          },
        );
      } catch (err) {
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
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("🔔 Foreground notification:", remoteMessage);
      setNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  // ─── Background / quit state ──────────────────────────────────────────────
  useEffect(() => {
    const unsubscribeOpened = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        console.log("🔔 Opened from background:", remoteMessage);
        setNotification(remoteMessage);
      },
    );

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("🔔 Opened from quit state:", remoteMessage);
          setNotification(remoteMessage);
        }
      });

    return unsubscribeOpened;
  }, []);

  return (
    <NotificationContext.Provider value={{ fcmToken, notification, error }}>
      {children}
    </NotificationContext.Provider>
  );
};
