import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { MapPin } from "lucide-react-native";
import { Image, Text, View } from "react-native";
import {
  getWeatherPresentation,
  type WeatherCodeSet,
} from "../utils/weatherPictogram";
import type { WeatherState } from "../utils/weatherUtils";
import AnimatedWeatherBackground from "./AnimatedWeatherBackground";

type WeatherCardProps = {
  current: WeatherState | null;
  city?: string | null;
};

export default function WeatherCard({ current, city }: WeatherCardProps) {
  const conditionCode = current?.condition ?? 0;
  const conditionSet: WeatherCodeSet = current?.conditionSet ?? "daily";
  const isDaylight = current?.isDaylight !== 0;
  const weather = getWeatherPresentation(
    conditionCode,
    conditionSet,
    isDaylight,
  );
  const WeatherIcon = weather.icon;

  return (
    <View
      style={{
        borderRadius: 24,
        overflow: "hidden",
        shadowColor: "#17350A",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
        shadowRadius: 12,
        elevation: 5,
      }}
    >
      <AnimatedWeatherBackground
        effect={weather.effect}
        isDaylight={isDaylight}
      >
        <View
          style={{
            minHeight: 180,
            paddingHorizontal: 20,
            paddingVertical: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View className="min-w-0 flex-1 pr-4">
            <View className="flex-row items-center">
              <MapPin size={14} color="rgba(255,255,255,0.78)" />
              <Text
                numberOfLines={1}
                style={[
                  typography.Poppins_s_medium,
                  {
                    color: "rgba(255,255,255,0.82)",
                    marginLeft: 5,
                  },
                ]}
              >
                {city || current?.locationName || "Srinagar"}
              </Text>
            </View>

            <View className="mt-1 flex-row items-end">
              <Text
                style={[
                  typography.Poppins_xxl_semibold,
                  { color: colors.light, fontSize: 42, lineHeight: 52 },
                ]}
              >
                {typeof current?.tempC === "number" ? current.tempC : "--"}°
              </Text>
            </View>

            <Text
              numberOfLines={1}
              style={[
                typography.Poppins_s_medium,
                {
                  color: "rgba(255,255,255,0.9)",
                  marginTop: 1,
                  textShadowColor: "rgba(0,0,0,0.28)",
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 3,
                },
              ]}
            >
              {weather.label}
              {current
                ? `  •  H ${current.highTemp}°  L ${current.lowTemp}°`
                : ""}
            </Text>
          </View>

          <View
            className="h-20 w-20 items-center justify-center rounded-full"
            style={{
              backgroundColor: "rgba(255,255,255,0.16)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            {current?.iconUrl ? (
              <Image
                source={{ uri: current.iconUrl }}
                resizeMode="contain"
                style={{ width: 62, height: 62 }}
              />
            ) : (
              <WeatherIcon
                size={48}
                strokeWidth={1.65}
                color={isDaylight ? "#FFE082" : "#E8F1FF"}
              />
            )}
          </View>
        </View>
      </AnimatedWeatherBackground>
    </View>
  );
}
