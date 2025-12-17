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
        height={65}
        paddingHorizontal={1}
        paddingVertical={0.75}
        marginBottom={1}
      >
        <View className="flex-1 justify-center">
          {/* TITLE + ICON ROW */}
          <View className="flex-row items-center justify-between">
            <Text className="text-[16px] text-dark font-semibold">
              {title}
            </Text>

            <View className="p-2 rounded-xl">
              {icon}
            </View>
          </View>
         </View>
      </ZiraatCard>
    </MotiView>
  );
}
