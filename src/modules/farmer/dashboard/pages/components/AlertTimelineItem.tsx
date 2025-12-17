import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { MotiView } from "moti";
import { Text, View } from "react-native";

export default function AlertTimelineItem({
  icon,
  message,
  time,
  index,
}: any) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 15 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 100 * index }}
    >
      <ZiraatCard
        width="100%"
        height={70}
        paddingHorizontal={1}
        paddingVertical={0.75}
        marginBottom={0.75}
      >
        <View className="flex-row items-start justify-between">
          {/* CONTENT */}
          <View className="flex-1 pr-3">
            <Text className="text-[16px] font-semibold text-dark">
              {message}
            </Text>

            <Text className="text-sm text-neutral-500 mt-1">
              {time}
            </Text>
          </View>

          {/* RIGHT ICON aligned with message */}
          <View className="mt-[2px]">
            {icon}
          </View>
        </View>
      </ZiraatCard>
    </MotiView>
  );
}
