import CsText from "@/src/components/shared/CsText";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";

interface DetailRowProps {
  label: string;
  value?: string;
}

export default function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View className="flex-row justify-between py-1">
      <CsText style={typography.Poppins_xs_medium}>{label}</CsText>
      <CsText style={typography.Poppins_xs_regular}>{value || "-"}</CsText>
    </View>
  );
}
