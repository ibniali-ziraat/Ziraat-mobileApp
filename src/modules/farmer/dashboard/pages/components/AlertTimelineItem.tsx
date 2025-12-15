import { MotiView } from "moti";
import { Text, View } from "react-native";

export default function AlertTimelineItem({
  icon,
  message,
  time,
  index,
}: any) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 15 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 100 * index }}
      className="bg-light rounded-xl border border-dark p-4 flex-row items-start mb-3"
    >
      <View className="mr-4 mt-1">{icon}</View>
      <View className="flex-1">
        <Text className="text-xl font-semibold">{message}</Text>
        <Text className="text-sm text-neutral-500 mt-1">{time}</Text>
      </View>
    </MotiView>
  );
}
