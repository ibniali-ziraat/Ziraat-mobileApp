import { View, Text } from "react-native";
import ZiratCard from "./shared/ZiratCard";
import ZiraatCard from "./shared/ZiraatProfileCard";

export default function WeeklyCard() {
    const days = [
        { day: "Today", rain: "78%", icon: "thunderstorm-outline", high: 21, low: 17 },
        { day: "Saturday", rain: "51%", icon: "thunderstorm-outline", high: 23, low: 15 },
        { day: "Sunday", rain: "6%", icon: "sunny-outline", high: 27, low: 17 },
        { day: "Monday", rain: "14%", icon: "partly-sunny-outline", high: 29, low: 18 },
        { day: "Tuesday", rain: "40%", icon: "cloudy-night-outline", high: 27, low: 16 },
        { day: "Wednesday", rain: "3%", icon: "sunny-outline", high: 29, low: 16 },
        { day: "Thursday", rain: "2%", icon: "sunny-outline", high: 30, low: 17 },
    ];
    return (
        <ZiraatCard

        >
            {days.map((item, i) => (
                <View
                    key={i}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingVertical: 10,

                    }}
                >
                    <Text
                        style={{
                            width: 90,
                            fontSize: 14,
                            fontWeight: i === 0 ? "700" : "500",
                            color: "#111827",
                        }}
                    >
                        {item.day}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: "#6B7280",
                            width: 40,
                            textAlign: "center",
                        }}
                    >
                        {item.rain}
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "600",
                            color: "#111827",
                            width: 70,
                            textAlign: "right",
                        }}
                    >
                        {item.high}° {item.low}°
                    </Text>
                </View>
            ))}
        </ZiraatCard>
    );
}
