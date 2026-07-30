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

export interface WeatherHourPoint {
  /** ISO-ish timestamp the provider gave us. */
  time: string;
  /** "3 PM" — what the axis shows. */
  label: string;
  tempC: number;
  /** 0-100, or null when the provider did not send it. */
  rainChance: number | null;
  isNow: boolean;
}

const hourLabel = (date: Date): string => {
  const hours = date.getHours();
  const suffix = hours < 12 ? "AM" : "PM";
  const twelve = hours % 12 === 0 ? 12 : hours % 12;
  return `${twelve} ${suffix}`;
};

/** Providers hand back "YYYY-MM-DD HH:mm"; Safari/Hermes need the T. */
const parseProviderTime = (value: string): Date =>
  new Date(value.includes("T") ? value : value.replace(" ", "T"));

/**
 * The next `count` hours of the forecast, starting at the current hour.
 *
 * Meteoblue returns a week of hourly readings and the WeatherAPI fallback
 * returns today only, so the window is found from the timestamps rather than
 * by indexing with `getHours()` — that only ever worked for the fallback.
 */
export function parseHourlyForecast(
  data: WeatherApiResponse | undefined,
  count = 12,
): WeatherHourPoint[] {
  const hourly = data?.data_1h as
    | (WeatherHourly & {
        time?: string[];
        precipitation_probability?: number[];
      })
    | undefined;

  if (!hourly?.time?.length || !hourly.temperature?.length) return [];

  const now = Date.now();
  const startOfHour = now - (now % (60 * 60 * 1000));

  let start = hourly.time.findIndex(
    (value) => parseProviderTime(value).getTime() >= startOfHour,
  );
  if (start < 0) start = 0;

  return hourly.time
    .slice(start, start + count)
    .map((time, offset) => {
      const index = start + offset;
      const date = parseProviderTime(time);
      const chance = hourly.precipitation_probability?.[index];

      return {
        time,
        label: hourLabel(date),
        tempC: Math.round(hourly.temperature[index]),
        rainChance: typeof chance === "number" ? Math.round(chance) : null,
        isNow: offset === 0,
      };
    })
    .filter((point) => Number.isFinite(point.tempC));
}
