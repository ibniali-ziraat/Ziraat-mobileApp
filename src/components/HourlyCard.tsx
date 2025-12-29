import {
  CloudRain,
  CloudSun,
  Droplet,
  Moon,
  Sun,
  Wind,
} from "lucide-react-native";
import { useEffect, useMemo, useRef } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 70;
const CHART_HEIGHT = 40;

/* ---------------- WEATHER TYPE LOGIC ---------------- */
const getWeatherTypeFromPictocode = (
  pictocode?: number,
  isNight?: boolean,
  rainChance?: number
) => {
  if (rainChance && rainChance >= 40) return "rain";

  switch (pictocode) {
    case 1:
      return isNight ? "moon" : "sun";
    case 2:
    case 3:
      return isNight ? "moon" : "cloudSun";
    case 4:
    case 5:
      return "cloudSun";
    case 6:
    case 7:
      return "rain";
    default:
      return isNight ? "moon" : "sun";
  }
};

/* ---------------- ICON MAP ---------------- */
const renderIcon = (type: string) => {
  switch (type) {
    case "rain":
      return <CloudRain size={20} color="#c7611f" />;
    case "moon":
      return <Moon size={20} color="#c7611f" />;
    case "cloudSun":
      return <CloudSun size={20} color="#c7611f" />;
    default:
      return <Sun size={20} color="#c7611f" />;
  }
};

/* ---------------- COMPONENT ---------------- */
export default function HourlyCard({ data_1h }) {
  const scrollRef = useRef<ScrollView>(null);

  /* --------- Current hour (IST) --------- */
  const nowIST = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  const currentHour = new Date(nowIST).getHours();

  /* --------- 24 HOURS DATA (IST) --------- */
  const HOURS = useMemo(() => {
    return data_1h.time.slice(0, 24).map((time, index) => {
      const date = new Date(time);

      const hourIST = Number(
        date.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          hour12: false,
        })
      );

      const rain = data_1h.precipitation_probability[index] ?? 0;
      const isNight = data_1h.isdaylight?.[index] === 0;

      return {
        time: date.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          hour12: true,
        }),
        temp: Math.round(data_1h.temperature[index]),
        feelsLike: Math.round(data_1h.felttemperature[index]),
        rain,
        windDir: data_1h.winddirection[index],
        icon: getWeatherTypeFromPictocode(
          data_1h.pictocode?.[index],
          isNight,
          rain
        ),
        isNow: hourIST === currentHour,
      };
    });
  }, [data_1h]);

  /* --------- Auto-scroll to current hour --------- */
  useEffect(() => {
    const index = HOURS.findIndex((h) => h.isNow);
    if (index !== -1) {
      scrollRef.current?.scrollTo({
        x: index * ITEM_WIDTH - width / 2,
        animated: true,
      });
    }
  }, [HOURS]);

  /* --------- Temperature Graph --------- */
  const { tempPath, feelsPath, points } = useMemo(() => {
    const temps = HOURS.map((h) => h.temp);
    const feels = HOURS.map((h) => h.feelsLike);

    const min = Math.min(...temps, ...feels);
    const max = Math.max(...temps, ...feels);

    const makePoints = (values: number[]) =>
      values.map((val, index) => {
        const x = index * ITEM_WIDTH + ITEM_WIDTH / 2;
        const y =
          CHART_HEIGHT - ((val - min) / (max - min || 1)) * (CHART_HEIGHT - 10);
        return { x, y };
      });

    const tempPts = makePoints(temps);
    const feelsPts = makePoints(feels);

    const toPath = (pts) =>
      pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

    return {
      tempPath: toPath(tempPts),
      feelsPath: toPath(feelsPts),
      points: tempPts,
    };
  }, [HOURS]);

  /* ---------------- UI ---------------- */
  return (
    <ZiraatCard width="100%" paddingHorizontal={1.5} paddingVertical={1.5}>
      <CsText style={{ fontSize: 14, marginBottom: 12 }}>
        24-hour forecast (IST)
      </CsText>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ width: HOURS.length * ITEM_WIDTH }}>
          {/* Hour + Icon + Temp */}
          <View style={{ flexDirection: "row" }}>
            {HOURS.map((item, index) => (
              <View
                key={index}
                style={{
                  width: ITEM_WIDTH,
                  alignItems: "center",
                  backgroundColor: item.isNow
                    ? "rgba(199,97,31,0.15)"
                    : "transparent",
                  borderRadius: 12,
                  paddingVertical: 6,
                }}
              >
                <CsText style={{ fontSize: 11 }}>{item.time}</CsText>

                <View style={{ marginVertical: 4 }}>
                  {renderIcon(item.icon)}
                </View>

                <CsText style={{ fontWeight: "600" }}>{item.temp}°</CsText>

                <Wind
                  size={14}
                  color="#c7611f"
                  style={{
                    transform: [{ rotate: `${item.windDir}deg` }],
                    marginTop: 4,
                  }}
                />
              </View>
            ))}
          </View>

          {/* Temperature Graph */}
          <Svg width={HOURS.length * ITEM_WIDTH} height={CHART_HEIGHT}>
            <Path
              d={feelsPath}
              stroke="#999"
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="none"
            />
            <Path d={tempPath} stroke="#c7611f" strokeWidth={2} fill="none" />

            {points.map((p, i) => (
              <Circle key={i} cx={p.x} cy={p.y} r={4} fill="#c7611f" />
            ))}
          </Svg>

          {/* Rain % */}
          <View style={{ flexDirection: "row", marginTop: 6 }}>
            {HOURS.map((item, index) => (
              <View
                key={index}
                style={{ width: ITEM_WIDTH, alignItems: "center" }}
              >
                <Droplet size={14} color="#c7611f" />
                <CsText style={{ fontSize: 11 }}>{item.rain}%</CsText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ZiraatCard>
  );
}
