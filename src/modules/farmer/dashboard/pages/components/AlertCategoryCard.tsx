import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { Text, View } from "react-native";

export default function AlertSummaryCard({
  icon,
  title,
  value,
  subtitle,
  delay = 0,
}: any) {
  return (
    <View className="w-[48%] h-48">
      <ZiraatCard
        width="100%"
        paddingHorizontal={2}
        paddingVertical={2}
      >
        <View className="h-20 items-center justify-between">
          {/* ICON */}
          <View>{icon}</View>

          {/* TITLE */}
          <Text className="text-[16px] font-semibold text-dark text-center">
            {title}
          </Text>

          {/* VALUE */}
          {value && (
            <Text className="text-[18px] font-bold text-black text-center">
              {value}
            </Text>
          )}

          {/* SUBTITLE */}
          {subtitle && (
            <Text className="text-sm text-neutral-500 text-center">
              {subtitle}
            </Text>
          )}
        </View>
      </ZiraatCard>
    </View>
  );
}
