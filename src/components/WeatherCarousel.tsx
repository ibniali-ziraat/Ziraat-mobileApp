import { View, FlatList, Dimensions } from "react-native";
import { useRef, useState } from "react";

const { width } = Dimensions.get("window");
export const SLIDE_WIDTH = width - 48;

type Props<T> = {
    data: T[];
    renderItem: ({ item }: { item: T }) => JSX.Element;
};

export default function WeatherCarousel<T>({
    data,
    renderItem,
}: Props<T>) {
    const [activeIndex, setActiveIndex] = useState(0);

    const onViewRef = useRef(({ viewableItems }: any) => {
        if (viewableItems?.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    });

    const viewConfigRef = useRef({
        viewAreaCoveragePercentThreshold: 50,
    });

    return (
        <View>
            <FlatList
                data={data}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, i) => i.toString()}
                renderItem={renderItem}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
            />

            {/* DOTS */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10,
                }}
            >
                {data.map((_, i) => (
                    <View
                        key={i}
                        style={{
                            width: activeIndex === i ? 8 : 6,
                            height: 6,
                            borderRadius: 3,
                            backgroundColor:
                                activeIndex === i
                                    ? "#c7611f"
                                    : "rgba(0,0,0,0.3)",
                            marginHorizontal: 4,
                        }}
                    />
                ))}
            </View>
        </View>
    );
}
