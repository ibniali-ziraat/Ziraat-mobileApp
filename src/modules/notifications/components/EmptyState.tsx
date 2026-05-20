import { colors } from "@/src/constants/colors";
import { Bell } from "lucide-react-native";
import { Text, View } from "react-native";

export default function EmptyState() {
  return (
    <View className="h-full items-center justify-center">
      <Bell size={70} color={colors.primary || "green"} strokeWidth={1.5} />

      <Text className="mt-4 text-xl font-semibold">No notifications</Text>

      <Text className="text-sm font-normal">
        We will let you know when there's something new to see.
      </Text>
    </View>
  );
}
