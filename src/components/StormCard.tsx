import {
    View,
    Text,
    ScrollView,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent
} from "react-native";
import { useState } from "react";
// Assuming ZiraatProfileCard is a valid component
import ZiraatProfileCard from "./shared/ZiraatProfileCard";
import ZiraatCard from "./shared/ZiraatProfileCard";
import { colors } from "../constants/colors";

const { width } = Dimensions.get("window");
// ✅ The visible width of a single slide on the screen
const SLIDE_WIDTH = width - 25;

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

    const handleScrollEnd = (
        e: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        const offsetX = e.nativeEvent.contentOffset.x;

        // 💡 Correction: We need to divide the scrolled offset 
        // by the exact width of ONE slide (SLIDE_WIDTH) to get the index.
        // Math.round is used because snapToInterval ensures the scroll 
        // lands close to a multiple of SLIDE_WIDTH.
        const rawIndex = Math.round(offsetX / SLIDE_WIDTH);

        // clamp index (VERY IMPORTANT)
        const index = Math.min(
            Math.max(rawIndex, 0),
            slides.length - 1
        );

        setActiveIndex(index);
    };

    return (
        // Note: I've added a container style for demonstration 
        // to show the alignment is correct if needed.
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bgColor }}>
            <ZiraatCard
                width={SLIDE_WIDTH}    // ✅ MUST match slide width
                height={120}
                marginVertical={1}
                paddingBottom={1}        // ✅ numeric height only
            >
                <ScrollView
                    horizontal
                    snapToInterval={SLIDE_WIDTH}
                    snapToAlignment="start"
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScrollEnd}
                    // It's often better to align the items in the View component 
                    // within the map, and remove contentContainerStyle here, 
                    // but keeping it for consistency.
                    contentContainerStyle={{ alignItems: "center" }}
                >
                    {slides.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                width: SLIDE_WIDTH, // 👈 Must be SLIDE_WIDTH
                                alignItems: "center",
                                justifyContent: "center",
                                paddingHorizontal: 16,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "700",
                                    color: "#111827",
                                    textAlign: "center",
                                }}
                            >
                                {item.title}
                            </Text>

                            <Text
                                style={{
                                    fontSize: 13,
                                    color: "#4B5563",
                                    marginTop: 6,
                                    textAlign: "center",
                                }}
                            >
                                {item.text}
                            </Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Pagination dots */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: 10,
                    }}
                >
                    {slides.map((_, i) => (
                        <View
                            key={i}
                            style={{
                                width: i === activeIndex ? 14 : 8,
                                height: 8,
                                borderRadius: 4,
                                marginHorizontal: 4,
                                // Color changes based on the activeIndex state
                                backgroundColor:
                                    i === activeIndex ? "#111827" : "#D1D5DB",
                            }}
                        />
                    ))}
                </View>
            </ZiraatCard>
        </View>
    );
}