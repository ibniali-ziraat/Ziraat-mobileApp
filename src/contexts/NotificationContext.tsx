import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const STORAGE_KEY = "ziraat_notifications";

export type Notification = {
    id: number;
    title: string;
    message: string;
    time: string;
};

type NotificationContextType = {
    notifications: Notification[];
    addNotification: (notif: Notification) => void;
    removeNotification: (id: number) => void;
    clearAll: () => void;
};

const NotificationContext = createContext<NotificationContextType>({
    notifications: [],
    addNotification: () => { },
    removeNotification: () => { },
    clearAll: () => { },
});

export function NotificationProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const load = async () => {
            const raw = await AsyncStorage.getItem(STORAGE_KEY);
            if (raw) setNotifications(JSON.parse(raw));
        };
        load();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    }, [notifications]);

    // 🔥 KEY FIX: deduplicate only by ID, not title+message+time
    // This prevents the listener from blocking valid new notifications
    const addNotification = useCallback((notif: Notification) => {
        setNotifications((prev) => {
            const exists = prev.some((n) => n.id === notif.id);
            if (exists) return [...prev];
            return [notif, ...prev].slice(0, 20);
        });
    }, []);

    const removeNotification = useCallback((id: number) => {
        setNotifications((prev) => [...prev.filter((n) => n.id !== id)]);
    }, []);

    const clearAll = useCallback(() => {
        setNotifications([]);
        AsyncStorage.removeItem(STORAGE_KEY);
    }, []);

    return (
        <NotificationContext.Provider
            value={{ notifications, addNotification, removeNotification, clearAll }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotifications = () => useContext(NotificationContext);