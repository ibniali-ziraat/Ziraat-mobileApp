import axiosInstance from "../api/client/axiosInstance";

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

// WeatherAPI's "Patchy X nearby" / "Patchy light X" codes describe rain
// somewhere in the area, not necessarily at this exact point — they can
// appear alongside willItRain === 0 and a low chance_of_rain. Showing a
// solid rain icon for those overstates it, so fall back to a cloud
// presentation when WeatherAPI's own forecast says it won't actually rain —
// scaled to the actual cloud cover WeatherAPI reports, not a fixed guess.
const PATCHY_NEARBY_CODES = [1063, 1072, 1150, 1180];

const cloudToPictocode = (cloudPercent: number): number => {
  if (cloudPercent < 20) return 1; // Clear sky
  if (cloudPercent < 50) return 2; // Mostly clear
  if (cloudPercent < 85) return 3; // Partly cloudy
  return 4; // Overcast
};

const resolvePictocode = (
  code: number,
  willItRain: number,
  cloudPercent: number,
): number => {
  if (PATCHY_NEARBY_CODES.includes(code) && willItRain === 0) {
    return cloudToPictocode(cloudPercent);
  }
  return toMeteoblueCode(code);
};

export const fetchWeather = async ({ lat, lon }: WeatherRequest) => {
  const { data } = await axiosInstance
    .get("/api/weather/weatherapi/forecast", {
      params: {
        Q: `${lat},${lon}`,
        Days: 7,
        Aqi: "no",
        Alerts: "yes",
      },
    })
    .catch((error) => {
      console.error(
        "[Weather] fetch failed:",
        error?.response?.status,
        error?.response?.data ?? error?.message,
      );
      throw error;
    });

  const current = data.current;
  const allDays = data.forecast.forecastday;
  const forecastDay = allDays[0];
  const hours = forecastDay.hour;
  const iconPath = current.condition?.icon;

  return {
    provider: "weatherapi",
    location_name: data.location?.name,
    data_current: {
      temperature: current.temp_c,
      pictocode: resolvePictocode(
        current.condition.code,
        current.will_it_rain,
        current.cloud,
      ),
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
        resolvePictocode(hour.condition.code, hour.will_it_rain, hour.cloud),
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
      time: allDays.map((d: any) => d.date),
      temperature_max: allDays.map((d: any) => d.day.maxtemp_c),
      temperature_min: allDays.map((d: any) => d.day.mintemp_c),
      // WeatherAPI's day object has no cloud %, so chance_of_rain is the
      // closest available proxy for how unsettled the day looks.
      pictocode: allDays.map((d: any) =>
        resolvePictocode(
          d.day.condition.code,
          d.day.daily_will_it_rain,
          d.day.daily_chance_of_rain,
        ),
      ),
      relativehumidity_mean: allDays.map((d: any) => d.day.avghumidity),
      sunrise: allDays.map((d: any) => d.astro.sunrise),
      sunset: allDays.map((d: any) => d.astro.sunset),
      moonrise: allDays.map((d: any) => d.astro.moonrise),
      moonphase: allDays.map((d: any) => d.astro.moon_phase),
      moonillumination: allDays.map((d: any) =>
        Number(d.astro.moon_illumination),
      ),
    },
  };
};
