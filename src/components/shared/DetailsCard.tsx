import { Text, View } from "react-native";

export default function DetailCard({ title, value }) {
  return (
    <View className="bg-white py-3 rounded-lg shadow-sm">
      <Text className="text-sm text-gray-500">{title}</Text>
      <Text className="text-base font-semibold text-gray-800">
        {value || "N/A"}
      </Text>
    </View>
  );
}
