import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {
  icon: React.ReactNode;
  label: string;
  focused: boolean;
  pressKey: string | null;
};

function TabIcon({ icon, label, focused, pressKey }: Props) {
  const scale = useSharedValue(1);
  const bgOpacity = useSharedValue(0);
  const bgScale = useSharedValue(0.2);

  // 🔥 Animate ONLY when this tab is pressed
  useEffect(() => {
    if (!pressKey) return;

    scale.value = 1;
    scale.value = withSpring(1.15, { damping: 8, stiffness: 160 }, () => {
      scale.value = withSpring(1);
    });

    if (focused) {
      bgOpacity.value = withTiming(1, { duration: 180 });
      bgScale.value = withSpring(1);
    } else {
      bgOpacity.value = withTiming(0, { duration: 120 });
      bgScale.value = withSpring(0.9);
    }
  }, [pressKey]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const bgStyle = useAnimatedStyle(() => ({
    opacity: bgOpacity.value,
    transform: [{ scale: bgScale.value }],
  }));

  return (
    <View style={{ alignItems: "center", width: 60 }}>
      <View
        style={{
          width: 60,
          height: 28,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
        }}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              width: 60,
              height: 28,
              borderRadius: 16,
              backgroundColor: "#E7FCE3",
            },
            bgStyle,
          ]}
        />

        <Animated.View style={iconStyle}>{icon}</Animated.View>
      </View>

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
