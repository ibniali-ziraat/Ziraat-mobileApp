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
  marginTop = 0.625,
  marginBottom = 0.625,
  marginLeft = 0.625,
  marginRight = 0.625,
  marginHorizontal,
  marginVertical,

  // required
  width,
  height,

  // border (static unless overridden)
  borderWidth = 0.25,
  borderColor = "#CCCCCC",
  borderRadius = 12,

  backgroundColor = "#FFFFFF",

  style,
  onPress,
}) {
  const REM = 16;

  if (!width || !height) {
    throw new Error("ZiraatCard requires width and height props.");
  }

  // PADDING
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

  // MARGIN
  const computedMargin = {
    marginTop:
      marginVertical !== undefined ? marginVertical * REM : marginTop * REM,
    marginBottom:
      marginVertical !== undefined ? marginVertical * REM : marginBottom * REM,
    marginLeft:
      marginHorizontal !== undefined ? marginHorizontal * REM : marginLeft * REM,
    marginRight:
      marginHorizontal !== undefined
        ? marginHorizontal * REM
        : marginRight * REM,
  };

  // SHADOW WRAPPER (STATIC PER PLATFORM)
  const ShadowWrapper = ({ children }) => (
    <View
      style={[
        styles.shadowWrapper,
        {
          width,
          height,
          borderRadius,
          ...computedMargin,
        },
      ]}
    >
      {children}
    </View>
  );

  // INNER CARD (NO SHADOW)
  const CardInner = (
    <View
      className={`overflow-hidden ${className}`}
      style={[
        {
          width: "100%",
          height: "100%",
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

  return (
    <ShadowWrapper>
      {onPress ? <Pressable onPress={onPress}>{CardInner}</Pressable> : CardInner}
    </ShadowWrapper>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    /* ----------------------------------------
       ⚡ STATIC iOS SHADOW
    ----------------------------------------- */
    ...(Platform.OS === "ios" && {
      shadowColor: "#000000",
      shadowOpacity: 0.12,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
    }),

    /* ----------------------------------------
       ⚡ STATIC ANDROID SHADOW
    ----------------------------------------- */
    ...(Platform.OS === "android" && {
      elevation: 15,
      shadowColor: "gray",
    }),

    /* ----------------------------------------
       ⚡ STATIC WEB SHADOW
    ----------------------------------------- */
    ...(Platform.OS === "web" && {
      boxShadow: "0px 8px 22px rgba(0,0,0,0.12)",
    }),
  },
});
