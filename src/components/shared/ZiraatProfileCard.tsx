import { Platform, Pressable, StyleSheet, View } from "react-native";

export default function ZiraatCard({
  children,
  className = "",

  // padding props
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingHorizontal,
  paddingVertical,

  // margin props
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginHorizontal,
  marginVertical,

  // required
  width,
  height,

  // border
  borderWidth = 0,
  borderColor = "#E6E6E6",
  borderRadius = 12,

  backgroundColor = "#FFFFFF",

  style,
  onPress,
}) {
  const REM = 16;

  if (!width) {
    throw new Error("ZiraatCard requires width props.");
  }

  /* ---------------- PADDING ---------------- */
  const computedPadding = {
    paddingTop:
      paddingVertical !== undefined
        ? paddingVertical * REM
        : paddingTop
        ? paddingTop * REM
        : 0,

    paddingBottom:
      paddingVertical !== undefined
        ? paddingVertical * REM
        : paddingBottom
        ? paddingBottom * REM
        : 0,

    paddingLeft:
      paddingHorizontal !== undefined
        ? paddingHorizontal * REM
        : paddingLeft
        ? paddingLeft * REM
        : 0,

    paddingRight:
      paddingHorizontal !== undefined
        ? paddingHorizontal * REM
        : paddingRight
        ? paddingRight * REM
        : 0,
  };

  /* ---------------- MARGIN ---------------- */
  const computedMargin = {
    marginTop:
      marginVertical !== undefined
        ? marginVertical * REM
        : marginTop
        ? marginTop * REM
        : 0,

    marginBottom:
      marginVertical !== undefined
        ? marginVertical * REM
        : marginBottom
        ? marginBottom * REM
        : 0,

    marginLeft:
      marginHorizontal !== undefined
        ? marginHorizontal * REM
        : marginLeft
        ? marginLeft * REM
        : 0,

    marginRight:
      marginHorizontal !== undefined
        ? marginHorizontal * REM
        : marginRight
        ? marginRight * REM
        : 0,
  };

  const Card = (
    <View
      className={className}
      style={[
        styles.card,
        {
          width,
          ...(height ? { height } : {}),
          borderRadius,
          backgroundColor,
          borderWidth,
          borderColor,
          ...computedPadding,
          ...computedMargin,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  return onPress ? <Pressable onPress={onPress}>{Card}</Pressable> : Card;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,

    /* ---------- iOS ---------- */
 ...(Platform.OS === "ios" && {
  shadowColor: "#000",
  shadowOpacity: 0.25,  // Reduced from 0.12 (Softer)
  shadowRadius: 3,     // Reduced from 16 (Tighter blur)
  shadowOffset: {
    width: 0,
    height: 4,         // Reduced from 6 (Closer to background)
  },
}),

    /* ---------- ANDROID ---------- */
    ...(Platform.OS === "android" && {
      elevation: 4,
    }),

    /* ---------- WEB ---------- */
    ...(Platform.OS === "web" && {
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.06), 0px 4px 16px rgba(0, 0, 0, 0.08)",
    }),
  },
});