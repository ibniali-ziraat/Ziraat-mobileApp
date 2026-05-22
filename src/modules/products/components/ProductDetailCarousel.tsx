import { typography } from "@/src/constants/fonts/typography";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 1;
const SIDE_SPACING = (width - ITEM_WIDTH) / 2;

export default function ProductDetailCarousel({
  photos = [],
  label,
}: {
  photos: string[];
  label?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: { item: string }) => {
    // ✅ support both local mapped images and remote URLs

    const source = { uri: item }

    return (
      <View style={{ width: ITEM_WIDTH }}>
        <View className="w-[95%] aspect-[4/5] rounded-xl overflow-hidden relative">
          <Image source={source} resizeMode="cover" className="w-full h-full" />

          {label && (
            <View className="absolute top-3 left-2 bg-primary px-2 py-1 rounded-full">
              <Text
                style={typography.Poppins_xs_regular}
                className="text-light"
              >
                {label}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={photos}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: SIDE_SPACING }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={renderItem}
        keyExtractor={(_, index) => String(index)}
      />

      {/* DOT INDICATOR */}
      <View className="absolute bottom-2 w-full flex-row justify-center">
        {photos.map((_, i) => (
          <View
            key={i}
            className={`w-2 h-2 rounded-full mx-1 ${currentIndex === i ? "bg-secondary" : "bg-light"
              }`}
          />
        ))}
      </View>
    </View>
  );
}
