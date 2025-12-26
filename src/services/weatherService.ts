import { weatherInstance } from "../api/client/weatherInstance";

export const fetchWeather = async ({ lat, lon, asl }: any) => {
  // Define the packages you need for your cards
  const packages = "basic-1h_basic-day_sunmoon_clouds-1h";

  const { data } = await weatherInstance.get(packages, {
    params: {
      lat,
      lon,
      asl,
    },
  });

  return data;
};
