import { colors } from "@/src/constants/colors";
import { useRef } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const ACTIVE_SCALE = 1.12;

export default function TabBar({ tabs, activeTab, onChange }) {
  const indicatorX = useSharedValue(0);
  const indicatorW = useSharedValue(0);
  const indicatorStretch = useSharedValue(1);

  const containerWidth = useRef(0);

  // Shared animation store per tab
  const tabScales = tabs.map(() => useSharedValue(1));
  const tabOpacities = tabs.map(() => useSharedValue(0.6));

  const onLayout = (e) => {
    containerWidth.current = e.nativeEvent.layout.width;
    const tabWidth = containerWidth.current / tabs.length;

    indicatorW.value = tabWidth;
    indicatorX.value = tabWidth * tabs.indexOf(activeTab);
  };

  /** Enhanced Liquid Stretch Indicator */
  const indicatorStyle = useAnimatedStyle(() => ({
    width: indicatorW.value,
    transform: [
      { translateX: indicatorX.value },
      {
        scaleX: interpolate(indicatorStretch.value, [1, 1.1, 1], [1, 1.18, 1]),
      },
      {
        scaleY: interpolate(indicatorStretch.value, [1, 1.1, 1], [1, 0.9, 1]),
      },
    ],
    backgroundColor: colors.primary,
  }));

  return (
    <View
    
    >
      <View
        style={{ flexDirection: "row", position: "relative" }}
        onLayout={onLayout}
      >

        {/* Bottom Liquid Indicator */}
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 0,
              height: 2,
              borderRadius: 50,
             
            },
            indicatorStyle,
          ]}
        />

        {tabs.map((t, index) => {
          const isActive = activeTab === t;
          const scale = tabScales[index];
          const opacity = tabOpacities[index];

          /** Individual tab animation */
          const animatedText = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
          }));

          return (
            <Pressable
              key={t}
              style={{
                flex: 1,
                alignItems: "center",
                paddingVertical: 16,
              }}
              onPress={() => {
                const tabWidth = containerWidth.current / tabs.length;

                // Reset all animations
                tabScales.forEach((sv, i) => {
                  sv.value = withTiming(i === index ? ACTIVE_SCALE : 1, {
                    duration: 250,
                  });
                });

                tabOpacities.forEach((sv, i) => {
                  sv.value = withTiming(i === index ? 1 : 0.5, {
                    duration: 200,
                  });
                });

                // Liquid stretch effect
                indicatorStretch.value = withTiming(1.1, { duration: 120 }, () => {
                  indicatorStretch.value = withSpring(1);
                });

                // Smooth indicator slide
                indicatorX.value = withTiming(tabWidth * index, {
                  duration: 550,
                  easing: Easing.bezier(0.22, 1, 0.36, 1),
                });

                onChange(t);
              }}
            >
              <Animated.Text
                style={[
                  {
                    fontSize: 13,
                    fontWeight: "600",
                    color: isActive ? colors.primary : colors.dark,
                  },
                  animatedText,
                ]}
              >
                {t.toUpperCase()}
              </Animated.Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
