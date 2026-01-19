

import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import CsText from "./CsText";

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

  // LABEL FADE + SLIDE
  const labelOpacity = useSharedValue(focused ? 1 : 0.7);
  const labelTranslateY = useSharedValue(focused ? 0 : 1);

  useEffect(() => {
    if (focused) {
     
      scale.value = 1;
      bgScaleX.value = 0;
      bgOpacity.value = 0;

     
      scale.value = withSequence(
        withTiming(1.12, {
          duration: 220,
          easing: Easing.out(Easing.quad),
        }),
        withTiming(1, {
          duration: 180,
          easing: Easing.out(Easing.cubic),
        })
      );

      // 🔹 BACKGROUND: horizontal reveal from center
      bgOpacity.value = withTiming(1, { duration: 160 });
      bgScaleX.value = withTiming(1, {
        duration: 260,
        easing: Easing.out(Easing.cubic),
      });

      // 🔹 LABEL: fade + slide in
      labelOpacity.value = withTiming(1, { duration: 180 });
      labelTranslateY.value = withTiming(0, {
        duration: 180,
        easing: Easing.out(Easing.cubic),
      });
    } else {
     
      bgOpacity.value = withTiming(0, { duration: 120 });
      bgScaleX.value = withTiming(0, {
        duration: 160,
        easing: Easing.in(Easing.cubic),
      });

      scale.value = 1;

     
      labelOpacity.value = withTiming(0.7, { duration: 160 });
      labelTranslateY.value = withTiming(1, { duration: 160 });
    }
  }, [focused, pressKey]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const bgStyle = useAnimatedStyle(() => ({
    opacity: bgOpacity.value,
    transform: [{ scaleX: bgScaleX.value }],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
    transform: [{ translateY: labelTranslateY.value }],
  }));

  return (
    <View
      style={{
        width: 70, 
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Icon Box */}
      <View
        style={{
          width: 65, 
          height: 33, 
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 18,
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
              borderRadius: 18,
            },
            bgStyle,
          ]}
        />

        {/* Icon */}
        <Animated.View style={iconStyle}>{icon}</Animated.View>
      </View>

      {/* Label */}
      <Animated.View style={[{ marginTop: 4 }, labelStyle]}>
        <CsText
          style={{
            fontSize: 13, 
            textAlign: "center",
            fontWeight: focused ? "600" : "400",
          }}
          numberOfLines={1}
        >
          {label}
        </CsText>
      </Animated.View>
    </View>
  );
}

export default React.memo(TabIcon);
