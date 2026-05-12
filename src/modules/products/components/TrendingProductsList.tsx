import Loader from "@/src/components/shared/Loader";
import { colors } from "@/src/constants/colors";
import { ChevronRight } from "lucide-react-native";
import { useRef, useState } from "react";
import { Dimensions, FlatList, Pressable, View } from "react-native";
import { LAYOUT } from "../constants/constants";
import TrendingProductCard from "./TrendingProductsCard";

type Props = {
  items: any;
  wishlistItems?: any[];
  onToggleWishlist?: (id: string | number) => void;
  isWishlistBusy?: boolean;
  variant?: "grid" | "carousel";
  title?: string;
  onSeeMore?: any;
  refreshing?: boolean;
  onRefresh?: () => void;
};

export default function TrendingProductsList({
  items,
  wishlistItems = [],
  onToggleWishlist,
  isWishlistBusy,
  variant = "grid",
  refreshing = false,
  onRefresh,
}: Props) {
  const screenWidth = Dimensions.get("window").width;

  const flatListRef = useRef<FlatList>(null);

  const [currentOffset, setCurrentOffset] = useState(0);

  const isCarousel = variant === "carousel";

  const cardWidth = isCarousel
    ? (screenWidth - LAYOUT.PADDING * 2 - LAYOUT.GAP * 2) / (2 + LAYOUT.PEEK)
    : screenWidth * 0.42;

  const products = Array.isArray(items?.products)
    ? items.products
    : Array.isArray(items)
      ? items
      : [];

  const scrollRight = () => {
    const newOffset = currentOffset + 250;

    flatListRef.current?.scrollToOffset({
      offset: newOffset,
      animated: true,
    });

    setCurrentOffset(newOffset);
  };

  if (!products.length) {
    return (
      <View
        style={{
          paddingVertical: 20,
          alignItems: "center",
        }}
      >
        <Loader />
      </View>
    );
  }

  return (
    <View>
      <Pressable
        onPress={scrollRight}
        style={{
          position: "absolute",
          right: 10,
          top: -42,
          zIndex: 10,
          padding: 6,
        }}
      >
        <ChevronRight size={20} color={colors.dark} />
      </Pressable>

      <FlatList
        ref={flatListRef}
        data={products}
        horizontal={isCarousel}
        {...(!isCarousel ? { numColumns: 2 } : {})}
        keyExtractor={(item) => String(item.productId)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={!isCarousel}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onScroll={(event) => {
          setCurrentOffset(event.nativeEvent.contentOffset.x);
        }}
        snapToAlignment={isCarousel ? "start" : undefined}
        decelerationRate={isCarousel ? "fast" : "normal"}
        contentContainerStyle={{
          paddingHorizontal: LAYOUT.PADDING,
          paddingBottom: isCarousel ? 0 : 30,
          gap: isCarousel ? LAYOUT.GAP : 0,
        }}
        columnWrapperStyle={
          !isCarousel
            ? {
                justifyContent: "space-between",
              }
            : undefined
        }
        renderItem={({ item }) => (
          <TrendingProductCard
            item={item}
            cardWidth={cardWidth}
            isCarousel={isCarousel}
            wishlistItems={wishlistItems}
            isWishlistBusy={isWishlistBusy}
            onToggleWishlist={onToggleWishlist}
          />
        )}
      />
    </View>
  );
}
