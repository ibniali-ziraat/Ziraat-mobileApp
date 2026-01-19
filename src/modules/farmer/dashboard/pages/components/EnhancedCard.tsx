import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";

export default function EnhancedCard({ title, value, accent, icon }) {
  return (
    <ZiraatCard width="100%" paddingVertical={1}>
      <View className="items-center justify-between h-32">

        {icon && <View className="justify-center items-center">{icon}</View>}


        <CsText style={typography.Poppins_s_medium} className="text-[14px] text-center">
          {title}
        </CsText>


        <View className="items-center">
          {value && (
            <CsText style={typography.Poppins_m_regular} className="text-[18px]  text-primary text-center">
              {value}
            </CsText>
          )}

          {accent && (
            <CsText className="text-[14px] mt-1 text-dark text-center">
              {accent}
            </CsText>
          )}
        </View>
      </View>
    </ZiraatCard>
  );
}
