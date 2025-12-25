import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function SectionTitle({ title, icon }) {
  return (
    <View className="flex-row items-center mb-6 px-1 mt-4">
      <Ionicons name={icon} size={22} color={colors.secondary} />

      <CsText style = {[typography.Poppins_m_semibold]} className="text-xl  text-black ml-2">{title}</CsText>
    </View>
  );
}
