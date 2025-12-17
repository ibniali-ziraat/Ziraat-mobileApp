import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { Text, View } from "react-native";

export default function EnhancedCard({
  title,
  value,
  accent,
  icon,
}) {
  return (
    <ZiraatCard
      width="48%" 
      height="15%"        
      paddingHorizontal={1}
      paddingVertical={1}
      marginBottom={0.5}
    >
      <View className="flex-1 flex-col justify-between items-center">
        {/* TITLE */}
        <Text className="text-[14px] font-bold text-center">
          {title}
        </Text>

        {/* ICON */}
        {icon && (
          <View className="justify-center items-center">
            {/* icon should be passed with size={30} */}
            {icon}
          </View>
        )}

        {/* VALUE / ACCENT */}
        {(value || accent) && (
          <View className="items-center">
            {value && (
              <Text className="text-[22px] font-semibold text-primary text-center">
                {value}
              </Text>
            )}
            {accent && (
              <Text className="text-[13px] mt-1 text-dark text-center">
                {accent}
              </Text>
            )}
          </View>
        )}
      </View>
    </ZiraatCard>
  );
}
