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

/** Used when there's neither a registered tehsil nor a GPS fix. */
const DEFAULT_LOCATION = { lat: 34.0837, lon: 74.7973, name: "Srinagar" };

export type WeatherSource = "tehsil" | "gps" | "default";

interface UseHomeWeatherReturn {
  currentWeather: WeatherState | null;
  /** Next 12 hours, for the detail sheet's column chart. */
  hourly: WeatherHourPoint[];
  isLoading: boolean;
  locLoading: boolean;
  /** Where the coordinates came from — "default" means the Srinagar fallback. */
  source: WeatherSource | null;
}

export function useHomeWeather(): UseHomeWeatherReturn {
  // Registered tehsil is the default weather location — GPS is only used
  // (and only asks for permission) once we've confirmed no tehsil is on file.
  const {
    coords: tehsilCoords,
    tehsilName,
    loading: tehsilLoading,
  } = useTehsilLocation();
  const gpsEnabled = !tehsilLoading && !tehsilCoords;
  const { coords: gpsCoords, loading: gpsLoading } = useLocation(gpsEnabled, {
    prompt: false,
  });

  const locLoading = tehsilLoading || (gpsEnabled && gpsLoading);
  // Tehsil first, then GPS; once both have settled empty, fall back to
  // Srinagar so the card always has weather to show.
  const source: WeatherSource | null = tehsilCoords
    ? "tehsil"
    : gpsEnabled && gpsCoords
      ? "gps"
      : locLoading
        ? null
        : "default";
  const coords =
    source === "tehsil"
      ? tehsilCoords
      : source === "gps"
        ? gpsCoords
        : source === "default"
          ? DEFAULT_LOCATION
          : null;

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
    if (parsed && source === "default") {
      return { ...parsed, locationName: DEFAULT_LOCATION.name };
    }
    return parsed;
  }, [data, tehsilCoords, tehsilName, source]);

  const hourly = useMemo(
    () => parseHourlyForecast(data as WeatherApiResponse | undefined),
    [data],
  );

  return { currentWeather, hourly, isLoading, locLoading, source };
}
