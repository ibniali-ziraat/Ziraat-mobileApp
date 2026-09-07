import { Dimensions, FlatList, View } from "react-native";
import { LAYOUT } from "../constants/constants";
import {
  NormalizedProduct,
  ProductsListProps,
  WishlistItem,
} from "../types/productlist.types";
import { normalizeProducts } from "../utils/utils";
import ListHeader from "./ListHeader";
import ProductCard from "./ProductCard";

export default function ProductsList({
  items,
  wishlistItems = [],
  onToggleWishlist,
  isWishlistBusy,
  onSeeMore,
  variant = "grid",
  title,
}: ProductsListProps) {
  const screenWidth = Dimensions.get("window").width;
  const isCarousel = variant === "carousel";

  const cardWidth = isCarousel
    ? (screenWidth - LAYOUT.PADDING * 2 - LAYOUT.GAP * 2) / (2 + LAYOUT.PEEK)
    : screenWidth * 0.42;

  const normalizedItems: NormalizedProduct[] = normalizeProducts(items);

  return (
    <View>
      {isCarousel && <ListHeader title={title} onSeeMore={onSeeMore} />}

      <FlatList<NormalizedProduct>
        data={normalizedItems}
        horizontal={isCarousel}
        numColumns={isCarousel ? 1 : 2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={!isCarousel}
        contentContainerStyle={{
          paddingHorizontal: LAYOUT.PADDING,
          paddingBottom: isCarousel ? 0 : 30,
        }}
        columnWrapperStyle={
          !isCarousel ? { justifyContent: "space-between" } : undefined
        }
        keyExtractor={(item, index) =>
          item?.vendorProductId
            ? String(item.vendorProductId)
            : item?.id
              ? String(item.id)
              : `fallback-${index}`
        }
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            cardWidth={cardWidth}
            isCarousel={isCarousel}
            wishlistItems={wishlistItems as WishlistItem[]}
            isWishlistBusy={isWishlistBusy}
            onToggleWishlist={onToggleWishlist}
          />
        )}
      />
    </View>
  );
}
