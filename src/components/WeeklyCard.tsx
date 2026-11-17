import { CalendarDays } from "lucide-react-native";
import { Dimensions, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { weatherIcons } from "@/src/constants/iconArt";
import { colors } from "../constants/colors";
import { cardShadow, cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "../constants/fonts/typography";

const { width } = Dimensions.get("window");
const BAR_WIDTH = width * 0.35;

type WeatherIcon =
  | "sun"
  | "cloudSun"
  | "cloud"
  | "rain"
  | "snow"
  | "storm"
  | "fog";

type DayForecast = {
  day: string;
  min: number;
  max: number;
  icon: WeatherIcon;
};

const renderIcon = (type: WeatherIcon) => (
  <SvgXml xml={weatherIcons[type] ?? weatherIcons.cloud} width={26} height={26} />
);

const mapPictocodeToIcon = (code: number): WeatherIcon => {
  if (code === 1) return "sun";
  if (code === 2 || code === 3) return "cloudSun";
  if (code >= 4 && code <= 7) return "cloud";
  if (code >= 8 && code <= 12) return "rain";
  if (code >= 13 && code <= 15) return "storm";
  if (code >= 16 && code <= 18) return "snow";
  if (code >= 19 && code <= 21) return "fog";
  return "cloud";
};

export default function TenDayForecastCard({ data_day }) {
  const forecast: DayForecast[] = data_day.time.map((date, index) => ({
    day:
      index === 0
        ? "Today"
        : new Date(date).toLocaleDateString("en-IN", {
            weekday: "short",
          }),
    min: Math.round(data_day.temperature_min[index]),
    max: Math.round(data_day.temperature_max[index]),
    icon: mapPictocodeToIcon(data_day.pictocode[index]),
  }));

  const globalMin = Math.min(...forecast.map((d) => d.min));
  const globalMax = Math.max(...forecast.map((d) => d.max));

  return (
    <View
      style={[
        {
          width: "100%",
          marginVertical: 8,
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: cardTokens.surface,
          borderRadius: cardTokens.radius,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: cardTokens.border,
        },
        cardShadow,
      ]}
    >
      {/* Header */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <CalendarDays size={20} color={colors.secondary} />
        <Text
          style={[
            typography.Poppins_m_medium,
            { marginLeft: 8, color: cardTokens.inkPrimary },
          ]}
        >
          {forecast.length}-DAY FORECAST
        </Text>
      </View>

      {/* Forecast List */}
      {forecast.map((item, index) => {
        const start =
          ((item.min - globalMin) / (globalMax - globalMin)) * BAR_WIDTH;

        const range =
          ((item.max - item.min) / (globalMax - globalMin)) * BAR_WIDTH;

        return (
          <View key={index}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              {/* Day */}
              <Text
                style={[typography.Poppins_m_medium, { width: 60 }]}
              >
                {item.day}
              </Text>

              {/* Icon */}
              <View style={{ width: 30, alignItems: "center" }}>
                {renderIcon(item.icon)}
              </View>

              {/* Min Temp */}
              <Text style={{ width: 40, textAlign: "right" }}>
                {item.min}°
              </Text>

              {/* Bar */}
              <View
                style={{
                  width: BAR_WIDTH,
                  height: 4,
                  backgroundColor: colors.light,
                  borderRadius: 2,
                  marginHorizontal: 8,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    left: start,
                    width: range,
                    height: 4,
                    backgroundColor: colors.secondary,
                    borderRadius: 2,
                  }}
                />
              </View>

              {/* Max Temp */}
              <Text
                style={[
                  typography.Poppins_m_medium,
                  { width: 40, textAlign: "right" },
                ]}
              >
                {item.max}°
              </Text>
            </View>

            {/* Divider */}
            {index !== forecast.length - 1 && (
              <View
                style={{
                  height: 1,
                  backgroundColor: colors.light,
                  opacity: 0.6,
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}