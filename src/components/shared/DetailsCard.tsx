import { Text, View } from "react-native";

export default function DetailCard({ title, value }) {
  return (
    <View className="bg-white p-3 rounded-lg">
      <Text className="text-sm text-gray-500">{title}</Text>
      <Text className="text-base font-semibold text-gray-800">
        {value || "N/A"}
      </Text>
    </View>
  );
}
