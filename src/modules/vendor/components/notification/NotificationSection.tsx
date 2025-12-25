// components/notifications/NotificationSection.jsx
import { View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Animated, { FadeInDown } from "react-native-reanimated";

import CsText from "@/src/components/shared/CsText";
import NotificationItem from "./NotificationItem";
import NotificationSwipeActions from "./NotificationSwipeAction";


export default function NotificationSection({
  title,
  items,
  colors,
  markRead,
  removeItem,
}) {
  if (!items.length) return null;

  return (
    <View className="mb-4">
      <CsText className="text-gray-700 font-bold mb-2">{title}</CsText>

      {items.map((n, i) => (
        <Animated.View key={n.id} entering={FadeInDown.delay(i * 100)}>
          <Swipeable
            renderRightActions={() => (
              <NotificationSwipeActions
                item={n}
                markRead={markRead}
                removeItem={removeItem}
              />
            )}
          >
            <NotificationItem n={n} colors={colors} />
          </Swipeable>
        </Animated.View>
      ))}
    </View>
  );
}
