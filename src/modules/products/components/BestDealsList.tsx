import Loader from "@/src/components/shared/Loader";
import { colors } from "@/src/constants/colors";
import { ChevronRight } from "lucide-react-native";
import { useRef, useState } from "react";
import { Dimensions, FlatList, Pressable, View } from "react-native";
import { LAYOUT } from "../constants/constants";
import DealProductCard from "./DealProductCard";

type Props = {
  data: any;
  wishlistItems?: any[];
  onToggleWishlist?: (id: string | number) => void;
  isWishlistBusy?: boolean;
  variant?: "grid" | "carousel";
  onSeeMore?: any;
};

export default function BestDealsList({
  data,
  wishlistItems = [],
  onToggleWishlist,
  isWishlistBusy,
  variant = "grid",
  onSeeMore,
}: Props) {
  const screenWidth = Dimensions.get("window").width;

  const flatListRef = useRef<FlatList>(null);

  const [currentOffset, setCurrentOffset] = useState(0);

  const isCarousel = variant === "carousel";

  const cardWidth = isCarousel
    ? (screenWidth - LAYOUT.PADDING * 2 - LAYOUT.GAP * 2) / (2 + LAYOUT.PEEK)
    : screenWidth * 0.42;

  const deals = Array.isArray(data?.deals) ? data.deals : [];

  const scrollRight = () => {
    const newOffset = currentOffset + 250;

    flatListRef.current?.scrollToOffset({
      offset: newOffset,
      animated: true,
    });

    setCurrentOffset(newOffset);
  };

  if (!deals.length) {
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
        data={deals}
        horizontal={isCarousel}
        numColumns={isCarousel ? 1 : 2}
        keyExtractor={(item) => String(item.vendorProductId)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={!isCarousel}
        onScroll={(event) => {
          setCurrentOffset(event.nativeEvent.contentOffset.x);
        }}
        contentContainerStyle={{
          paddingHorizontal: LAYOUT.PADDING,
          paddingTop: isCarousel ? 4 : 0,
          paddingBottom: isCarousel ? 12 : 30,
        }}
        columnWrapperStyle={
          !isCarousel
            ? {
                justifyContent: "space-between",
              }
            : undefined
        }
        renderItem={({ item }) => (
          <DealProductCard
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
