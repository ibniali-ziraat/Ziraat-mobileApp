// useWeatherImageQuery.ts
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherImage } from "../services/weatherImageService";

// 1. Update the Hook Definition
export const useWeatherImageQuery = ({
  lat,
  lon,
  locationName,
}: {
  lat: number;
  lon: number;
  locationName: string;
}) => {
  return useQuery({
    // Keep the queryKey as an array
    queryKey: ["weather-meteogram", lat, lon, locationName],
    // Pass the object into the service function
    queryFn: () => fetchWeatherImage({ lat, lon, locationName }),
    staleTime: 60 * 60 * 1000,
  });
};
