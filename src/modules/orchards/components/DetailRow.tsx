import CsText from "@/src/components/shared/CsText";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";

export default function DetailRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <View className="flex-row justify-between py-2">
      <CsText style={[typography.subtitle_xs_semibold]}>
        {label}
      </CsText>
      <CsText className="text-right max-w-[60%]" style={[typography.subtitle_xs_medium]}>
        {value !== undefined && value !== null && value !== ""
          ? String(value)
          : "-"}
      </CsText>
    </View>
  );
}
