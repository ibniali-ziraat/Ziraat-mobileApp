import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
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
        {/* ICON */}
        {icon && (
          <View className="p-3 rounded-xl bg-light">
            {icon}
          </View>
        )}

        {/* TITLE */}
        <CsText className="text-[14px] font-semibold text-black">
          {title}
       </CsText>

        {/* VALUE */}
        <CsText className="text-[18px] text-dark">
          {value}
       </CsText>

        {/* FOOTER */}
        {footer && (
          <CsText className="text-[14px] font-semibold text-center">
            {footer}
         </CsText>
        )}
      </View>
    </ZiraatCard>
  );
};

export default StatTile;
