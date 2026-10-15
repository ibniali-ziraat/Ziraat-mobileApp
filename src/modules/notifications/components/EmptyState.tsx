import { notificationArt } from "@/src/constants/iconArt";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <SvgXml xml={notificationArt.empty} width={150} height={150} />

      <Text className="mt-4 text-xl font-semibold text-center">
        No notifications
      </Text>

      <Text className="mt-2 text-sm font-normal text-center text-gray-500">
        We will let you know when there's something new to see.
      </Text>
    </View>
  );
}
