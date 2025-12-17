import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../services/weatherService";

export const useWeatherQuery = (city) => {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    enabled: !!city,
  });
};
