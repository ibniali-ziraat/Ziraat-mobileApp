import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { Text, View } from "react-native";

export default function EnhancedCard({
  title,
  value,
  accent,
  icon,
}) {
  return (
   <View className="flex flex-row flex-wrap justify-between w-[48%] mb-2 "
   >

     <ZiraatCard
      width="100%" 
      // paddingHorizontal={1}
      paddingVertical={1}
      // marginBottom={0.5}
    >
      <View className="flex-1 flex-col justify-between items-center h-32 ">
       {/* ICON */}
        {icon && (
          <View className="justify-center items-center">
            {icon}
          </View>
        )}

        {/* TITLE */}
        <Text className="text-[14px] font-semibold text-center">
          {title}
        </Text>

      

        {(value || accent) && (
          <View className="items-center">
            {value && (
              <Text className="text-[18px] font-semibold text-primary text-center">
                {value}
              </Text>
            )}
            {accent && (
              <Text className="text-[18px] mt-1 text-dark text-center">
                {accent}
              </Text>
            )}
          </View>
        )}
      </View>
    </ZiraatCard>
   </View>
  );
}
