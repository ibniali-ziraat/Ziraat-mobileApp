import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { View } from "react-native";

export default function AlertSummaryCard({
  icon,
  title,
  value,
  subtitle,
  delay = 0,
}: any) {
  return (
    <View className="w-[49%] h-60 mb-4">
      <ZiraatCard
        width="100%"
        paddingHorizontal={2}
        paddingVertical={2}
      >
        <View className="h-full items-center justify-between">
          {/* ICON */}
          <View>{icon}</View>

          {/* TITLE */}
          <CsText className="text-[14px] font-semibold text-dark text-center">
            {title}
         </CsText>

          {/* VALUE */}
          <CsText className="text-[18px] font-bold text-black text-center">
            {value}
         </CsText>

          {/* SUBTITLE */}
          {subtitle && (
            <CsText className="text-sm text-neutral-500 text-center">
              {subtitle}
           </CsText>
          )}
        </View>
      </ZiraatCard>
    </View>
  );
}
