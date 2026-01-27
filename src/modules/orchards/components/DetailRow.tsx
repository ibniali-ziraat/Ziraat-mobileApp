import CsText from "@/src/components/shared/CsText";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";

interface DetailRowProps {
  label: string;
  value?: string;
  isLast?: boolean;
}

export default function DetailRow({ label, value, isLast }: DetailRowProps) {
  return (
    <View className="py-3">
      <View className="flex-row justify-between items-start">
        {/* Label */}
        <View className="w-[45%] flex-row items-center">
          <View  
         />

          <CsText style={typography.Poppins_xs_medium} numberOfLines={1}>
            {label}:
          </CsText>
        </View>

        {/* Value */}
        <View className="w-[55%] items-end">
          <CsText
            style={typography.Poppins_xs_medium}
            className="text-[var(--color-black)] text-right"
            numberOfLines={2}
          >
            {value || "-"}
          </CsText>
        </View>
      </View>

      {/* Divider (hide on last row) */}
      {!isLast && <View className="h-[1px] bg-gray-200 mt-3" />}
    </View>
  );
}
