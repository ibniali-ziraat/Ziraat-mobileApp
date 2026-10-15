import { colors } from "@/src/constants/colors";
import { advisoryRoutes } from "@/src/modules/farmer-advisories/routes/advisoryRoutes";
import { router } from "expo-router";
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
          <Text className="text-[14px] text-dark">
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
            // only advisory notifications are clickable
            onPress={
              item.advisory
                ? () =>
                    router.push(
                      advisoryRoutes.list(item.advisory!.orchardProfileId),
                    )
                : undefined
            }
          />
        ))}
      </View>
    </View>
  );
}
