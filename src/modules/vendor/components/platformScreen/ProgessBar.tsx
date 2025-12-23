import CsText from "@/src/components/shared/CsText";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function AnimatedProgressBar({ label, value, maxValue, color }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(Math.min(value / maxValue, 1), {
      duration: 900,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  const barStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View className="mb-4">
      {/* Label Row */}
      <View className="flex-row justify-between mb-1">
        <CsText className="text-[13px] font-medium text-gray-700">{label}</CsText>
        <CsText className="text-[13px] font-semibold" style={{ color }}>
          {(value / maxValue * 100).toFixed(0)}%
       </CsText>
      </View>

      {/* Progress Container */}
      <View className="h-2 rounded-full bg-gray-200 overflow-hidden">
        <Animated.View
          className="h-full rounded-full"
          style={[barStyle, { backgroundColor: color }]}
        />
      </View>
    </View>
  );
}
