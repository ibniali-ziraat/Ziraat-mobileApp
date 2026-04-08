import { useNotifications } from "@/src/contexts/NotificationContext";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import ziraatNotifications from "../data/ziraatNotifications.json";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

async function requestPermission() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        return newStatus === "granted";
    }
    return true;
}

async function setupAndroidChannel() {
    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("ziraat-alerts", {
            name: "Ziraat Alerts",
            importance: Notifications.AndroidImportance.HIGH,
        });
    }
}

export const useAutoNotifications = () => {
    const { addNotification } = useNotifications();

    const indexRef = useRef(0);
    const isRunning = useRef(false);
    const addNotificationRef = useRef(addNotification);

    useEffect(() => {
        addNotificationRef.current = addNotification;
    }, [addNotification]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let notificationListener: any;

        const init = async () => {
            if (isRunning.current) return;
            isRunning.current = true;

            const granted = await requestPermission();
            await setupAndroidChannel();

            // 🔥 Listener is DISABLED as source of truth to avoid duplicates.
            // The interval calls addNotification directly — that's the single source.
            // Listener only handles external/background notifications (not ours).
            notificationListener =
                Notifications.addNotificationReceivedListener((notification) => {
                    const { data } = notification.request.content;
                    if (data?.source === "ziraat") return; // ✅ skip our own
                });

            interval = setInterval(async () => {
                const item =
                    ziraatNotifications[indexRef.current % ziraatNotifications.length];

                // 🔥 Single stable ID — used for dedup in context
                const id = Date.now();

                const newNotif = {
                    id,
                    title: item.title,
                    message: item.message,
                    time: new Date().toLocaleTimeString(),
                };

                // ✅ Update UI immediately (context → FlatList re-renders)
                addNotificationRef.current(newNotif);

                // ✅ Show system banner notification
                if (granted) {
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title: item.title,
                            body: item.message,
                            data: { source: "ziraat", id },
                        },
                        trigger: null,
                    });
                }

                indexRef.current++;
            }, 15000);
        };

        init();

        return () => {
            if (interval) clearInterval(interval);
            if (notificationListener) {
                Notifications.removeNotificationSubscription(notificationListener);
            }
            isRunning.current = false;
        };
    }, []);
};