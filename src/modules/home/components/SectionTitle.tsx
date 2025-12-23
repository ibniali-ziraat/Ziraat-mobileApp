import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function SectionTitle({ title, icon }) {
  return (
    <View className="flex-row items-center mb-6 px-1 mt-4">
      <Ionicons name={icon} size={22} color={colors.secondary} />

      <CsText variant="subheading" className="text-xl  text-black ml-2">{title}</CsText>
    </View>
  );
}
