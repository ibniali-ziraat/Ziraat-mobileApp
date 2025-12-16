import { View, Text, ScrollView, Dimensions } from "react-native";
import { Droplet, Sun, Moon, CloudSun } from "lucide-react-native";
import Svg, { Path, Circle } from "react-native-svg";
import ZiraatCard from "./shared/ZiraatProfileCard";

const { width } = Dimensions.get("window");

const HOURS = [
    { time: "6 AM", temp: 66, rain: 3, icon: "moon" },
    { time: "6:57 AM", label: "Sunrise", temp: 66, rain: 3, icon: "sun" },
    { time: "7 AM", temp: 90, rain: 3, icon: "sun" },
    { time: "8 AM", temp: 66, rain: 2, icon: "sun" },
    { time: "9 AM", temp: 68, rain: 4, icon: "sun" },
    { time: "10 AM", temp: 80, rain: 4, icon: "cloudSun" },
    { time: "11 AM", temp: 80, rain: 4, icon: "cloudSun" },
    { time: "12 PM", temp: 97, rain: 4, icon: "cloudSun" },

];

const renderIcon = (type: string) => {
    switch (type) {
        case "moon":
            return <Moon size={20} color="#c7611f" />;
        case "cloudSun":
            return <CloudSun size={20} color="#c7611f" />;
        default:
            return <Sun size={20} color="#c7611f" />;
    }
};

export default function HourlyCard() {
    const chartHeight = 40;
    const itemWidth = 70;
    const chartWidth = HOURS.length * itemWidth;

    const temps = HOURS.map(h => h.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    const points = temps.map((temp, index) => {
        const x = index * itemWidth + itemWidth / 2;
        const y =
            chartHeight -
            ((temp - minTemp) / (maxTemp - minTemp || 1)) *
            (chartHeight - 10) -
            5;
        return { x, y };
    });

    const path = points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" ");

    return (
        <ZiraatCard
            width="100%"
            height="35%"
            paddingHorizontal={1.5}
            paddingVertical={1.5}>
            <Text
                style={{
                    color: "#333333",
                    fontSize: 14,
                    fontWeight: "400",
                    marginBottom: 12,
                }}
            >
                Partly cloudy. Highs in the upper 70s and lows in the low 60s.
            </Text>

            {/* Divider */}
            <View
                style={{
                    height: 1,
                    backgroundColor: "#ffffff",
                    marginBottom: 12,
                }}
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ width: chartWidth }}>

                    {/* ⏰ Hour + Icon + Temp */}
                    <View style={{ flexDirection: "row" }}>
                        {HOURS.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    width: itemWidth,
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 11,
                                        color: "#333333",
                                        marginBottom: 4,
                                    }}
                                >
                                    {item.time}
                                </Text>

                                <View style={{ marginVertical: 4 }}>
                                    {renderIcon(item.icon)}
                                </View>

                                {item.label ? (
                                    <Text
                                        style={{
                                            fontSize: 11,
                                            color: "#333333",
                                            marginTop: 2,
                                        }}
                                    >
                                        {item.label}
                                    </Text>
                                ) : (
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "600",
                                            color: "#333333",
                                            marginTop: 2,
                                        }}
                                    >
                                        {item.temp}°
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>

                    {/* 📈 Temperature Line Graph */}
                    <Svg width={chartWidth} height={chartHeight}>
                        <Path
                            d={path}
                            stroke="#c7611f"
                            strokeWidth={2}
                            fill="none"
                        />
                        {points.map((point, index) => (
                            <Circle
                                key={index}
                                cx={point.x}
                                cy={point.y}
                                r={4}
                                fill="#c7611f"
                            />
                        ))}
                    </Svg>

                    {/* 💧 Rain Percentage */}
                    <View style={{ flexDirection: "row", marginTop: 6 }}>
                        {HOURS.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    width: itemWidth,
                                    alignItems: "center",
                                }}
                            >
                                <Droplet size={14} color="#c7611f" />
                                <Text
                                    style={{
                                        fontSize: 11,
                                        color: "#333333",
                                        marginTop: 2,
                                    }}
                                >
                                    {item.rain}%
                                </Text>
                            </View>
                        ))}
                    </View>

                </View>
            </ScrollView>
        </ZiraatCard>
    );
}
