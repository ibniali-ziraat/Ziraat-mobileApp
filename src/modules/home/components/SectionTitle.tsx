import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function SectionTitle({ title, icon }) {
  return (
    <View className="flex-row items-center mb-3 px-1 mt-4">
      <Ionicons name={icon} size={22} color={colors.secondary} />

      <Text className="text-xl font-semibold text-black ml-2">{title}</Text>
    </View>
  );
}
