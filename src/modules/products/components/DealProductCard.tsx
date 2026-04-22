import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { Heart } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import { WishlistItem } from "../types/productlist.types";

interface DealProductCardProps {
  item: {
    productId: string | number;
    productName: string;
    discountedPrice: number;
    originalPrice: number;
    savingsPercentage: number;
    vendorProductId: string | number;
    thumbnail?: string;
  };
  cardWidth: number;
  isCarousel: boolean;
  wishlistItems: WishlistItem[];
  isWishlistBusy?: boolean;
  onToggleWishlist?: (productId: string | number) => void;
}

export default function DealProductCard({
  item,
  cardWidth,
  isCarousel,
  wishlistItems,
  isWishlistBusy,
  onToggleWishlist,
}: DealProductCardProps) {
  // Safety check
  if (!item) {
    return <View />;
  }

  const isWishlisted = wishlistItems.some(
    (w) => String(w?.productId) === String(item.productId),
  );

  const goToProduct = () =>
    router.push({
      pathname: ROUTES.PRODUCTS.SINGLE_PRODUCT_DETAILS,
      params: { productId: String(item.productId) },
    });

  // Generate placeholder image based on product name
  const placeholderUrl = `https://via.placeholder.com/200?text=${encodeURIComponent(
    item.productName || "Product",
  )}`;

  return (
    <View
      style={{
        width: isCarousel ? cardWidth : "48%",
        marginRight: isCarousel ? 12 : 0,
        marginBottom: isCarousel ? 0 : 16,
      }}
    >
      <View
        style={{
          backgroundColor: colors.light,
          elevation: 2,
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <Pressable onPress={goToProduct}>
          <Image
            source={{ uri: item.thumbnail }}
            style={{ width: "100%", height: isCarousel ? cardWidth : 160 }}
            resizeMode="cover"
          />
        </Pressable>

        {/* Wishlist Button */}
        <Pressable
          hitSlop={10}
          disabled={isWishlistBusy}
          onPress={() => onToggleWishlist?.(item.productId)}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: 8,
            borderRadius: 24,
          }}
        >
          <Heart
            size={18}
            color={isWishlisted ? colors.error : colors.neutral}
            fill={isWishlisted ? colors.error : "none"}
          />
        </Pressable>

        {/* Discount Badge */}
        {item.savingsPercentage ? (
          <View
            style={{
              position: "absolute",
              bottom: 8,
              left: 8,
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 6,
              backgroundColor: colors.secondary,
            }}
          >
            <Text
              style={{ color: colors.light, fontSize: 10, fontWeight: "bold" }}
            >
              {Math.round(item.savingsPercentage)}% OFF
            </Text>
          </View>
        ) : null}
      </View>

      {/* Info */}
      <Pressable style={{ marginTop: 8 }} onPress={goToProduct}>
        <Text style={[typography.Poppins_m_semibold]} numberOfLines={1}>
          {String(item.productName || "Product")}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text style={typography.Poppins_s_medium}>
            ₹{String(Math.round(item.discountedPrice || 0))}
          </Text>
          {item.originalPrice ? (
            <Text
              style={{
                textDecorationLine: "line-through",
                color: colors.neutral,
                fontSize: 12,
              }}
            >
              ₹{String(Math.round(item.originalPrice))}
            </Text>
          ) : null}
        </View>
      </Pressable>
    </View>
  );
}
