import { MotiView } from "moti";
import { Text, View } from "react-native";

export default function AlertSummaryCard({
  icon,
  title,
  value,
  subtitle,
  delay,
}: any) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay }}
      className="bg-white rounded-xl border border-dark p-4 mb-4 flex-row items-center"
    >
      <View className="p-3 rounded-xl mr-4">{icon}</View>
      <View className="flex-1">
        <Text className="text-2xl text-dark">{title}</Text>
        <Text className="text-xl">{value}</Text>
        <Text className="text-sm text-neutral-500 mt-1">{subtitle}</Text>
      </View>
    </MotiView>
  );
}
