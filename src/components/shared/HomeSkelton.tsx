import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default function Skeleton({
  width = "100%",
  height = 16,
  borderRadius = 8,
  className = "",
}: {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  className?: string;
}) {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 900,
          useNativeDriver: false,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 900,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const backgroundColor = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E5E7EB", "#F3F4F6"],
  });

  return (
    <Animated.View
      className={className}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor,
      }}
    />
  );
}
