import axios, { isAxiosError } from "axios";
import { weatherInstance } from "../api/client/weatherInstance";

type WeatherRequest = {
  lat: number;
  lon: number;
  asl?: number;
};

const toMeteoblueCode = (code: number): number => {
  if (code === 1000) return 1;
  if (code === 1003) return 2;
  if (code === 1006) return 3;
  if (code === 1009) return 4;
  if ([1030, 1135, 1147].includes(code)) return 5;
  if (
    [
      1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192,
      1195, 1198, 1201, 1240, 1243, 1246,
    ].includes(code)
  ) {
    return 6;
  }
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return 8;
  if (
    [
      1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258,
    ].includes(code)
  ) {
    return 9;
  }
  if ([1069, 1204, 1207, 1237, 1249, 1252, 1261, 1264].includes(code)) {
    return 11;
  }
  return 4;
};

const fetchWeatherApiFallback = async ({ lat, lon }: WeatherRequest) => {
  const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
  const baseURL =
    process.env.EXPO_PUBLIC_WEATHER_BASE_URL ??
    "https://api.weatherapi.com/v1/forecast.json";

  if (!apiKey) {
    throw new Error("WeatherAPI fallback key is not configured.");
  }

  const { data } = await axios.get(baseURL, {
    params: {
      key: apiKey,
      q: `${lat},${lon}`,
      days: 1,
      aqi: "no",
      alerts: "no",
    },
  });

  const current = data.current;
  const forecastDay = data.forecast.forecastday[0];
  const hours = forecastDay.hour;
  const iconPath = current.condition?.icon;

  return {
    provider: "weatherapi",
    location_name: data.location?.name,
    data_current: {
      temperature: current.temp_c,
      pictocode: toMeteoblueCode(current.condition.code),
      condition_icon: iconPath
        ? iconPath.startsWith("//")
          ? `https:${iconPath}`
          : iconPath
        : undefined,
      relativehumidity: current.humidity,
      windspeed: current.wind_kph / 3.6,
      isdaylight: current.is_day,
    },
    data_1h: {
      time: hours.map((hour: any) => hour.time),
      temperature: hours.map((hour: any) => hour.temp_c),
      felttemperature: hours.map((hour: any) => hour.feelslike_c),
      pictocode: hours.map((hour: any) =>
        toMeteoblueCode(hour.condition.code),
      ),
      relativehumidity: hours.map((hour: any) => hour.humidity),
      windspeed: hours.map((hour: any) => hour.wind_kph / 3.6),
      winddirection: hours.map((hour: any) => hour.wind_degree),
      isdaylight: hours.map((hour: any) => hour.is_day),
      precipitation_probability: hours.map(
        (hour: any) => hour.chance_of_rain,
      ),
      uvindex: hours.map((hour: any) => hour.uv),
      sealevelpressure: hours.map((hour: any) => hour.pressure_mb),
      visibility: hours.map((hour: any) => hour.vis_km * 1000),
    },
    data_day: {
      time: [forecastDay.date],
      temperature_max: [forecastDay.day.maxtemp_c],
      temperature_min: [forecastDay.day.mintemp_c],
      pictocode: [toMeteoblueCode(forecastDay.day.condition.code)],
      relativehumidity_mean: [forecastDay.day.avghumidity],
      sunrise: [forecastDay.astro.sunrise],
      sunset: [forecastDay.astro.sunset],
      moonrise: [forecastDay.astro.moonrise],
      moonphase: [forecastDay.astro.moon_phase],
      moonillumination: [Number(forecastDay.astro.moon_illumination)],
    },
  };
};

export const fetchWeather = async ({ lat, lon, asl }: WeatherRequest) => {
  const packages = "basic-1h_basic-day_sunmoon_clouds-1h";

  try {
    const { data } = await weatherInstance.get(packages, {
      params: { lat, lon, asl },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.warn(
        `[Weather] Meteoblue unavailable (${error.response?.status ?? "network"}); using WeatherAPI fallback.`,
      );
    }
    return fetchWeatherApiFallback({ lat, lon, asl });
  }
};
