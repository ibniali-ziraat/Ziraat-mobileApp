import CsText from "@/src/components/shared/CsText";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View
} from "react-native";
import { imageMapper } from "../../../data/imageMapper";

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
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: { item: string }) => {
    const imgSource = imageMapper[item];
    if (!imgSource) return null;

    const source =
      typeof imgSource === "string" ? { uri: imgSource } : imgSource;

    return (
      <View style={{ width: ITEM_WIDTH }}>
        <View className="w-[90%] aspect-[4/5] rounded-xl overflow-hidden relative">
          <Image source={source} resizeMode="cover" className="w-full h-full" />

          {label && (
            <View className="absolute top-3 left-2 bg-primary px-3 py-1 rounded-full">
              <CsText className="text-light font-semibold text-sm">{label}</CsText>
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
      />

      <View className="absolute bottom-4 w-full flex-row justify-center">
        {photos.map((_, i) => {
          const bgColor = currentIndex === i ? "bg-neutral" : "bg-dark"; // fixed colors
          return (
            <View key={i} className={`w-3 h-3 rounded-full mx-1 ${bgColor}`} />
          );
        })}
      </View>
    </View>
  );
}
