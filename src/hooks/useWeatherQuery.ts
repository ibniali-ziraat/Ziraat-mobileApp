// import { useQuery } from "@tanstack/react-query";
// import { fetchWeather } from "../services/weatherService";

// export const useWeatherQuery = (city) => {
//   return useQuery({
//     queryKey: ["weather", city],
//     queryFn: () => fetchWeather(city),
//     enabled: !!city,
//   });
// };

import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../services/weatherService";

type WeatherQueryParams = {
  lat: number | undefined;
  lon: number | undefined;
  asl?: number;
};

export const useWeatherQuery = ({ lat, lon, asl }: WeatherQueryParams) => {
  return useQuery({
    queryKey: ["weather", lat, lon, asl],
    // enabled guarantees lat/lon are finite numbers whenever queryFn runs
    queryFn: () => fetchWeather({ lat: lat as number, lon: lon as number, asl }),
    enabled: Number.isFinite(lat) && Number.isFinite(lon),
    staleTime: 10 * 60 * 1000, // 10 min cache (important!)
    retry: 1,
  });
};
