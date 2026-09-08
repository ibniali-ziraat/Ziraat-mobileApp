import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useHomeScrollY } from "@/src/contexts/HomeScrollContext";
import { useProfileQuery } from "@/src/hooks/userQueryHooks";
import { useHomeWeather } from "@/src/modules/home/hooks/useHomeWeather";
import {
  greetingForNow,
  todayLabel,
} from "@/src/modules/home/utils/dashboardFormat";
import { useNotifications } from "@/src/modules/notifications/hooks/useNotifications";
import { router } from "expo-router";
import { Bell, MapPin } from "lucide-react-native";
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

const HomeContent = () => {
  const { userId } = useAuth();
  const { data } = useProfileQuery(userId);
  const { count } = useNotifications();
  // Same React Query cache the scrollable weather card reads from — this
  // doesn't cost a second network call, just the compact bar's "location •
  // temp" text once collapsed.
  const { currentWeather } = useHomeWeather();

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

  const compactInfoStyle = useAnimatedStyle(() => ({
    height: interpolate(
      progress.value,
      [0, 1],
      [0, GREETING_HEIGHT],
      Extrapolation.CLAMP,
    ),
    opacity: interpolate(progress.value, [0.5, 1], [0, 1], Extrapolation.CLAMP),
  }));

  const nameStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(progress.value, [0, 1], [20, 16]),
  }));

  const bellStyle = useAnimatedStyle(() => {
    const size = interpolate(progress.value, [0, 1], [40, 34]);
    return { width: size, height: size, borderRadius: size / 2 };
  });

  const name = data?.fullName ?? "Ziraat";

  const temp =
    typeof currentWeather?.tempC === "number"
      ? `${Math.round(currentWeather.tempC)}°`
      : "--°";
  const location = currentWeather?.locationName || "Srinagar";

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
              {greetingForNow()} · {todayLabel()}
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

          <Animated.View
            style={[
              {
                overflow: "hidden",
                flexDirection: "row",
                alignItems: "center",
              },
              compactInfoStyle,
            ]}
          >
            <MapPin size={10} color={cardTokens.inkMuted} />
            <Text
              numberOfLines={1}
              style={[
                typography.Poppins_xs_regular,
                { color: cardTokens.inkMuted, fontSize: 11, marginLeft: 3 },
              ]}
            >
              {location} • {temp} • {todayLabel()}
            </Text>
          </Animated.View>
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
    </Animated.View>
  );
};

export default HomeContent;
