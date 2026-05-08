import { colors } from "@/src/constants/colors";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function Loader() {
  const rotation = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Smooth Fade-in so it doesn't "pop" aggressively
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // 2. Infinite smooth rotation
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 800, // Slightly faster for a "snappy" high-performance feel
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotation, fadeAnim]);

  const rotateData = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={[styles.container,]}>
      <Animated.View style={{ opacity: fadeAnim }}>
        {/* The Track (faint background circle) */}
        <View
          style={[
            styles.loaderRing,
            { borderColor: colors.primary, opacity: 0.1 },
          ]}
        />

        {/* The Active Spinner */}
        <Animated.View
          style={[
            styles.loaderRing,
            {
              position: "absolute",
              transform: [{ rotate: rotateData }],
              borderColor: colors.primary,
              borderTopColor: "transparent", // Creates the sleek UX gap
              borderRightColor: "transparent", // Creates a slightly longer, elegant arc
            },
          ]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loaderRing: {
    width: 36, // UX Standard size for mobile loaders
    height: 36,
    borderRadius: 18,
    borderWidth: 3, // Refined line weight
  },
});
