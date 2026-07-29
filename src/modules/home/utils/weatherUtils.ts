export interface WeatherState {
  tempC: number;
  feelsLikeC: number;
  condition: number;
  humidity: number;
  windKph: number;
  windDir: number;
  isDaylight?: number;
  highTemp: number;
  lowTemp: number;
  conditionSet: "daily" | "hourly";
  iconUrl?: string;
  locationName?: string;
}

interface WeatherCurrent {
  temperature: number;
  pictocode: number;
  relativehumidity: number;
  windspeed: number;
  isdaylight: number;
  condition_icon?: string;
}

interface WeatherHourly {
  temperature: number[];
  felttemperature: number[];
  pictocode: number[];
  relativehumidity: number[];
  windspeed: number[];
  winddirection: number[];
}

interface WeatherDaily {
  temperature_max: number[];
  temperature_min: number[];
}

export interface WeatherApiResponse {
  location_name?: string;
  data_current?: WeatherCurrent;
  data_1h: WeatherHourly;
  data_day: WeatherDaily;
}

export function parseWeather(
  data: WeatherApiResponse | undefined,
): WeatherState | null {
  if (!data) return null;

  const high = Math.round(data.data_day.temperature_max[0]);
  const low = Math.round(data.data_day.temperature_min[0]);

  if (data.data_current) {
    const c = data.data_current;
    return {
      tempC: Math.round(c.temperature),
      feelsLikeC: Math.round(c.temperature),
      condition: c.pictocode,
      humidity: c.relativehumidity ?? 0,
      windKph: Math.round(c.windspeed),
      windDir: 0,
      isDaylight: c.isdaylight,
      highTemp: high,
      lowTemp: low,
      conditionSet: "daily",
      iconUrl: c.condition_icon,
      locationName: data.location_name,
    };
  }

  const hour = new Date().getHours();
  const h = data.data_1h;
  return {
    tempC: Math.round(h.temperature[hour]),
    feelsLikeC: Math.round(h.felttemperature[hour]),
    condition: h.pictocode[hour],
    humidity: h.relativehumidity[hour],
    windKph: Math.round(h.windspeed[hour]),
    windDir: h.winddirection[hour],
    highTemp: high,
    lowTemp: low,
    conditionSet: "hourly",
    locationName: data.location_name,
  };
}
