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
import { colors } from "../constants/colors";
import { typography } from "../constants/fonts/typography";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 70;
const CHART_HEIGHT = 40;

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

const renderIcon = (type: string) => {
  switch (type) {
    case "rain":
      return <CloudRain size={20} color={colors.secondary} />;
    case "moon":
      return <Moon size={20} color={colors.secondary} />;
    case "cloudSun":
      return <CloudSun size={20} color={colors.secondary} />;
    default:
      return <Sun size={20} color={colors.secondary} />;
  }
};


export default function HourlyCard({ data_1h }) {
  const scrollRef = useRef<ScrollView>(null);

  const nowIST = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  const currentHour = new Date(nowIST).getHours();

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


  useEffect(() => {
    const index = HOURS.findIndex((h) => h.isNow);
    if (index !== -1) {
      scrollRef.current?.scrollTo({
        x: index * ITEM_WIDTH - width / 2,
        animated: true,
      });
    }
  }, [HOURS]);


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


  return (
    <ZiraatCard width="100%"
      paddingHorizontal={1.3}
      paddingVertical={1.5}>
      <CsText style={typography.Poppins_m_medium} className="mb-3">
        24-hour forecast (IST)
      </CsText>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ width: HOURS.length * ITEM_WIDTH }}>
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
                <CsText style={typography.Poppins_s_regular}>{item.time}</CsText>

                <View style={{ marginVertical: 2 }}>
                  {renderIcon(item.icon)}
                </View>

                <CsText style={typography.Poppins_s_regular} className="text-dark">{item.temp}°</CsText>

                <Wind
                  size={14}
                  color={colors.secondary}
                  style={{
                    transform: [{ rotate: `${item.windDir}deg` }],
                    marginTop: 4,
                  }}
                />
              </View>
            ))}
          </View>

          <Svg width={HOURS.length * ITEM_WIDTH} height={CHART_HEIGHT}>
            <Path
              d={feelsPath}
              stroke={colors.secondary}
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="none"
            />
            <Path d={tempPath} stroke={colors.secondary} strokeWidth={2} fill="none" />

            {points.map((p, i) => (
              <Circle key={i} cx={p.x} cy={p.y} r={4} fill={colors.secondary} />
            ))}
          </Svg>


          <View style={{ flexDirection: "row", marginTop: 6 }}>
            {HOURS.map((item, index) => (
              <View
                key={index}
                style={{ width: ITEM_WIDTH, alignItems: "center" }}
              >
                <Droplet size={14} color={colors.secondary} />
                <CsText style={typography.Poppins_s_regular}>{item.rain}%</CsText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ZiraatCard>
  );
}
