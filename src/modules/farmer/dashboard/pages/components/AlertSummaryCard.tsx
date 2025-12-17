import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { MotiView } from "moti";
import { Text, View } from "react-native";

export default function AlertSummaryCard({
  icon,
  title,
  value,
  subtitle,
  delay = 0,
}: any) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay }}
    >
      <ZiraatCard
        width="100%"
        height={85}
        paddingHorizontal={1}
        paddingVertical={0.75}
        marginBottom={1}
      >
        <View className="flex-row items-center justify-between">
          {/* CONTENT */}
          <View className="flex-1">
            <Text className="text-[16px] text-dark font-semibold">
              {title}
            </Text>

            <Text className="text-[14px] font-bold">
              {value}
            </Text>

            <Text className="text-sm text-neutral-500 mt-1">
              {subtitle}
            </Text>
          </View>

          {/* RIGHT ICON */}
          <View className="p-3 rounded-xl ml-4">
            {icon}
          </View>
        </View>
      </ZiraatCard>
    </MotiView>
  );
}
