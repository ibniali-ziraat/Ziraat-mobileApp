import { CalendarDays, Cloud, CloudSun, Sun } from "lucide-react-native";
import { Dimensions, View } from "react-native";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

const { width } = Dimensions.get("window");
const BAR_WIDTH = width * 0.35;

type DayForecast = {
    day: string;
    min: number;
    max: number;
    icon: "sun" | "cloud" | "cloudSun";
};

const DATA: DayForecast[] = [
    { day: "Today", min: 16, max: 35, icon: "cloud" },
    { day: "Wed", min: 22, max: 31, icon: "cloudSun" },
    { day: "Thu", min: 25, max: 35, icon: "cloud" },
    { day: "Sat", min: 30, max: 38, icon: "cloud" },
    { day: "Sun", min: 30, max: 38, icon: "cloud" },
    { day: "Mon", min: 30, max: 38, icon: "cloud" },
    { day: "Tue", min: 30, max: 38, icon: "cloud" },

];

const renderIcon = (type: DayForecast["icon"]) => {
    switch (type) {
        case "sun":
            return <Sun size={18} color="#c7611f" />;
        case "cloudSun":
            return <CloudSun size={18} color="#c7611f" />;
        default:
            return <Cloud size={18} color="#c7611f" />;
    }
};

export default function TenDayForecastCard() {
    const globalMin = Math.min(...DATA.map(d => d.min));
    const globalMax = Math.max(...DATA.map(d => d.max));

    return (
        <ZiraatCard width="100%"
            paddingHorizontal={1.5}
            paddingVertical={1.5}>


            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
                }}
            >
                <CalendarDays size={20} color="#c7611f" />
                <CsText
                    style={{
                        color: "#000000",
                        fontSize: 15,
                        fontWeight: "600",
                        marginLeft: 8,
                    }}
                >
                    10-DAY FORECAST
               </CsText>
            </View>
            {DATA.map((item, index) => {
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
                            <CsText
                                style={{
                                    width: "18%",
                                    color: "#000000",
                                    fontSize: 16,
                                    fontWeight: "500",
                                }}
                            >
                                {item.day}
                           </CsText>


                            <View style={{ width: "10%", alignItems: "center" }}>
                                {renderIcon(item.icon)}
                            </View>

                            <CsText
                                style={{
                                    width: "10%",
                                    color: "#000000",
                                    fontSize: 15,
                                    textAlign: "right",
                                }}
                            >
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
                                style={{
                                    width: "12%",
                                    color: "#00000",
                                    fontSize: 15,
                                    fontWeight: "500",
                                    textAlign: "right",
                                }}
                            >
                                {item.max}°
                           </CsText>
                        </View>
                        {index !== DATA.length - 1 && (
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: "#222222",
                                }}
                            />
                        )}
                    </View>
                );
            })}
        </ZiraatCard>
    );
}
