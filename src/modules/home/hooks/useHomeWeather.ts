import { useLocation } from "@/src/hooks/useLocationPermission";
import { useTehsilLocation } from "@/src/hooks/useTehsilLocation";
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
  // Registered tehsil is the default weather location — GPS is only used
  // (and only asks for permission) once we've confirmed no tehsil is on file.
  const { coords: tehsilCoords, tehsilName, loading: tehsilLoading } =
    useTehsilLocation();
  const gpsEnabled = !tehsilLoading && !tehsilCoords;
  const { coords: gpsCoords, loading: gpsLoading } = useLocation(gpsEnabled);

  const coords = tehsilCoords ?? (gpsEnabled ? gpsCoords : null);
  const locLoading = tehsilLoading || (gpsEnabled && gpsLoading);

  const { data, isLoading } = useWeatherQuery({
    lat: coords?.lat,
    lon: coords?.lon,
    asl: 1593,
  });

  const currentWeather = useMemo(() => {
    const parsed = parseWeather(data as WeatherApiResponse | undefined);
    // Show the registered tehsil name, not whatever WeatherAPI's own
    // reverse-geocoding calls that coordinate (a different, nearby-place
    // name from a separate provider than the one that resolved the tehsil).
    if (parsed && tehsilCoords && tehsilName) {
      return { ...parsed, locationName: tehsilName };
    }
    return parsed;
  }, [data, tehsilCoords, tehsilName]);

  const hourly = useMemo(
    () => parseHourlyForecast(data as WeatherApiResponse | undefined),
    [data],
  );

  return { currentWeather, hourly, isLoading, locLoading };
}
