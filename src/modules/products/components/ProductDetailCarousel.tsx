import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { productArt } from "@/src/constants/iconArt";
import { useState } from "react";
import {
  FlatList,
  Image,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Text,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

/**
 * Product photos on a white panel. The width comes from layout, not the
 * window, so the panel lines up with the page's padding on every screen; and
 * images are contained, not cropped — packshots are tall bottles and bags.
 */
export default function ProductDetailCarousel({
  photos = [],
  label,
}: {
  photos: string[];
  label?: string;
}) {
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onLayout = (event: LayoutChangeEvent) =>
    setWidth(event.nativeEvent.layout.width);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!width) return;
    setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  const panel = {
    width,
    aspectRatio: 1,
    borderRadius: 24,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    // White, not grey: packshots carry their own white background.
    backgroundColor: cardTokens.surface,
    borderWidth: 1,
    borderColor: cardTokens.hairline,
    overflow: "hidden" as const,
  };

  return (
    <View onLayout={onLayout}>
      {width === 0 ? null : photos.length === 0 ? (
        <View style={panel}>
          <SvgXml xml={productArt.other} width={120} height={120} />
        </View>
      ) : (
        <FlatList
          data={photos}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => (
            <View style={panel}>
              <Image
                source={{ uri: item }}
                resizeMode="contain"
                style={{ width: "84%", height: "84%" }}
              />
            </View>
          )}
        />
      )}

      {label ? (
        <View
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
            backgroundColor: chartTokens.current,
          }}
        >
          <Text style={[typography.Poppins_xs_semibold, { color: "#FFFFFF" }]}>
            {label}
          </Text>
        </View>
      ) : null}

      {photos.length > 1 ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 6,
            marginTop: 12,
          }}
        >
          {photos.map((_, i) => (
            <View
              key={i}
              style={{
                width: currentIndex === i ? 18 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor:
                  currentIndex === i ? chartTokens.current : chartTokens.grid,
              }}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}
