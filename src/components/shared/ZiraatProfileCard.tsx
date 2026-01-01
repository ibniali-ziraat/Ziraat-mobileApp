import { Platform, Pressable, StyleSheet, View } from "react-native";

export default function ZiraatCard({
  children,
  className = "",

  // padding props (INNER)
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingHorizontal,
  paddingVertical,

  // margin props (OUTER vertical only)
  marginTop,
  marginBottom,
  marginVertical,

  height,

  borderWidth = 0,
  borderColor = "#E6E6E6",
  borderRadius = 12,

  backgroundColor = "#FFFFFF",

  style,
  onPress,
}) {
  const REM = 16;

  /* ---------------- INNER PADDING ---------------- */
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

  const CardContent = (
    <View
      className={className}
      style={[
        styles.card,
        {
          ...(height ? { height } : {}),
          borderRadius,
          backgroundColor,
          borderWidth,
          borderColor,
          ...computedPadding,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  const Card = onPress ? (
    <Pressable onPress={onPress}>{CardContent}</Pressable>
  ) : (
    CardContent
  );

  return (
    <View
      style={[
        styles.wrapper,
        {
          marginTop: marginVertical ?? marginTop ?? 0,
          marginBottom: marginVertical ?? marginBottom ?? 0,
        },
      ]}
    >
      {Card}
    </View>
  );
}

const styles = StyleSheet.create({
  /* ---------- OUTER WRAPPER ---------- */
  wrapper: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },

  /* ---------- CARD ---------- */
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,

    /* ---------- iOS ---------- */
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 4 },
    }),

    /* ---------- ANDROID ---------- */
    ...(Platform.OS === "android" && {
      elevation: 6,
    }),

    /* ---------- WEB ---------- */
    ...(Platform.OS === "web" && {
      boxShadow:
        "0px 2px 8px rgba(0, 0, 0, 0.06), 0px 4px 16px rgba(0, 0, 0, 0.08)",
    }),
  },
});
