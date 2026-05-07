import { useFocusEffect } from "@react-navigation/native";
import React, { ReactNode, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  animationDefaults,
  AnimationType,
  BEZIER_CURVE,
} from "./animations/animation-presets";

type Props = {
  children: ReactNode;
  animation?: AnimationType;
};

const AnimatedScreen: React.FC<Props> = ({ children, animation = "fade" }) => {
  const preset = animationDefaults[animation];

  const translateY = useSharedValue(preset.translateY);
  const translateX = useSharedValue(preset.translateX);
  const scale = useSharedValue(preset.scale);

  useFocusEffect(
    useCallback(() => {
      // 🔹 Animate IN
      const timing = {
        duration: 900,
        easing: Easing.bezier(...BEZIER_CURVE),
      };

      if (animation === "slideUp") {
        translateY.value = withTiming(0, timing);
      }

      if (animation === "slideRight") {
        translateX.value = withTiming(0, timing);
      }

      if (animation === "scale") {
        scale.value = withTiming(1, timing);
      }

      // 🔹 Reset on BLUR (this is the magic)
      return () => {
        translateY.value = preset.translateY;
        translateX.value = preset.translateX;
        scale.value = preset.scale;
      };
    }, [animation])
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.layer, animatedStyle]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  layer: {
    flex: 1,
  },
});

export default AnimatedScreen;
