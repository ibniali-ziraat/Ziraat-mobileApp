import { useNotifications } from "@/src/contexts/NotificationContext";
import { Text, View } from "react-native";

export default function NotificationBadge() {
    const { notifications } = useNotifications();

    if (notifications.length === 0) return null;

    return (
        <View className="absolute -top-1 -right-1 min-w-4 h-4 rounded-full bg-red-500 items-center justify-center px-1 z-10">
            <Text className="text-[9px] font-bold text-white leading-none">
                {notifications.length > 99 ? "99+" : notifications.length}
            </Text>
        </View>
    );
}