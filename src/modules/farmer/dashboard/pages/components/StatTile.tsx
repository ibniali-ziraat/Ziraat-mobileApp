import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { Text, View } from "react-native";

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
        <Text className="text-[14px] font-semibold text-black">
          {title}
        </Text>

        {/* VALUE */}
        <Text className="text-[18px] text-dark">
          {value}
        </Text>

        {/* FOOTER */}
        {footer && (
          <Text className="text-[14px] font-semibold text-center">
            {footer}
          </Text>
        )}
      </View>
    </ZiraatCard>
  );
};

export default StatTile;
