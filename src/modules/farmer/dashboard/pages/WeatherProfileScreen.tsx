import AveragesCard from "@/src/components/AveragesCard";
import HourlyCard from "@/src/components/HourlyCard";
import HumidityCard from "@/src/components/HumidityCard";
import { Precipitation } from "@/src/components/Precipitation";
import BackHeader from "@/src/components/shared/BackHeader";
import SearchBar from "@/src/components/shared/SearchBar";
import StormCard from "@/src/components/StormCard";
import VisibilityCard from "@/src/components/VisibilityCard";
import WeeklyCard from "@/src/components/WeeklyCard";
import WindCard from "@/src/components/WindCard";
import WeatherCard from "@/src/modules/home/components/weatherCard";
import { useCallback, useState } from "react";
import { RefreshControl, View } from "react-native";

import FeelsLikeCard from "@/src/components/FeelsLikeCard";
import { MoonCard } from "@/src/components/MoonCard";
import PressureCard from "@/src/components/PressureCard";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import SunsetCard from "@/src/components/SunsetCard";
import UVCard from "@/src/components/UVCard";
import { useLocation } from "@/src/hooks/useLocationPermission";
import { useWeatherQuery } from "@/src/hooks/useWeatherQuery";
import { useLocalSearchParams } from "expo-router";

export default function WeatherScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const { weatherData } = useLocalSearchParams();
  const currentWeather = weatherData ? JSON.parse(weatherData as string) : null;
  const { coords, loading: locLoading, error: locError } = useLocation();

  const { data } = useWeatherQuery({
    lat: coords?.lat ?? 34.0837,
    lon: coords?.lon ?? 74.7973,
    asl: 1593,
  });

  // console.log(coords, "getting cords ");
  const uvIndex = data?.data_1h?.uvindex?.[0];
  const todayHumidity = data?.data_day?.relativehumidity_mean?.[0] ?? 0;

  // Inside your WeatherScreen function
  const sunriseTime = data?.data_day?.sunrise?.[0]; // e.g., "2025-12-25 07:15"
  const sunsetTime = data?.data_day?.sunset?.[0]; // e.g., "2025-12-25 17:30"
  const visibilityVal = data?.data_1h?.visibility?.[0] ?? 10000; // in meters

  const dayData = data?.data_day;

  return (
    <ScreenLayout
      className="flex-1"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <BackHeader title="Weather" desc="Manage Your Weather & Orchards" />

      <View className="h-fit pb-10">
        <SearchBar search={search} setSearch={setSearch} />

        <WeatherCard current={currentWeather} />

        {data && <HourlyCard data_1h={data.data_1h} />}

        <StormCard />

        {/* WEEKLY FORECAST */}
        {data?.data_day && <WeeklyCard data_day={data.data_day} />}

        {/* FEELS LIKE + UV */}
        <View className="flex-row justify-between">
          {data?.data_1h?.felttemperature?.length > 0 && (
            <FeelsLikeCard
              temp={Math.round(data.data_1h.felttemperature[0])}
              actualTemp={Math.round(data.data_1h.temperature[0])}
            />
          )}

          {uvIndex !== undefined && <UVCard value={Math.round(uvIndex)} />}
        </View>

        {/* WIND (SAFE GUARDED) */}
        {data?.data_1h?.windspeed?.length > 0 &&
          data?.data_1h?.winddirection?.length > 0 && (
            <WindCard
              speed={Math.round(data.data_1h.windspeed[0] * 3.6)} // m/s → km/h
              gusts={Math.round(data.data_1h.windspeed[0] * 3.6 * 1.6)}
              degree={data.data_1h.winddirection[0]}
            />
          )}

        <View className="mt-4 flex-row justify-between w-full">
          {/* <PressureCard value={1028} /> */}
          {data?.data_1h?.sealevelpressure?.length > 0 && (
            <PressureCard value={data.data_1h.sealevelpressure[0]} />
          )}

          {/* <HumidityCard /> */}
          <HumidityCard value={todayHumidity} />
        </View>

        <View className="mt-2 flex-row justify-between mb-3">
          <VisibilityCard distance={visibilityVal} />
          <SunsetCard sunrise={sunriseTime} sunset={sunsetTime} />
        </View>

        <MoonCard
          // Try these alternative keys if the first ones failed
          phaseValue={
            data?.data_day?.moonphase?.[0] ?? data?.data_day?.moonphase_day?.[0]
          }
          illumination={
            data?.data_day?.moonillumination?.[0] ??
            data?.data_day?.moonillumination_day?.[0]
          }
          moonrise={data?.data_day?.moonrise?.[0]}
        />

        <View className="flex-row justify-between">
          <AveragesCard
            currentMax={Math.round(dayData?.temperature_max?.[0])}
            averageMax={8} // Example: standard avg for December
          />
          <Precipitation
            amount={dayData?.precipitation?.[0]}
            probability={dayData?.precipitation_probability?.[0]}
          />
        </View>
      </View>
    </ScreenLayout>
  );
}
