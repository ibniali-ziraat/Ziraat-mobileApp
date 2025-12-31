import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Base width = iPhone 11
const BASE_WIDTH = 375;

export const scale = (size: number) => {
  // ✅ Disable scaling on web
  if (Platform.OS === "web") {
    return size;
  }

  // ✅ Moderate scaling for mobile
  const scaleFactor = SCREEN_WIDTH / BASE_WIDTH;

  // Prevent extreme scaling
  const moderatedScale = size + (scaleFactor - 1) * size * 0.5;

  return PixelRatio.roundToNearestPixel(moderatedScale);
};
