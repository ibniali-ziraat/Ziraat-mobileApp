import { colors } from "@/src/constants/colors";
import { useEffect, useRef } from "react";
import { Animated, Easing, Image, View } from "react-native";

export default function Loader() {
  // Logo animation
  const scale = useRef(new Animated.Value(0.96)).current;

  // Dots animation
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 🔹 Logo breathing (NO opacity change)
    const logoBreathing = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.delay(400),
        Animated.timing(scale, {
          toValue: 0.96,
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // 🔹 Dot animation
    const animateDot = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 1600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 1600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );

    logoBreathing.start();
    animateDot(dot1, 0).start();
    animateDot(dot2, 200).start();
    animateDot(dot3, 400).start();

    return () => logoBreathing.stop();
  }, []);

  const dotStyle = (dot: Animated.Value) => ({
    opacity: dot.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
    transform: [
      {
        translateY: dot.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -4],
        }),
      },
    ],
  });

  return (
    <View
      className="w-full h-full items-center justify-center "
      style={{ backgroundColor: colors.light }}
    >
      {/* Logo */}
      <Animated.View
        style={{
          transform: [{ scale }],
        }}
      >
        <Image
          source={require("../../../assets/images/logo.jpeg")}
          resizeMode="contain"
          style={{
            width: 200,
            height: 200,
          }}
        />
      </Animated.View>

      {/* Dots */}
      {/* <View
        style={{
          flexDirection: "row",
          marginTop: 0,
          gap: 8,
        }}
      >
        {[dot1, dot2, dot3].map((dot, index) => (
          <Animated.View
            key={index}
            style={[
              {
                width: 10,
                height: 10,
                borderRadius: 6,
                backgroundColor: colors.primary,
              },
              dotStyle(dot),
            ]}
          />
        ))}
      </View> */}
    </View>
  );
}
