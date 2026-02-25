import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";

export default function AlertCategoryCard({
  icon,
  title,
  value,
  subtitle,
  delay = 0,
}: any) {
  return (
    <View className="w-[48%] mb-4">
      <ZiraatCard width="100%" paddingHorizontal={3} paddingVertical={3}>
        <View className="items-center justify-between min-h-[160px]">
          {/* ICON */}
          <View className="mb-2 w-[20px] h-[20px] items-center justify-center">
            {icon}
          </View>

          {/* TITLE */}
          <CsText
            style={typography.Poppins_m_semibold}
            className="text-[14px] text-dark text-center"
          >
            {title}
          </CsText>

          {/* VALUE */}
          {value && (
            <CsText
              style={typography.Poppins_l_semibold}
              className="text-[22px] text-dark text-center mt-1"
            >
              {value}
            </CsText>
          )}

          {/* SUBTITLE */}
          {subtitle && (
            <CsText
              style={typography.Poppins_s_medium}
              className="text-[12px] text-neutral text-center mt-1"
            >
              {subtitle}
            </CsText>
          )}
        </View>
      </ZiraatCard>
    </View>
  );
}
