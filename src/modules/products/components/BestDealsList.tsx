import Loader from "@/src/components/shared/Loader";
import { Dimensions, FlatList, View } from "react-native";
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
  const isCarousel = variant === "carousel";

  const cardWidth = isCarousel
    ? (screenWidth - LAYOUT.PADDING * 2 - LAYOUT.GAP * 2) / (2 + LAYOUT.PEEK)
    : screenWidth * 0.42;

  const deals = Array.isArray(data?.deals) ? data.deals : [];

  if (!deals.length) {
    return (
      <View style={{ paddingVertical: 20, alignItems: "center" }}>
        <Loader />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={deals}
        horizontal={isCarousel}
        numColumns={isCarousel ? 1 : 2}
        keyExtractor={(item) => String(item.vendorProductId)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={!isCarousel}
        contentContainerStyle={{
          paddingHorizontal: LAYOUT.PADDING,
          paddingBottom: isCarousel ? 0 : 30,
        }}
        columnWrapperStyle={
          !isCarousel ? { justifyContent: "space-between" } : undefined
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
