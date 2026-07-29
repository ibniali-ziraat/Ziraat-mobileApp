import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  Moon,
  Snowflake,
  Sun,
  type LucideIcon,
} from "lucide-react-native";

export type WeatherCodeSet = "daily" | "hourly";
export type WeatherEffect =
  | "clear"
  | "cloudy"
  | "fog"
  | "rain"
  | "storm"
  | "snow";

export type WeatherPresentation = {
  label: string;
  icon: LucideIcon;
  effect: WeatherEffect;
};

const presentation = (
  label: string,
  icon: LucideIcon,
  effect: WeatherEffect,
): WeatherPresentation => ({
  label,
  icon,
  effect,
});

function getDailyPresentation(
  code: number,
  isDaylight: boolean,
): WeatherPresentation {
  if (code === 1) {
    return presentation("Clear sky", isDaylight ? Sun : Moon, "clear");
  }
  if (code === 2) {
    return presentation(
      "Mostly clear",
      isDaylight ? CloudSun : CloudMoon,
      "clear",
    );
  }
  if (code === 3) {
    return presentation(
      "Partly cloudy",
      isDaylight ? CloudSun : CloudMoon,
      "cloudy",
    );
  }
  if (code === 4 || code === 20) {
    return presentation(
      code === 4 ? "Overcast" : "Mostly cloudy",
      Cloud,
      "cloudy",
    );
  }
  if (code === 5) return presentation("Foggy", CloudFog, "fog");
  if ([6, 12, 14, 16].includes(code)) {
    return presentation("Rain", CloudRain, "rain");
  }
  if (code === 7) {
    return presentation("Rain showers", CloudRainWind, "rain");
  }
  if ([8, 21, 22, 23, 24, 25].includes(code)) {
    return presentation("Thunderstorms", CloudLightning, "storm");
  }
  if ([9, 13, 15, 17].includes(code)) {
    return presentation("Snow", CloudSnow, "snow");
  }
  if (code === 10) {
    return presentation("Snow showers", Snowflake, "snow");
  }
  if (code === 11) return presentation("Rain and snow", CloudSnow, "snow");

  return presentation("Weather unavailable", Cloud, "cloudy");
}

function getHourlyPresentation(
  code: number,
  isDaylight: boolean,
): WeatherPresentation {
  if (code >= 1 && code <= 6) {
    return presentation(
      "Mostly clear",
      isDaylight ? Sun : Moon,
      "clear",
    );
  }
  if (code >= 7 && code <= 9) {
    return presentation(
      "Partly cloudy",
      isDaylight ? CloudSun : CloudMoon,
      "cloudy",
    );
  }
  if (code >= 10 && code <= 12) {
    return presentation(
      "Possible thunderstorms",
      isDaylight ? CloudSun : CloudMoon,
      "storm",
    );
  }
  if (code >= 13 && code <= 15) {
    return presentation("Hazy", CloudFog, "fog");
  }
  if (code >= 16 && code <= 18) {
    return presentation("Foggy", CloudFog, "fog");
  }
  if (code >= 19 && code <= 22) {
    return presentation(
      code === 22 ? "Overcast" : "Mostly cloudy",
      Cloud,
      "cloudy",
    );
  }
  if ([23, 25, 33].includes(code)) {
    return presentation("Rain", CloudRain, "rain");
  }
  if ([24, 26, 34].includes(code)) {
    return presentation("Snow", CloudSnow, "snow");
  }
  if ([27, 28, 30].includes(code)) {
    return presentation("Thunderstorms", CloudLightning, "storm");
  }
  if (code === 29) {
    return presentation("Snow thunderstorms", CloudLightning, "storm");
  }
  if (code === 31) {
    return presentation("Rain showers", CloudRainWind, "rain");
  }
  if (code === 32) {
    return presentation("Snow showers", Snowflake, "snow");
  }
  if (code === 35) return presentation("Rain and snow", CloudSnow, "snow");

  return presentation("Weather unavailable", Cloud, "cloudy");
}

export function getWeatherPresentation(
  code: number,
  codeSet: WeatherCodeSet,
  isDaylight = true,
): WeatherPresentation {
  return codeSet === "hourly"
    ? getHourlyPresentation(code, isDaylight)
    : getDailyPresentation(code, isDaylight);
}
