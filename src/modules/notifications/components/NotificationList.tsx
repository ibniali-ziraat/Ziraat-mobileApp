import { colors } from "@/src/constants/colors";
import { Text, View } from "react-native";
import { StoredNotification } from "../types/Notification.types";
import SwipeableNotificationCard from "./Swipeablenotificationcard";

interface Props {
  items: StoredNotification[];
  onDelete: (id: string) => void;
}

export default function NotificationList({ items, onDelete }: Props) {
  return (
    <View className="mt-1">
      <Text
        className="text-[11.5px] font-normal mb-[10px]"
        style={{ color: colors.darkHover }}
      >
        ← swipe left to delete
      </Text>

      {items.map((item) => (
        <SwipeableNotificationCard
          key={item.id}
          item={item}
          onDelete={onDelete}
        />
      ))}
    </View>
  );
}
