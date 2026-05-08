import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import CsText from "./CsText";

export default function HeaderBar({ title, icon }) {
  return (
    <View className="flex-row items-center justify-between px-4 py-4 bg-primary">
      <Pressable>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </Pressable>

      <CsText className="text-white font-semibold text-lg">{title}</CsText>

      <Ionicons name={icon} size={28} color="#fff" />
    </View>
  );
}
