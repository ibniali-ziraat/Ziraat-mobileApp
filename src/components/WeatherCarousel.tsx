import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";

const { width } = Dimensions.get("window");
export const SLIDE_WIDTH = width - 48;

type Props<T> = {
    data: T[];
    renderItem: ({ item }: { item: T }) => JSX.Element;
    interval?: number;
};

export default function WeatherCarousel<T>({
    data,
    renderItem,
    interval = 3000,
}: Props<T>) {
    const [activeIndex, setActiveIndex] = useState(0);
    const listRef = useRef<FlatList>(null);

    const onViewRef = useRef(({ viewableItems }: any) => {
        if (viewableItems?.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    });

    const viewConfigRef = useRef({
        viewAreaCoveragePercentThreshold: 50,
    });

    // 🔁 AUTO SCROLL
    useEffect(() => {
        if (!data?.length) return;

        const timer = setInterval(() => {
            const nextIndex = (activeIndex + 1) % data.length;

            listRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });

            setActiveIndex(nextIndex);
        }, interval);

        return () => clearInterval(timer);
    }, [activeIndex, data, interval]);

    return (
        <View>
            <FlatList
                ref={listRef}
                data={data}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, i) => i.toString()}
                renderItem={renderItem}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                getItemLayout={(_, i) => ({
                    length: SLIDE_WIDTH,
                    offset: SLIDE_WIDTH * i,
                    index: i,
                })}
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
                                activeIndex === i ? "#c7611f" : "rgba(0,0,0,0.3)",
                            marginHorizontal: 3,
                        }}
                    />
                ))}
            </View>
        </View>
    );
}
