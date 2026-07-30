import ScreenLayout from "@/src/components/shared/ScreenLayout";
import SearchBar from "@/src/components/shared/SearchBar";
import { useLocation } from "@/src/hooks/useLocationPermission";
import { useLocationSearch } from "@/src/hooks/useLocationSearch";
import { useWeatherQuery } from "@/src/hooks/useWeatherQuery";
import WeatherCard from "@/src/modules/home/components/weatherCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";

import AveragesCard from "@/src/components/AveragesCard";
import FeelsLikeCard from "@/src/components/FeelsLikeCard";
import HourlyCard from "@/src/components/HourlyCard";
import HumidityCard from "@/src/components/HumidityCard";
import { MoonCard } from "@/src/components/MoonCard";
import { Precipitation } from "@/src/components/Precipitation";
import PressureCard from "@/src/components/PressureCard";
import BackHeader from "@/src/components/shared/BackHeader";
import Loader from "@/src/components/shared/Loader";
import Map from "@/src/components/shared/Map";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import StormCard from "@/src/components/StormCard";
import SunsetCard from "@/src/components/SunsetCard";
import UVCard from "@/src/components/UVCard";
import VisibilityCard from "@/src/components/VisibilityCard";
import TenDayForecastCard from "@/src/components/WeeklyCard";
import WindCard from "@/src/components/WindCard";
import { ROUTES } from "@/src/constants/routes";
import DashboardSectionHeader from "@/src/modules/home/components/dashboard/DashboardSectionHeader";
import { router } from "expo-router";

export default function WeatherScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [cityName, setCityName] = useState<string | null>(null);

  const { coords } = useLocation();

  const {
    coords: searchedCoords,
    name: searchedName,
    loading,
  } = useLocationSearch(search);

  useEffect(() => {
    if (searchedName) setCityName(searchedName);
  }, [searchedName]);

  const finalCoords = searchedCoords ??
    coords ?? {
    lat: 34.0837,
    lon: 74.7973,
  };

  const { data } = useWeatherQuery({
    lat: finalCoords.lat,
    lon: finalCoords.lon,
    asl: 1593,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const currentWeather = useMemo(() => {
    if (!data) return null;

    if (data.data_current) {
      return {
        tempC: Math.round(data.data_current.temperature),
        feelsLikeC: Math.round(data.data_current.temperature),
        condition: data.data_current.pictocode,
        humidity: data.data_current.relativehumidity ?? 0,
        windKph: Math.round(data.data_current.windspeed),
        windDir: 0,
        isDaylight: data.data_current.isdaylight,
        highTemp: Math.round(data.data_day.temperature_max[0]),
        lowTemp: Math.round(data.data_day.temperature_min[0]),
      };
    }

    const hour = new Date().getHours();

    return {
      tempC: Math.round(data.data_1h.temperature[hour]),
      feelsLikeC: Math.round(data.data_1h.felttemperature[hour]),
      condition: data.data_1h.pictocode[hour],
      humidity: data.data_1h.relativehumidity[hour],
      windKph: Math.round(data.data_1h.windspeed[hour]),
      windDir: data.data_1h.winddirection[hour],
      highTemp: Math.round(data.data_day.temperature_max[0]),
      lowTemp: Math.round(data.data_day.temperature_min[0]),
    };
  }, [data]);

  const uvIndex = data?.data_1h?.uvindex?.[0];
  const todayHumidity = data?.data_day?.relativehumidity_mean?.[0] ?? 0;
  const sunriseTime = data?.data_day?.sunrise?.[0];
  const sunsetTime = data?.data_day?.sunset?.[0];
  const visibilityVal = data?.data_1h?.visibility?.[0] ?? 10000;
  const dayData = data?.data_day;

  return (
    <ScreenLayout>
      <ScreenContent>
        <View className="pb-10">
          <BackHeader
            title="Weather"
            onPress={() => router.replace(ROUTES.TABS.HOME)}
          />
          <SearchBar
            search={search}
            setSearch={setSearch}
            placeholder="Search City..."
          />

          {search.length >= 3 && loading ? (
            <Loader />
          ) : (
            <>
              {data && currentWeather && (
                <>
                  <WeatherCard
                    current={currentWeather}
                    city={cityName || "Srinagar "}
                  />

                  <DashboardSectionHeader
                    title="Hourly forecast"
                    topSpacing={22}
                  />
                  {data && <HourlyCard data_1h={data.data_1h} />}

                  <View style={{ marginTop: 12 }}>
                    <StormCard />
                  </View>

                  {data?.data_day && (
                    <>
                      <DashboardSectionHeader
                        title="10-day forecast"
                        topSpacing={22}
                      />
                      <TenDayForecastCard data_day={data.data_day} />
                    </>
                  )}

                  <DashboardSectionHeader
                    title="Conditions"
                    subtitle="Everything else worth knowing right now"
                    topSpacing={22}
                  />

                  <View style={{ flexDirection: "row", gap: 12 }}>
                    <View style={{ flex: 1 }}>
                      {data?.data_1h?.felttemperature?.length > 0 && (
                        <FeelsLikeCard
                          temp={Math.round(data.data_1h.felttemperature[0])}
                          actualTemp={Math.round(data.data_1h.temperature[0])}
                        />
                      )}
                    </View>

                    <View style={{ flex: 1 }}>
                      {uvIndex !== undefined && (
                        <UVCard value={Math.round(uvIndex)} />
                      )}
                    </View>
                  </View>

                  {data?.data_1h?.windspeed && data?.data_1h?.winddirection && (
                    <View style={{ marginTop: 12 }}>
                      <WindCard
                        speed={Math.round(data.data_1h.windspeed[0] * 3.6)}
                        gusts={Math.round(data.data_1h.windspeed[0] * 3.6 * 1.6)}
                        degree={data.data_1h.winddirection[0]}
                      />
                    </View>
                  )}

                  <View style={{ marginTop: 12, flexDirection: "row", gap: 12 }}>
                    <View style={{ flex: 1 }}>
                      {data?.data_1h?.sealevelpressure && (
                        <PressureCard value={data.data_1h.sealevelpressure[0]} />
                      )}
                    </View>

                    <View style={{ flex: 1 }}>
                      <HumidityCard value={todayHumidity} />
                    </View>
                  </View>

                  <View style={{ marginTop: 12, flexDirection: "row", gap: 12 }}>
                    <View style={{ flex: 1 }}>
                      <VisibilityCard distance={visibilityVal} />
                    </View>

                    <View style={{ flex: 1 }}>
                      <SunsetCard sunrise={sunriseTime} sunset={sunsetTime} />
                    </View>
                  </View>

                  <View style={{ marginTop: 12 }}>
                    <MoonCard
                      phaseValue={data?.data_day?.moonphase?.[0]}
                      illumination={data?.data_day?.moonillumination?.[0]}
                      moonrise={data?.data_day?.moonrise?.[0]}
                    />
                  </View>

                  <View style={{ marginTop: 12, flexDirection: "row", gap: 12 }}>
                    <View style={{ flex: 1 }}>
                      <AveragesCard
                        currentMax={Math.round(dayData?.temperature_max?.[0] ?? 0)}
                        averageMax={8}
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Precipitation
                        amount={dayData?.precipitation?.[0] ?? 0}
                        probability={dayData?.precipitation_probability?.[0] ?? 0}
                      />
                    </View>
                  </View>
                </>
              )}
            </>
          )}
        </View>
        <Map />
      </ScreenContent>
    </ScreenLayout>
  );
}
