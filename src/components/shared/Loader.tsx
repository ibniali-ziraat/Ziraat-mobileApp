import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { colors } from "@/src/constants/colors";

export default function Loader() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  const animateDot = (dot: Animated.Value, delay: number) =>
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(dot, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dot, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    );

  useEffect(() => {
    Animated.parallel([
      animateDot(dot1, 0),
      animateDot(dot2, 120),
      animateDot(dot3, 240),
    ]).start();
  }, []);

  const dotStyle = (dot: Animated.Value) => ({
    transform: [
      {
        translateY: dot.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -4], // subtler bounce
        }),
      },
    ],
    opacity: dot.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    }),
  });

  return (
    <View
      className="w-full h-full items-center justify-center"
      style={{ backgroundColor: colors.light }}
    >
      <View className="flex-row items-center" style={{ gap: 8 }}>
        {[dot1, dot2, dot3].map((dot, index) => (
          <Animated.View
            key={index}
            style={[
              {
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: colors.primary,
              },
              dotStyle(dot),
            ]}
          />
        ))}
      </View>
    </View>
  );
}
