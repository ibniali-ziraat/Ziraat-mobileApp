import { Cloud } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, ImageBackground, StyleSheet, View } from "react-native";
import type { WeatherEffect } from "../utils/weatherPictogram";
import { getWeatherBackground } from "../utils/weatherBackgrounds";

const PARTICLE_COUNT = 16;

type Props = {
  effect: WeatherEffect;
  isDaylight: boolean;
  children: React.ReactNode;
};

export default function AnimatedWeatherBackground({
  effect,
  isDaylight,
  children,
}: Props) {
  const particleProgress = useRef(
    Array.from({ length: PARTICLE_COUNT }, () => new Animated.Value(0)),
  ).current;
  const ambientProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animations: Animated.CompositeAnimation[] = [];

    particleProgress.forEach((progress, index) => {
      progress.setValue(0);
      if (effect !== "rain" && effect !== "snow") return;

      const animation = Animated.loop(
        Animated.sequence([
          Animated.delay((index % 8) * 90),
          Animated.timing(progress, {
            toValue: 1,
            duration: effect === "rain" ? 700 + (index % 4) * 90 : 2200 + (index % 5) * 220,
            useNativeDriver: true,
          }),
        ]),
      );
      animations.push(animation);
      animation.start();
    });

    ambientProgress.setValue(0);
    const ambientAnimation =
      effect === "storm"
        ? Animated.loop(
            Animated.sequence([
              Animated.delay(1700),
              Animated.timing(ambientProgress, {
                toValue: 1,
                duration: 90,
                useNativeDriver: true,
              }),
              Animated.timing(ambientProgress, {
                toValue: 0,
                duration: 140,
                useNativeDriver: true,
              }),
              Animated.delay(2600),
            ]),
          )
        : Animated.loop(
            Animated.sequence([
              Animated.timing(ambientProgress, {
                toValue: 1,
                duration: effect === "fog" ? 5000 : 3600,
                useNativeDriver: true,
              }),
              Animated.timing(ambientProgress, {
                toValue: 0,
                duration: effect === "fog" ? 5000 : 3600,
                useNativeDriver: true,
              }),
            ]),
          );

    animations.push(ambientAnimation);
    ambientAnimation.start();

    return () => animations.forEach((animation) => animation.stop());
  }, [ambientProgress, effect, particleProgress]);

  const source = getWeatherBackground(effect, isDaylight);

  return (
    <ImageBackground source={source} resizeMode="cover" style={styles.fill}>
      <View style={styles.scrim} />
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        {(effect === "rain" || effect === "snow") &&
          particleProgress.map((progress, index) => {
            const left = `${(index * 17 + 7) % 100}%` as const;
            const translateY = progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-28, 190],
            });
            const translateX =
              effect === "snow"
                ? progress.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 8, -4],
                  })
                : -18;

            return (
              <Animated.View
                key={index}
                style={[
                  effect === "rain" ? styles.rainDrop : styles.snowFlake,
                  {
                    left,
                    opacity: progress.interpolate({
                      inputRange: [0, 0.12, 0.85, 1],
                      outputRange: [0, 0.8, 0.75, 0],
                    }),
                    transform: [{ translateX }, { translateY }],
                  },
                ]}
              />
            );
          })}

        {(effect === "cloudy" || effect === "fog") && (
          <Animated.View
            style={[
              styles.driftLayer,
              {
                opacity: effect === "fog" ? 0.28 : 0.2,
                transform: [
                  {
                    translateX: ambientProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-34, 38],
                    }),
                  },
                ],
              },
            ]}
          >
            <Cloud size={120} color="#FFFFFF" fill="#FFFFFF" />
            <Cloud size={86} color="#FFFFFF" fill="#FFFFFF" />
          </Animated.View>
        )}

        {effect === "storm" && (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              styles.lightningFlash,
              { opacity: ambientProgress },
            ]}
          />
        )}

        {effect === "clear" && (
          <Animated.View
            style={[
              styles.glow,
              {
                opacity: ambientProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.12, 0.3],
                }),
                transform: [
                  {
                    scale: ambientProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1.15],
                    }),
                  },
                ],
              },
            ]}
          />
        )}
      </View>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fill: {
    minHeight: 180,
    width: "100%",
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(4, 17, 27, 0.28)",
  },
  rainDrop: {
    position: "absolute",
    top: -20,
    width: 2,
    height: 24,
    borderRadius: 2,
    backgroundColor: "rgba(210,235,255,0.8)",
    transform: [{ rotate: "12deg" }],
  },
  snowFlake: {
    position: "absolute",
    top: -14,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.92)",
  },
  driftLayer: {
    position: "absolute",
    top: 8,
    right: -34,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  lightningFlash: {
    backgroundColor: "#C8D7FF",
  },
  glow: {
    position: "absolute",
    top: -26,
    right: -18,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFF4B0",
  },
});
