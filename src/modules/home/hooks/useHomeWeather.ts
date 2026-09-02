import { useLocation } from "@/src/hooks/useLocationPermission";
import { useWeatherQuery } from "@/src/hooks/useWeatherQuery";
import { useMemo } from "react";
import {
  parseHourlyForecast,
  parseWeather,
  WeatherApiResponse,
  WeatherHourPoint,
  WeatherState,
} from "../utils/weatherUtils";

interface UseHomeWeatherReturn {
  currentWeather: WeatherState | null;
  /** Next 12 hours, for the detail sheet's column chart. */
  hourly: WeatherHourPoint[];
  isLoading: boolean;
  locLoading: boolean;
}

export function useHomeWeather(): UseHomeWeatherReturn {
  const { coords, loading: locLoading } = useLocation();

  const { data, isLoading } = useWeatherQuery({
    lat: coords?.lat,
    lon: coords?.lon,
    asl: 1593,
  });

  const currentWeather = useMemo(
    () => parseWeather(data as WeatherApiResponse | undefined),
    [data],
  );

  const hourly = useMemo(
    () => parseHourlyForecast(data as WeatherApiResponse | undefined),
    [data],
  );

  return { currentWeather, hourly, isLoading, locLoading };
}
