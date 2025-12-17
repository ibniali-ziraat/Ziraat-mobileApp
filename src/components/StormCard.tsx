import { View, Text } from "react-native";
import { Wind } from "lucide-react-native";
import ZiraatCard from "./shared/ZiraatProfileCard";
import WeatherCarousel, { SLIDE_WIDTH } from "./WeatherCarousel";

const STORM_ALERTS = [
    {
        title: "Storms possible Thursday morning",
        chance: "41%",
    },
    {
        title: "Heavy rain & lightning expected",
        chance: "56%",
    },
];

export default function StormCard() {
    return (
        <ZiraatCard
            width="100%"
            marginVertical={0.6}
            paddingHorizontal={1}
            paddingVertical={1.5}
        >
            <WeatherCarousel
                data={STORM_ALERTS}
                renderItem={({ item }) => (
                    <View
                        style={{
                            width: SLIDE_WIDTH,
                            paddingHorizontal: 8,
                        }}
                    >

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 10,
                            }}
                        >
                            <Wind size={18} color="#c7611f" />
                            <Text
                                style={{
                                    marginLeft: 8,
                                    fontSize: 14,
                                    color: "#333333",
                                    fontWeight: "500",
                                    justifyContent: "center"
                                }}
                            >
                                Storms Coming
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: "#333333",
                                    fontSize: 16,
                                    fontWeight: "600",
                                    width: "75%",


                                }}
                            >
                                {item.title}
                            </Text>

                            <Text
                                style={{
                                    color: "#333333",
                                    fontSize: 26,
                                    fontWeight: "600",
                                    justifyContent: "center"
                                }}
                            >
                                {item.chance}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </ZiraatCard>
    );
}
