import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { Text, View } from "react-native";

const StatTile = ({
  title,
  value,
  footer,
  icon,
}: any) => {
  return (
    <ZiraatCard
      width="100%"
      height="5%"
      paddingHorizontal={1}
      paddingVertical={0.8}
      marginBottom={0.5}
    >
      <View className="flex-row items-center justify-between">
        {/* CONTENT */}
        <View className="flex-1">
          <Text className="text-[16px] font-bold text-black">
            {title}
          </Text>

          <Text className="text-[14px] font-medium text-dark mt-1">
            {value}
          </Text>

          {footer && (
            <Text className="text-[12px] text-neutral-500 mt-1">
              {footer}
            </Text>
          )}
        </View>

        {/* RIGHT ICON */}
        {icon && (
          <View className="ml-4 p-3 rounded-xl bg-light">
            {icon}
          </View>
        )}
      </View>
    </ZiraatCard>
  );
};

export default StatTile;
