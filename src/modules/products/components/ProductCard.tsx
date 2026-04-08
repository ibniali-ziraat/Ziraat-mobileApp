import RatingStars from "@/src/components/shared/RatingStars";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { Heart } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import { NormalizedProduct, WishlistItem } from "../types/productlist.types";
import { calcDiscount } from "../utils/utils";

interface ProductCardProps {
  item: NormalizedProduct;
  cardWidth: number;
  isCarousel: boolean;
  wishlistItems: WishlistItem[];
  isWishlistBusy?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export default function ProductCard({
  item,
  cardWidth,
  isCarousel,
  wishlistItems,
  isWishlistBusy,
  onToggleWishlist,
}: ProductCardProps) {
  const isWishlisted = wishlistItems.some(
    (w) => String(w?.productId) === String(item.id),
  );

  const discount = calcDiscount(item.price, item.oldPrice);

  const goToProduct = () =>
    router.push({
      pathname: ROUTES.PRODUCTS.SINGLE_PRODUCT_DETAILS,
      params: { productId: item.id },
    });

  return (
    <View
      style={{
        width: isCarousel ? cardWidth : "48%",
        marginRight: isCarousel ? 12 : 0,
        marginBottom: isCarousel ? 0 : 16,
      }}
    >
      {/* Card Image */}
      <View
        className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: colors.light, elevation: 2 }}
      >
        <Pressable onPress={goToProduct}>
          <Image
            source={{ uri: item.image }}
            style={{ width: "100%", height: isCarousel ? cardWidth : 160 }}
            resizeMode="cover"
          />
        </Pressable>

        {/* Wishlist Button */}
        <Pressable
          hitSlop={10}
          disabled={isWishlistBusy}
          onPress={() => onToggleWishlist?.(item.id)}
          className="absolute top-2 right-2 bg-white/90 p-2 rounded-full"
        >
          <Heart
            size={18}
            color={isWishlisted ? colors.error : colors.neutral}
            fill={isWishlisted ? colors.error : "none"}
          />
        </Pressable>

        {/* Discount Badge */}
        {discount && (
          <View
            className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md"
            style={{ backgroundColor: colors.secondary }}
          >
            <Text style={{ color: colors.light, fontSize: 10 }}>
              {discount}% OFF
            </Text>
          </View>
        )}
      </View>

      {/* Info */}
      <Pressable className="mt-2" onPress={goToProduct}>
        <Text style={typography.Poppins_m_semibold} numberOfLines={1}>
          {item.title}
        </Text>

        <View className="flex-row items-center gap-2">
          <Text style={typography.Poppins_s_medium}>₹{item.price}</Text>
          {item.oldPrice && (
            <Text
              style={{
                textDecorationLine: "line-through",
                color: colors.neutral,
                fontSize: 12,
              }}
            >
              ₹{item.oldPrice}
            </Text>
          )}
        </View>
      </Pressable>

      <View className="mt-1">
        <RatingStars rating={item.rating ?? 0} />
      </View>
    </View>
  );
}
