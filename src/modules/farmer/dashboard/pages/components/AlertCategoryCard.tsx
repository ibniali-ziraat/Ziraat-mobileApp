import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";

export default function AlertSummaryCard({
  icon,
  title,
  value,
  subtitle,
  delay = 0,
}: any) {
  return (
    <View className="w-[48%] h-48">
      <ZiraatCard
        width="100%"
        paddingHorizontal={2}
        paddingVertical={2}
      >
        <View className="h-20 items-center justify-between">

          <View>{icon}</View>


          <CsText style={typography.Poppins_m_semibold} className="text-[16px] text-dark text-center">
            {title}
          </CsText>


          {value && (
            <CsText style={typography.Poppins_m_medium} className="text-[18px] text-dark text-center">
              {value}
            </CsText>
          )}


          {subtitle && (
            <CsText style={typography.Poppins_m_semibold} className=" text-dark text-center">
              {subtitle}
            </CsText>
          )}
        </View>
      </ZiraatCard>
    </View>
  );
}
