import {
  CalendarDays,
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
} from "lucide-react-native";
import { Dimensions, View } from "react-native";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

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

/* ---------------- ICON RENDER ---------------- */
const renderIcon = (type: WeatherIcon) => {
  const props = { size: 18, color: "#c7611f" };

  switch (type) {
    case "sun":
      return <Sun {...props} />;
    case "cloudSun":
      return <CloudSun {...props} />;
    case "rain":
      return <CloudRain {...props} />;
    case "snow":
      return <CloudSnow {...props} />;
    case "storm":
      return <CloudLightning {...props} />;
    case "fog":
      return <CloudFog {...props} />;
    default:
      return <Cloud {...props} />;
  }
};

/* ---------------- API CODE → ICON ---------------- */
const mapPictocodeToIcon = (code: number): WeatherIcon => {
  if (code === 1) return "sun"; // clear
  if (code === 2 || code === 3) return "cloudSun"; // partly cloudy
  if (code >= 4 && code <= 7) return "cloud"; // cloudy
  if (code >= 8 && code <= 12) return "rain"; // rain
  if (code >= 13 && code <= 15) return "storm"; // thunder
  if (code >= 16 && code <= 18) return "snow"; // snow
  if (code >= 19 && code <= 21) return "fog"; // fog
  return "cloud";
};

export default function TenDayForecastCard({ data_day }) {
  //   console.log(data_day, "data from the weeklycard");

  /* ---------------- DYNAMIC DATA ---------------- */
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
    <ZiraatCard width="100%" paddingHorizontal={1.5} paddingVertical={1.5}>
      {/* Header */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <CalendarDays size={20} color="#c7611f" />
        <CsText style={{ fontSize: 15, fontWeight: "600", marginLeft: 8 }}>
          7-DAY FORECAST
        </CsText>
      </View>

      {/* Rows */}
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
                paddingVertical: 12,
              }}
            >
              <CsText style={{ width: "18%", fontSize: 16 }}>{item.day}</CsText>

              <View style={{ width: "10%", alignItems: "center" }}>
                {renderIcon(item.icon)}
              </View>

              <CsText style={{ width: "10%", textAlign: "right" }}>
                {item.min}°
              </CsText>

              <View
                style={{
                  width: BAR_WIDTH,
                  height: 4,
                  backgroundColor: "#ffffff",
                  borderRadius: 2,
                  marginHorizontal: 10,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    left: start,
                    width: range,
                    height: 4,
                    backgroundColor: "#c7611f",
                    borderRadius: 2,
                  }}
                />
              </View>

              <CsText
                style={{ width: "12%", textAlign: "right", fontWeight: "500" }}
              >
                {item.max}°
              </CsText>
            </View>

            {index !== forecast.length - 1 && (
              <View style={{ height: 1, backgroundColor: "#222222" }} />
            )}
          </View>
        );
      })}
    </ZiraatCard>
  );
}
