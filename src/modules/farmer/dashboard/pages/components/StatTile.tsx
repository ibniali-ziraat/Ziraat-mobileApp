import { Text, View } from "react-native";

const StatTile = ({ title, value, footer, color, icon }) => {
  return (
    <View className="w-full flex-row items-center rounded-xl bg-light shadow-md p-4 mb-4">
      
      <View
        className={`w-1 h-full rounded-full bg-${color}`}
      />

    
      <View className="ml-3 mr-3  p-3 rounded-xl">
        {icon}
      </View>


      <View className="flex-1">
        <Text className="font-bold text-dark text-[18px]">
          {title}
        </Text>

        <Text className="text-[16px] font-medium text-dark mt-1">
          {value}
        </Text>

        {footer && (
          <Text className="text-[10px] text-dark mt-1">
            {footer}
          </Text>
        )}
      </View>
    </View>
  );
};

export default StatTile;
