import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type Props = {
  icon: React.ReactNode;
  label: string;
  focused: boolean;
  pressKey: number;
};

function TabIcon({ icon, label, focused, pressKey }: Props) {
  // ICON SCALE
  const scale = useSharedValue(1);

  // BACKGROUND (WhatsApp-style reveal)
  const bgOpacity = useSharedValue(0);
  const bgScaleX = useSharedValue(0);

  useEffect(() => {
    if (focused) {
      // 🔹 RESET first (important for re-trigger)
      scale.value = 1;
      bgScaleX.value = 0;
      bgOpacity.value = 0;

      // 🔹 ICON: smooth zoom out → in
      scale.value = withSequence(
        withTiming(1.15, {
          duration: 400,
          easing: Easing.out(Easing.quad),
        }),
        withTiming(1, {
          duration: 260,
          easing: Easing.out(Easing.cubic),
        })
      );

      // 🔹 BACKGROUND: horizontal reveal from center
      bgOpacity.value = withTiming(1, { duration: 180 });
      bgScaleX.value = withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      // 🔻 RESET when tab loses focus (THIS IS THE FIX)
      bgOpacity.value = withTiming(0, { duration: 120 });
      bgScaleX.value = withTiming(0, {
        duration: 160,
        easing: Easing.in(Easing.cubic),
      });
      scale.value = 1;
    }
  }, [focused, pressKey]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const bgStyle = useAnimatedStyle(() => ({
    opacity: bgOpacity.value,
    transform: [{ scaleX: bgScaleX.value }],
  }));

  return (
    <View style={{ alignItems: "center", width: 60 }}>
      <View
        style={{
          width: 60,
          height: 28,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {/* Background */}
        <Animated.View
          style={[
            {
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "#E7FCE3",
              borderRadius: 16,
            },
            bgStyle,
          ]}
        />

        {/* Icon */}
        <Animated.View style={iconStyle}>{icon}</Animated.View>
      </View>

      {/* Label */}
      <Text
        style={{
          fontSize: 12,
          textAlign: "center",
          fontWeight: focused ? "700" : "400",
        }}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

export default React.memo(TabIcon);
