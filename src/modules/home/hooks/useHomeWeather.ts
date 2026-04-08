import { useLocation } from "@/src/hooks/useLocationPermission";
import { useWeatherQuery } from "@/src/hooks/useWeatherQuery";
import { useMemo } from "react";
import {
  parseWeather,
  WeatherApiResponse,
  WeatherState,
} from "../utils/weatherUtils";

interface UseHomeWeatherReturn {
  currentWeather: WeatherState | null;
  isLoading: boolean;
  locLoading: boolean;
}

export function useHomeWeather(): UseHomeWeatherReturn {
  const { coords, loading: locLoading } = useLocation();

  const { data, isLoading } = useWeatherQuery({
    lat: coords?.lat ?? 34.0837,
    lon: coords?.lon ?? 74.7973,
    asl: 1593,
  });

  const currentWeather = useMemo(
    () => parseWeather(data as WeatherApiResponse | undefined),
    [data],
  );

  return { currentWeather, isLoading, locLoading };
}
