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
    <View className="w-full mb-3">
      <ZiraatCard paddingHorizontal={1} paddingVertical={1}>
        <View className="flex-row items-start">

          {/* ICON / INDICATOR */}
          <View
            className="w-[10px] h-[10px] rounded-full items-center justify-center mr-3"
          
          >
            {icon}
          </View>

          {/* CONTENT */}
          <View className="flex-1">
            {/* TITLE */}
            <CsText className="text-[18px] font-semibold text-dark">
              {title}
            </CsText>

            {/* VALUE */}
            {value && (
              <CsText className="text-[12px] font-bold text-dark mt-1">
                {value}
              </CsText>
            )}

            {/* SUBTITLE */}
            {subtitle && (
              <CsText className="text-[15px] text-neutral mt-1">
                {subtitle}
              </CsText>
            )}
          </View>
        </View>
      </ZiraatCard>
    </View>
  );
}
