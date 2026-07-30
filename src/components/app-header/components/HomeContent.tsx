import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useHomeScrollY } from "@/src/contexts/HomeScrollContext";
import { useProfileQuery } from "@/src/hooks/userQueryHooks";
import WeatherDetailSheet from "@/src/modules/home/components/weather/WeatherDetailSheet";
import { useHomeWeather } from "@/src/modules/home/hooks/useHomeWeather";
import { greetingForNow } from "@/src/modules/home/utils/dashboardFormat";
import { getWeatherPresentation } from "@/src/modules/home/utils/weatherPictogram";
import { useNotifications } from "@/src/modules/notifications/hooks/useNotifications";
import { router } from "expo-router";
import {
  Bell,
  ChevronRight,
  Droplets,
  MapPin,
  Wind,
  type LucideIcon,
} from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";
import { Pressable } from "@/src/components/shared/Pressable";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

/** Scroll distance over which the header folds down to its compact state. */
const COLLAPSE_DISTANCE = 72;

const GREETING_HEIGHT = 16;
const PILL_HEIGHT = 32;

/**
 * One reading in the weather pill. Each carries its own icon, so the cells
 * separate themselves and the row needs no dividers between them.
 */
const Reading = ({
  icon: Icon,
  value,
  accent = false,
  shrink = false,
  iconColor = cardTokens.inkMuted,
}: {
  icon: LucideIcon;
  value: string;
  accent?: boolean;
  shrink?: boolean;
  iconColor?: string;
}) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      flexShrink: shrink ? 1 : 0,
    }}
  >
    <Icon size={accent ? 15 : 13} color={iconColor} />
    <Text
      numberOfLines={1}
      style={[
        accent ? typography.Poppins_xs_semibold : typography.Poppins_xs_regular,
        {
          color: accent ? cardTokens.inkPrimary : cardTokens.inkSecondary,
          fontSize: accent ? 12.5 : 11.5,
          marginLeft: 4,
        },
      ]}
    >
      {value}
    </Text>
  </View>
);

const HomeContent = () => {
  const { userId } = useAuth();
  const { data } = useProfileQuery(userId);
  const { count } = useNotifications();
  const { currentWeather, hourly } = useHomeWeather();
  const [weatherOpen, setWeatherOpen] = useState(false);

  const sharedScrollY = useHomeScrollY();
  const fallbackScrollY = useSharedValue(0);
  const scrollY = sharedScrollY ?? fallbackScrollY;

  const progress = useDerivedValue(() =>
    interpolate(
      scrollY.value,
      [0, COLLAPSE_DISTANCE],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  );

  const shellStyle = useAnimatedStyle(() => ({
    paddingTop: interpolate(progress.value, [0, 1], [10, 6]),
    paddingBottom: interpolate(progress.value, [0, 1], [10, 6]),
  }));

  const greetingStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [0, 1], [GREETING_HEIGHT, 0]),
    opacity: interpolate(progress.value, [0, 0.6], [1, 0], Extrapolation.CLAMP),
  }));

  const nameStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(progress.value, [0, 1], [20, 16]),
  }));

  const bellStyle = useAnimatedStyle(() => {
    const size = interpolate(progress.value, [0, 1], [40, 34]);
    return { width: size, height: size, borderRadius: size / 2 };
  });

  const pillStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [0, 1], [PILL_HEIGHT, 0]),
    marginTop: interpolate(progress.value, [0, 1], [12, 0]),
    opacity: interpolate(progress.value, [0, 0.6], [1, 0], Extrapolation.CLAMP),
  }));

  const name = data?.fullName ?? "Ziraat";

  const weather = getWeatherPresentation(
    currentWeather?.condition ?? 0,
    currentWeather?.conditionSet ?? "daily",
    currentWeather?.isDaylight !== 0,
  );
  const WeatherIcon = weather.icon;

  const temp =
    typeof currentWeather?.tempC === "number"
      ? `${Math.round(currentWeather.tempC)}°`
      : "--°";
  const location = currentWeather?.locationName || "Srinagar";
  const humidity =
    typeof currentWeather?.humidity === "number" && currentWeather.humidity > 0
      ? `${Math.round(currentWeather.humidity)}%`
      : null;
  const wind =
    typeof currentWeather?.windKph === "number" && currentWeather.windKph > 0
      ? `${Math.round(currentWeather.windKph)} km/h`
      : null;

  return (
    <Animated.View
      style={[{ backgroundColor: cardTokens.surface }, shellStyle]}
    >
      <View className="flex-row items-center justify-between">
        <View style={{ flex: 1, marginRight: 12 }}>
          <Animated.View style={[{ overflow: "hidden" }, greetingStyle]}>
            <Text
              numberOfLines={1}
              style={[
                typography.Poppins_xs_regular,
                { color: cardTokens.inkMuted, fontSize: 11 },
              ]}
            >
              {greetingForNow()}
            </Text>
          </Animated.View>

          <Animated.Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              typography.Poppins_l_semibold,
              { color: cardTokens.inkPrimary },
              nameStyle,
            ]}
          >
            {name.toUpperCase()}
          </Animated.Text>
        </View>

        <Animated.View
          style={[
            {
              borderWidth: 1,
              borderColor: cardTokens.border,
              backgroundColor: cardTokens.surface,
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 6,
              elevation: 2,
            },
            bellStyle,
          ]}
        >
          <Pressable
            onPress={() => router.push(ROUTES.NOTIFICATIONS)}
            hitSlop={8}
            style={({ pressed }) => ({
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Bell size={18} color={cardTokens.inkPrimary} />
          </Pressable>

          {count > 0 ? (
            <View
              className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full items-center justify-center"
              style={{
                backgroundColor: chartTokens.accent,
                borderWidth: 1.5,
                borderColor: cardTokens.surface,
              }}
            >
              <Text
                style={[
                  typography.Poppins_xs_semibold,
                  { color: cardTokens.surface, fontSize: 9 },
                ]}
              >
                {count > 99 ? "99+" : count}
              </Text>
            </View>
          ) : null}
        </Animated.View>
      </View>

      <Animated.View style={[{ overflow: "hidden" }, pillStyle]}>
        <Pressable
          onPress={() => setWeatherOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Weather details"
          style={({ pressed }) => ({
            alignSelf: "stretch",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: PILL_HEIGHT,
            paddingHorizontal: 12,
            borderRadius: 999,
            borderCurve: "continuous",
            borderWidth: 1,
            borderColor: cardTokens.hairline,
            backgroundColor: cardTokens.mutedSurface,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Reading
            icon={WeatherIcon}
            value={temp}
            accent
            iconColor={chartTokens.current}
          />
          {humidity ? <Reading icon={Droplets} value={humidity} /> : null}
          {wind ? <Reading icon={Wind} value={wind} /> : null}
          <Reading icon={MapPin} value={location} shrink />

          {/* The pill opens the weather sheet, so it has to read as a button. */}
          <ChevronRight size={14} color={cardTokens.inkSecondary} />
        </Pressable>
      </Animated.View>

      <WeatherDetailSheet
        visible={weatherOpen}
        onClose={() => setWeatherOpen(false)}
        weather={currentWeather}
        hourly={hourly}
      />
    </Animated.View>
  );
};

export default HomeContent;
