import BackHeader from "@/src/components/shared/BackHeader";
import Loader from "@/src/components/shared/Loader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { cardShadow, cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { useLocation } from "@/src/hooks/useLocationPermission";
import { useLocationSearch } from "@/src/hooks/useLocationSearch";
import { useWeatherQuery } from "@/src/hooks/useWeatherQuery";
import HourlyCard from "@/src/components/HourlyCard";
import TenDayForecastCard from "@/src/components/WeeklyCard";
import WeatherCard from "@/src/modules/home/components/weatherCard";
import { router } from "expo-router";
import {
  Cloud,
  Droplets,
  Eye,
  Gauge,
  LocateFixed,
  Moon,
  Search,
  Sunrise,
  Sunset,
  Thermometer,
  Umbrella,
  Wind,
  X,
  type LucideIcon,
} from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { Pressable, RefreshControl, Text, TextInput, View } from "react-native";

type Metric = {
  label: string;
  value: string;
  helper?: string;
  icon: LucideIcon;
  accent?: string;
};

const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const formatTime = (value?: string) => {
  if (!value) return undefined;
  const parsed = new Date(
    value.includes("T") ? value : value.replace(" ", "T"),
  );
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }
  return value;
};

const currentHourlyIndex = (times?: string[]) => {
  if (!times?.length) return 0;
  const now = Date.now();
  const next = times.findIndex((value) => {
    const parsed = new Date(
      value.includes("T") ? value : value.replace(" ", "T"),
    );
    return !Number.isNaN(parsed.getTime()) && parsed.getTime() >= now;
  });
  return next < 0 ? Math.max(times.length - 1, 0) : next;
};

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={{ marginTop: 24, marginBottom: 10 }}>
      <Text
        style={[
          typography.Poppins_m_semibold,
          { color: cardTokens.inkPrimary, fontSize: 17 },
        ]}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          style={[
            typography.Poppins_xs_regular,
            { color: cardTokens.inkMuted, fontSize: 11.5, marginTop: 2 },
          ]}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

function MetricTile({ metric }: { metric: Metric }) {
  const Icon = metric.icon;
  const accent = metric.accent ?? colors.primary;

  return (
    <View
      style={[
        {
          width: "48.4%",
          minHeight: 122,
          padding: 14,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: cardTokens.border,
          backgroundColor: cardTokens.surface,
        },
        cardShadow,
      ]}
    >
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 11,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: cardTokens.mutedSurface,
        }}
      >
        <Icon size={17} color={accent} strokeWidth={2} />
      </View>
      <Text
        numberOfLines={1}
        style={[
          typography.Poppins_l_semibold,
          { color: cardTokens.inkPrimary, fontSize: 19, marginTop: 10 },
        ]}
      >
        {metric.value}
      </Text>
      <Text
        numberOfLines={1}
        style={[
          typography.Poppins_xs_medium,
          { color: cardTokens.inkSecondary, fontSize: 11.5, marginTop: 1 },
        ]}
      >
        {metric.label}
      </Text>
      {metric.helper ? (
        <Text
          numberOfLines={1}
          style={[
            typography.Poppins_xs_regular,
            { color: cardTokens.inkMuted, fontSize: 10, marginTop: 2 },
          ]}
        >
          {metric.helper}
        </Text>
      ) : null}
    </View>
  );
}

export default function WeatherScreen() {
  const [search, setSearch] = useState("");
  const [cityName, setCityName] = useState<string | null>(null);
  const { coords, loading: locationLoading } = useLocation();
  const {
    coords: searchedCoords,
    name: searchedName,
    loading: searchLoading,
    notFound,
  } = useLocationSearch(search.trim());

  useEffect(() => {
    setCityName(search.trim().length >= 3 ? searchedName : null);
  }, [search, searchedName]);

  const finalCoords = searchedCoords ??
    coords ?? { lat: 34.0837, lon: 74.7973 };
  const { data, isLoading, isFetching, isError, refetch } = useWeatherQuery({
    lat: finalCoords.lat,
    lon: finalCoords.lon,
  });

  const hourlyIndex = useMemo(
    () => currentHourlyIndex(data?.data_1h?.time),
    [data?.data_1h?.time],
  );

  const currentWeather = useMemo(() => {
    if (!data?.data_day) return null;
    const hourly = data.data_1h;
    const current = data.data_current;
    const temperature =
      current?.temperature ?? hourly?.temperature?.[hourlyIndex];
    const feelsLike = hourly?.felttemperature?.[hourlyIndex] ?? temperature;
    const condition = current?.pictocode ?? hourly?.pictocode?.[hourlyIndex];
    const humidity =
      current?.relativehumidity ?? hourly?.relativehumidity?.[hourlyIndex];
    const windspeed = current?.windspeed ?? hourly?.windspeed?.[hourlyIndex];
    const high = data.data_day.temperature_max?.[0];
    const low = data.data_day.temperature_min?.[0];

    if (![temperature, condition, high, low].every(isNumber)) return null;

    return {
      tempC: Math.round(temperature),
      feelsLikeC: isNumber(feelsLike)
        ? Math.round(feelsLike)
        : Math.round(temperature),
      condition,
      humidity: isNumber(humidity) ? Math.round(humidity) : 0,
      windKph: isNumber(windspeed) ? Math.round(windspeed * 3.6) : 0,
      windDir: hourly?.winddirection?.[hourlyIndex] ?? 0,
      isDaylight: current?.isdaylight ?? hourly?.isdaylight?.[hourlyIndex],
      highTemp: Math.round(high),
      lowTemp: Math.round(low),
      conditionSet: current ? ("daily" as const) : ("hourly" as const),
      iconUrl: current?.condition_icon,
      locationName: data.location_name,
    };
  }, [data, hourlyIndex]);

  const metrics = useMemo<Metric[]>(() => {
    if (!data) return [];
    const hour = data.data_1h ?? {};
    const day = data.data_day ?? {};
    const at = (field: string) => hour[field]?.[hourlyIndex];
    const result: Metric[] = [];

    const feels = at("felttemperature");
    if (isNumber(feels)) {
      result.push({
        label: "Feels like",
        value: `${Math.round(feels)}°`,
        icon: Thermometer,
      });
    }
    const humidity =
      data.data_current?.relativehumidity ?? at("relativehumidity");
    if (isNumber(humidity)) {
      result.push({
        label: "Humidity",
        value: `${Math.round(humidity)}%`,
        icon: Droplets,
      });
    }
    const wind = data.data_current?.windspeed ?? at("windspeed");
    if (isNumber(wind)) {
      const direction = at("winddirection");
      result.push({
        label: "Wind",
        value: `${Math.round(wind * 3.6)} km/h`,
        helper: isNumber(direction)
          ? `${Math.round(direction)}° direction`
          : undefined,
        icon: Wind,
      });
    }
    const rainChance = at("precipitation_probability");
    const rainAmount = at("precipitation");
    if (isNumber(rainChance) || isNumber(rainAmount)) {
      result.push({
        label: "Precipitation",
        value: isNumber(rainChance)
          ? `${Math.round(rainChance)}%`
          : `${rainAmount} mm`,
        helper: isNumber(rainAmount) ? `${rainAmount} mm expected` : undefined,
        icon: Umbrella,
        accent: colors.secondary,
      });
    }
    const uv = at("uvindex");
    if (isNumber(uv))
      result.push({
        label: "UV index",
        value: `${Math.round(uv)}`,
        icon: Sunrise,
      });
    const pressure = at("sealevelpressure");
    if (isNumber(pressure)) {
      result.push({
        label: "Pressure",
        value: `${Math.round(pressure)} hPa`,
        icon: Gauge,
      });
    }
    const visibility = at("visibility");
    if (isNumber(visibility)) {
      result.push({
        label: "Visibility",
        value: `${(visibility / 1000).toFixed(1)} km`,
        icon: Eye,
      });
    }
    const clouds = at("totalcloudcover") ?? at("cloudcover");
    if (isNumber(clouds)) {
      result.push({
        label: "Cloud cover",
        value: `${Math.round(clouds)}%`,
        icon: Cloud,
      });
    }
    const sunrise = formatTime(day.sunrise?.[0]);
    if (sunrise)
      result.push({
        label: "Sunrise",
        value: sunrise,
        icon: Sunrise,
        accent: colors.secondary,
      });
    const sunset = formatTime(day.sunset?.[0]);
    if (sunset)
      result.push({
        label: "Sunset",
        value: sunset,
        icon: Sunset,
        accent: colors.secondary,
      });
    const moonrise = formatTime(day.moonrise?.[0]);
    if (moonrise)
      result.push({ label: "Moonrise", value: moonrise, icon: Moon });
    const illumination = day.moonillumination?.[0];
    if (isNumber(illumination)) {
      result.push({
        label: "Moon illumination",
        value: `${Math.round(illumination)}%`,
        helper: day.moonphase?.[0] ? String(day.moonphase[0]) : undefined,
        icon: Moon,
      });
    }

    return result;
  }, [data, hourlyIndex]);

  const showInitialLoader = (isLoading || locationLoading) && !data;
  const searching = search.trim().length >= 3 && searchLoading;

  return (
    <ScreenLayout
      refreshControl={
        <RefreshControl
          refreshing={isFetching && !isLoading}
          onRefresh={refetch}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
    >
      <ScreenContent>
        <View style={{ paddingBottom: 28 }}>
          <BackHeader
            title="Weather"
            onPress={() => router.replace(ROUTES.TABS.HOME)}
          />

          <View
            style={{
              height: 50,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 15,
              marginBottom: 18,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: cardTokens.hairline,
              backgroundColor: cardTokens.surface,
            }}
          >
            <Search size={19} color={colors.primary} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search city or place"
              placeholderTextColor={cardTokens.inkMuted}
              returnKeyType="search"
              autoCorrect={false}
              style={[
                typography.Poppins_s_regular,
                {
                  flex: 1,
                  height: 48,
                  paddingHorizontal: 11,
                  color: cardTokens.inkPrimary,
                  fontSize: 14,
                },
              ]}
            />
            {search ? (
              <Pressable
                onPress={() => setSearch("")}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel="Clear weather search"
              >
                <X size={18} color={cardTokens.inkSecondary} />
              </Pressable>
            ) : (
              <LocateFixed size={18} color={cardTokens.inkMuted} />
            )}
          </View>

          {searching || showInitialLoader ? (
            <Loader />
          ) : notFound && search.trim().length >= 3 ? (
            <View style={{ alignItems: "center", paddingVertical: 48 }}>
              <Search size={32} color={cardTokens.inkMuted} />
              <Text
                style={[
                  typography.Poppins_s_semibold,
                  { color: cardTokens.inkPrimary, marginTop: 12 },
                ]}
              >
                Location not found
              </Text>
              <Text
                style={[
                  typography.Poppins_xs_regular,
                  {
                    color: cardTokens.inkMuted,
                    fontSize: 12,
                    marginTop: 4,
                  },
                ]}
              >
                Check the spelling or try a nearby city
              </Text>
            </View>
          ) : isError ? (
            <View style={{ alignItems: "center", paddingVertical: 48 }}>
              <Cloud size={34} color={cardTokens.inkMuted} />
              <Text
                style={[
                  typography.Poppins_s_semibold,
                  { color: cardTokens.inkPrimary, marginTop: 12 },
                ]}
              >
                Weather is unavailable
              </Text>
              <Pressable onPress={() => refetch()} style={{ padding: 12 }}>
                <Text
                  style={[
                    typography.Poppins_s_medium,
                    { color: colors.primary },
                  ]}
                >
                  Try again
                </Text>
              </Pressable>
            </View>
          ) : data && currentWeather ? (
            <>
              <WeatherCard
                current={currentWeather}
                city={cityName || data.location_name || "Current location"}
              />

              {data.data_1h?.time?.length &&
              data.data_1h?.temperature?.length ? (
                <>
                  <SectionHeading
                    title="Hourly forecast"
                    subtitle="What to expect through the day"
                  />
                  <HourlyCard data_1h={data.data_1h} />
                </>
              ) : null}

              {data.data_day?.time?.length ? (
                <>
                  <SectionHeading
                    title="Daily forecast"
                    subtitle="Plan ahead with the latest forecast"
                  />
                  <TenDayForecastCard data_day={data.data_day} />
                </>
              ) : null}

              {metrics.length ? (
                <>
                  <SectionHeading
                    title="Weather details"
                    subtitle="Live conditions from the forecast provider"
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      rowGap: 12,
                    }}
                  >
                    {metrics.map((metric) => (
                      <MetricTile
                        key={`${metric.label}-${metric.value}`}
                        metric={metric}
                      />
                    ))}
                  </View>
                </>
              ) : null}
            </>
          ) : null}
        </View>
      </ScreenContent>
    </ScreenLayout>
  );
}
