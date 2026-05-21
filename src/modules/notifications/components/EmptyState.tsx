import { colors } from "@/src/constants/colors";
import { Bell } from "lucide-react-native";
import { Text, View } from "react-native";

export default function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Bell size={70} color={colors.primary || "green"} strokeWidth={1.5} />

      <Text className="mt-4 text-xl font-semibold text-center">
        No notifications
      </Text>

      <Text className="mt-2 text-sm font-normal text-center text-gray-500">
        We will let you know when there's something new to see.
      </Text>
    </View>
  );
}
