import Loader from "@/src/components/shared/Loader";
import { Dimensions, FlatList, View } from "react-native";
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
};

export default function TrendingProductsList({
  items,
  wishlistItems = [],
  onToggleWishlist,
  isWishlistBusy,
  variant = "grid",
}: Props) {
  const screenWidth = Dimensions.get("window").width;
  const isCarousel = variant === "carousel";

  const cardWidth = isCarousel
    ? (screenWidth - LAYOUT.PADDING * 2 - LAYOUT.GAP * 2) / (2 + LAYOUT.PEEK)
    : screenWidth * 0.42;

  const products = Array.isArray(items?.products)
    ? items.products
    : Array.isArray(items)
      ? items
      : [];

  if (!products.length) {
    return (
      <View style={{ paddingVertical: 20, alignItems: "center" }}>
        <Loader />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={products}
        horizontal={isCarousel}
        numColumns={isCarousel ? 1 : 2}
        keyExtractor={(item) => String(item.productId)}
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
