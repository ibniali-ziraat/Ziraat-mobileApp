import { Text, View } from "react-native";

export default function AreaBadge({ value, unit }) {
  return (
    <View className="absolute top-12 self-center bg-black/70 px-4 py-2 rounded-full">
      <Text className="text-white font-bold">
        {value} {unit}
      </Text>
    </View>
  );
}
