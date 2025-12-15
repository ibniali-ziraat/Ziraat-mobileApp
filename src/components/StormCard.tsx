import { View, Text, ScrollView, Dimensions } from "react-native";
import { useState } from "react";
import ZiratCard from "./shared/ZiratCard";
import ZiraatCard from "./shared/ZiraatProfileCard";

const { width } = Dimensions.get("window");

export default function StormCard() {
    const [activeIndex, setActiveIndex] = useState(0);

    const slides = [
        {
            title: "Six Hour Storm Outlook",
            text: "Thunderstorms possible after 12 pm",
        },
        {
            title: "Rain Probability",
            text: "Heavy rainfall expected in afternoon",
        },
        {
            title: "Wind Advisory",
            text: "Strong gusts up to 35 km/h",
        },
    ];

    const handleScroll = (e) => {
        const index = Math.round(
            e.nativeEvent.contentOffset.x / (width - 56)
        );
        setActiveIndex(index);
    };

    return (
        <ZiraatCard>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {slides.map((item, index) => (
                    <View
                        key={index}
                        style={{
                            width: width - 80,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingVertical: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "700",
                                color: "#222222",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {item.title}
                        </Text>

                        <Text
                            style={{
                                fontSize: 14,
                                color: "#222222",
                                marginTop: 8,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {item.text}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 12,
                }}
            >
                {slides.map((_, i) => (
                    <View
                        key={i}
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            marginHorizontal: 4,
                            backgroundColor:
                                i === activeIndex ? "#111827" : "#D1D5DB",
                        }}
                    />
                ))}
            </View>
        </ZiraatCard>
    );
}
