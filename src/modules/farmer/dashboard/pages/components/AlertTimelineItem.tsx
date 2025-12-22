import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { Text, View } from "react-native";

export default function AlertTimelineItem({
  icon,
  message,
  time,
  delay = 0,
}: any) {
  return (
    <View className="w-[48%] h-60 mb-2">
      <ZiraatCard
        width="100%"
        paddingHorizontal={2}
        paddingVertical={2}
      >
        {/* Make container take full height and space items evenly */}
        <View className="h-full items-center justify-between">
          {/* ICON */}
          <View>{icon}</View>

          {/* MESSAGE */}
          <Text className="text-[16px] font-semibold text-dark text-center">
            {message}
          </Text>

          {/* TIME */}
          <Text className="text-sm text-dark text-center">
            {time}
          </Text>
        </View>
      </ZiraatCard>
    </View>
  );
}
