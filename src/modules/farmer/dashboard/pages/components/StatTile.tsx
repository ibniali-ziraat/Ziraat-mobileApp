import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";

const StatTile = ({ title, value, footer, icon }) => {
  return (
    <ZiraatCard
      width="100%"
      paddingHorizontal={1}
      paddingVertical={1}
      marginBottom={0.5}
    >
      <View className="items-center justify-evenly h-60">

        {icon && (
          <View className="p-3 rounded-xl bg-light">
            {icon}
          </View>
        )}


        <CsText style={typography.Poppins_s_medium} className="text-[14px]  text-black">
          {title}
        </CsText>


        <CsText className="text-[18px] text-dark">
          {value}
        </CsText>

        {footer && (
          <CsText style={typography.Poppins_m_regular} className="text-[14px] text-center">
            {footer}
          </CsText>
        )}
      </View>
    </ZiraatCard>
  );
};

export default StatTile;
