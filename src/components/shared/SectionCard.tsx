import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import CsText from "./CsText";

const SectionCard = ({ title, desc, icon }) => (
  <View className="flex-1 flex-row items-center bg-white p-4 rounded-xl mx-1 shadow-sm">
    <Ionicons name={icon} size={28} color={colors.primary} />
    <View className="ml-3">
      <CsText className="text-base font-semibold">{title}</CsText>
      <CsText className="text-grayText text-xs">{desc}</CsText>
    </View>
  </View>
);
export default SectionCard;
