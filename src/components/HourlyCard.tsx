import { View, Text, ScrollView } from "react-native";
import { Cloud, CloudRain, CloudLightning } from "lucide-react-native";
import TempLineChart from "./charts/TempLineChart";
import ZiraatCard from "./shared/ZiraatProfileCard";

// helper to choose icon
const getWeatherIcon = (icon: string) => {
    switch (icon) {
        case "thunderstorm-outline":
            return <CloudLightning size={18} color="#c7611f" />;
        case "rain-outline":
            return <CloudRain size={18} color="#2222222" />;
        default:
            return <Cloud size={18} color="#c7611f" />;
    }
};

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
        <ZiraatCard
            width="100%"
            height="7%"
            paddingHorizontal={1}
            paddingVertical={1}
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


                                <View style={{ marginVertical: 4 }}>
                                    {getWeatherIcon(item.icon)}
                                </View>


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
        </ZiraatCard>
    );
}
