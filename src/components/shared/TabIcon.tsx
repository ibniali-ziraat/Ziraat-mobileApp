import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CsText from "./CsText";

type Props = {
  icon: React.ReactNode;
  label: string;
  focused: boolean;
  pressKey: number;
};

/**
 * Airbnb-style tab: a thin outline glyph over a small label, no chrome behind
 * it. Colour alone marks the active tab, plus the label weight.
 */
function TabIcon({ icon, label, focused, pressKey }: Props) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(focused ? 1.06 : 1, {
      duration: 160,
      easing: Easing.out(Easing.cubic),
    });
  }, [focused, pressKey, scale]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={{ width: 70, alignItems: "center", justifyContent: "center" }}>
      <Animated.View
        style={[
          { height: 26, alignItems: "center", justifyContent: "center" },
          iconStyle,
        ]}
      >
        {icon}
      </Animated.View>

      <CsText
        numberOfLines={1}
        style={[
          focused ? typography.Poppins_xs_semibold : typography.Poppins_xs_regular,
          {
            fontSize: 10.5,
            marginTop: 4,
            textAlign: "center",
            color: focused ? colors.primary : "#8C8C8C",
          },
        ]}
      >
        {label}
      </CsText>
    </View>
  );
}

export default React.memo(TabIcon);
