import { Text, View } from "react-native";

export default function NotificationBadge() {
  return (
    <View className="absolute -top-1 -right-1 min-w-4 h-4 rounded-full bg-red-500 items-center justify-center px-1 z-10">
      <Text className="text-[9px] font-bold text-white leading-none">0</Text>
    </View>
  );
}
