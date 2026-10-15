import IllustrationBackground from "@/src/components/shared/IllustrationBackground";
import { typography } from "@/src/constants/fonts/typography";
import { weatherIconFor } from "@/src/constants/iconArt";
import { ROUTES } from "@/src/constants/routes";
import { getWeatherScene } from "@/src/constants/weatherScenes";
import { useHomeWeather } from "@/src/modules/home/hooks/useHomeWeather";
import { getWeatherPresentation } from "@/src/modules/home/utils/weatherPictogram";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ChevronRight, MapPin } from "lucide-react-native";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { Pressable } from "@/src/components/shared/Pressable";

const WEATHER_CARD_HEIGHT = 108;

/**
 * Plain scrollable card — deliberately NOT part of the collapsing sticky
 * header. It used to live there, animated in and out with scroll position,
 * but that made it feel pinned/static rather than part of the page: it
 * never actually moved with the rest of the dashboard content.
 */
export default function HomeWeatherCard() {
  const { currentWeather } = useHomeWeather();

  const isDaylight = currentWeather?.isDaylight !== 0;
  const weather = getWeatherPresentation(
    currentWeather?.condition ?? 0,
    currentWeather?.conditionSet ?? "daily",
    isDaylight,
  );

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
      ? `${Math.round(currentWeather.windKph)} km/h wind`
      : null;
  const highLow =
    currentWeather?.highTemp != null && currentWeather?.lowTemp != null
      ? `H ${currentWeather.highTemp}°  L ${currentWeather.lowTemp}°`
      : null;
  const subtitle = [highLow, humidity ? `${humidity} humidity` : null, wind]
    .filter(Boolean)
    .join("  •  ");

  return (
    <View style={{ overflow: "hidden", borderRadius: 24, marginTop: 12 }}>
      <Pressable
        onPress={() => router.push(ROUTES.WEATHER.DETAILS)}
        accessibilityRole="button"
        accessibilityLabel="Open weather forecast"
        style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
      >
        <IllustrationBackground
          xml={getWeatherScene(weather.effect, isDaylight)}
          style={{ height: WEATHER_CARD_HEIGHT, justifyContent: "center" }}
        >
          <LinearGradient
            colors={["rgba(6,16,8,0.66)", "rgba(6,16,8,0.18)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.4 }}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
            }}
          >
            <View style={{ flex: 1, marginRight: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MapPin size={11} color="rgba(255,255,255,0.8)" />
                <Text
                  numberOfLines={1}
                  style={[
                    typography.Poppins_xs_medium,
                    {
                      color: "rgba(255,255,255,0.85)",
                      fontSize: 13.5,
                      marginLeft: 4,
                    },
                  ]}
                >
                  {location}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  marginTop: 4,
                }}
              >
                <Text
                  style={[
                    typography.Poppins_l_semibold,
                    { color: "#FFFFFF", fontSize: 34, lineHeight: 38 },
                  ]}
                >
                  {temp}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[
                    typography.Poppins_xs_medium,
                    {
                      color: "rgba(255,255,255,0.88)",
                      fontSize: 14.5,
                      marginLeft: 8,
                      marginBottom: 6,
                    },
                  ]}
                >
                  {weather.label}
                </Text>
              </View>

              {subtitle ? (
                <Text
                  numberOfLines={1}
                  style={[
                    typography.Poppins_xs_regular,
                    {
                      color: "rgba(255,255,255,0.78)",
                      fontSize: 13,
                      marginTop: 3,
                    },
                  ]}
                >
                  {subtitle}
                </Text>
              ) : null}
            </View>

            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 23,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.18)",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.24)",
                }}
              >
                <SvgXml
                  xml={weatherIconFor(weather.effect, isDaylight)}
                  width={32}
                  height={32}
                />
              </View>
              <ChevronRight
                size={14}
                color="rgba(255,255,255,0.75)"
                style={{ marginTop: 6 }}
              />
            </View>
          </LinearGradient>
        </IllustrationBackground>
      </Pressable>
    </View>
  );
}
