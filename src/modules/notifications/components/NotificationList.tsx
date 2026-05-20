import { Text, View } from "react-native";
import { StoredNotification } from "../types/Notification.types";
import SwipeableNotificationCard from "./Swipeablenotificationcard";

interface Props {
  items: StoredNotification[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export default function NotificationList({
  items,
  onDelete,
  onClearAll,
}: Props) {
  return (
    <View className="mt-2">
      {items.length > 0 && (
        <Text className="text-[12px] mb-3 text-dark">
          ⬅ Swipe left to delete notification
        </Text>
      )}

      <View className="gap-3">
        {items.map((item) => (
          <SwipeableNotificationCard
            key={item.id}
            item={item}
            onDelete={onDelete}
          />
        ))}
      </View>
    </View>
  );
}
