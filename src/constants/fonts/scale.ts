import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Base width = iPhone 11 / Pixel 4
const BASE_WIDTH = 375;

export const scale = (size: number) =>
  PixelRatio.roundToNearestPixel((SCREEN_WIDTH / BASE_WIDTH) * size);
