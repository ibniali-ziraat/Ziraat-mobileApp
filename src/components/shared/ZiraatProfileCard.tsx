import { colors } from "@/src/constants/colors";
import { Platform, Pressable, StyleSheet, View } from "react-native";

export default function ZiraatCard({
  children,
  className = "",

  // padding
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingHorizontal,
  paddingVertical,

  // margin
  marginTop = 0.625,
  marginBottom = 0.625,
  marginLeft = 0.625,
  marginRight = 0.625,
  marginHorizontal,
  marginVertical,

  // required
  width,
  height,

  style,
  onPress,
}) {
  const REM = 16;

  if (!width || !height) {
    throw new Error("ZiraatCard requires width and height props.");
  }

  const platformShadow =
    Platform.OS === "ios"
      ? styles.iosShadow
      : { elevation: 4 };

  // ---- APPLY PADDING CORRECTLY ----
  const computedPadding = {
    paddingTop: paddingVertical !== undefined ? paddingVertical * REM : paddingTop ? paddingTop * REM : 0,
    paddingBottom: paddingVertical !== undefined ? paddingVertical * REM : paddingBottom ? paddingBottom * REM : 0,
    paddingLeft: paddingHorizontal !== undefined ? paddingHorizontal * REM : paddingLeft ? paddingLeft * REM : 0,
    paddingRight: paddingHorizontal !== undefined ? paddingHorizontal * REM : paddingRight ? paddingRight * REM : 0,
  };

  // ---- APPLY MARGIN CORRECTLY ----
  const computedMargin = {
    marginTop: marginVertical !== undefined ? marginVertical * REM : marginTop * REM,
    marginBottom: marginVertical !== undefined ? marginVertical * REM : marginBottom * REM,
    marginLeft: marginHorizontal !== undefined ? marginHorizontal * REM : marginLeft * REM,
    marginRight: marginHorizontal !== undefined ? marginHorizontal * REM : marginRight * REM,
  };

  const CardContent = (
    <View
      className={`rounded-3xl overflow-hidden ${className}`}
      style={[
        {
          backgroundColor: colors.light,
          width,
          height,

          ...computedPadding,
          ...computedMargin,
        },
        platformShadow,
        style,
      ]}
    >
      {children}
    </View>
  );

  if (!onPress) return CardContent;
  return <Pressable onPress={onPress}>{CardContent}</Pressable>;
}

const styles = StyleSheet.create({
  iosShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
});
