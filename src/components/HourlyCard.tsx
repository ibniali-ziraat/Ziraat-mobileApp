import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ZiratCard from "./shared/ZiratCard";
import TempLineChart from "./charts/TempLineChart";

export default function HourlyCard() {
    const data = [
        { time: "08:30", temp: 18, icon: "cloud-outline", rain: "20%" },
        { time: "09:30", temp: 18, icon: "cloud-outline", rain: "20%" },
        { time: "10:30", temp: 19, icon: "cloud-outline", rain: "19%" },
        { time: "11:30", temp: 19, icon: "cloud-outline", rain: "19%" },
        { time: "12:30", temp: 20, icon: "thunderstorm-outline", rain: "75%" },
        { time: "13:30", temp: 20, icon: "thunderstorm-outline", rain: "78%" },
        { time: "14:30", temp: 20, icon: "thunderstorm-outline", rain: "59%" },
    ];

    return (
        <ZiratCard
            title="Hourly Forecast"
            subtitle="Thunderstorms. Highs 20–22°C, lows 16–18°C"
            badge="Today"
        >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                    <View style={{ flexDirection: "row" }}>
                        {data.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    alignItems: "center",
                                    marginRight: 20,
                                    width: 80,
                                }}
                            >
                                <Text style={{ fontSize: 12, color: "#6B7280" }}>
                                    {item.time}
                                </Text>

                                <Ionicons
                                    name={item.icon}
                                    size={26}
                                    color="#c7611f"
                                    style={{ marginVertical: 6 }}
                                />

                                <Text style={{ fontSize: 16, fontWeight: "700" }}>
                                    {item.temp}°
                                </Text>

                                <Text style={{ fontSize: 11, color: "#6B7280" }}>
                                    {item.rain}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <TempLineChart data={data} />
                </View>
            </ScrollView>
        </ZiratCard>
    );
}
