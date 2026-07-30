import type { ImageSourcePropType } from "react-native";
import type { WeatherEffect } from "./weatherPictogram";

const backgrounds = {
  clearDay: require("@/assets/images/weather-conditions/clear-day.jpg"),
  clearNight: require("@/assets/images/weather-conditions/clear-night.jpg"),
  cloudy: require("@/assets/images/weather-conditions/cloudy.jpg"),
  fog: require("@/assets/images/weather-conditions/fog.jpg"),
  rain: require("@/assets/images/weather-conditions/rain.jpg"),
  storm: require("@/assets/images/weather-conditions/storm.jpg"),
  snow: require("@/assets/images/weather-conditions/snow.jpg"),
} satisfies Record<string, ImageSourcePropType>;

export function getWeatherBackground(
  effect: WeatherEffect,
  isDaylight: boolean,
): ImageSourcePropType {
  if (effect === "clear") {
    return isDaylight ? backgrounds.clearDay : backgrounds.clearNight;
  }
  return backgrounds[effect];
}
