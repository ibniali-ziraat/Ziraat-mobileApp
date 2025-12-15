import React, { ReactNode, useEffect, useRef } from "react";
import { Animated, Easing, StyleProp, ViewStyle } from "react-native";

interface AnimatedStepWrapperProps {
  children: ReactNode;
  trigger: any; // value that triggers animation (step, id, etc.)
  direction?: "left" | "right";
  distance?: number; // px
  duration?: number; // ms
  style?: StyleProp<ViewStyle>;
}

export default function AnimatedStepWrapper({
  children,
  trigger,
  direction = "right",
  distance = 20,
  duration = 280,
  style,
}: AnimatedStepWrapperProps) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animation.setValue(0);

    Animated.timing(animation, {
      toValue: 1,
      duration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [trigger]);

  const translateX = direction === "right" ? distance : -distance;

  return (
    <Animated.View
      style={[
        {
          opacity: animation,
          transform: [
            {
              translateX: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [translateX, 0],
              }),
            },
          ],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}
