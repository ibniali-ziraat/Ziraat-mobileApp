import { colors } from "@/src/constants/colors";
import { ArrowLeft } from "lucide-react-native";
import { Text, View } from "react-native";
import { useNotifications } from "../hooks/useNotifications";
import { StoredNotification } from "../types/Notification.types";
import SwipeableNotificationCard from "./Swipeablenotificationcard";

interface Props {
  items: StoredNotification[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export default function NotificationList({ items }: Props) {
  const { removeNotification } = useNotifications();

  return (
    <View className="mt-2">
      {items.length > 0 && (
        <View className="flex-row items-center mb-3 gap-1">
          <ArrowLeft size={12} color={colors.dark} />
          <Text className="text-[12px] text-dark">
            Swipe left to delete notification
          </Text>
        </View>
      )}

      <View className="gap-3">
        {items.map((item) => (
          <SwipeableNotificationCard
            key={item.id}
            item={item}
            onDelete={removeNotification}
          />
        ))}
      </View>
    </View>
  );
}
