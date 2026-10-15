import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { Heart } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import { WishlistItem } from "../types/productlist.types";

interface TrendingProductCardProps {
  item: {
    productId: string | number;
    productName: string;
    lowestPrice: number;
    originalPrice: number;
    totalStock: number;
    vendorCount: number;
    views: number;
    thumbnail?: string;
  };
  cardWidth: number;
  isCarousel: boolean;
  wishlistItems: WishlistItem[];
  isWishlistBusy?: boolean;
  onToggleWishlist?: (productId: string | number) => void;
  maxViews?: number;
}

export default function TrendingProductCard({
  item,
  cardWidth,
  isCarousel,
  wishlistItems,
  isWishlistBusy,
  onToggleWishlist,
  maxViews = 0,
}: TrendingProductCardProps) {
  if (!item) return <View />;

  const isWishlisted = wishlistItems.some(
    (w) => String(w?.productId) === String(item.productId),
  );

  const goToProduct = () =>
    router.push({
      pathname: ROUTES.PRODUCTS.SINGLE_PRODUCT_DETAILS,
      params: { productId: String(item.productId) },
    });

  const placeholderUrl = `https://via.placeholder.com/200?text=${encodeURIComponent(
    item.productName || "Product",
  )}`;

  // Pricing
  const discount =
    item.originalPrice && item.lowestPrice
      ? Math.round(
          ((item.originalPrice - item.lowestPrice) / item.originalPrice) * 100,
        )
      : 0;

  // Stock
  const isInStock = item.totalStock > 0;
  const isLowStock = item.totalStock > 0 && item.totalStock < 10;

  // Views
  const views = item.views ?? 0;

  // Trending Logic
  const isTrending = maxViews > 0 ? views > maxViews * 0.6 : views > 100;
  const isHot = maxViews > 0 ? views > maxViews * 0.85 : views > 500;

  const trendingLabel = isHot ? "HOT" : isTrending ? "TRENDING" : null;

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
            style={{
              width: "100%",
              height: isCarousel ? cardWidth : 160,
              opacity: 1,
            }}
            resizeMode="cover"
          />

          {/* {!isInStock && (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: colors.overlay,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.light,
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                Out of Stock
              </Text>
            </View>
          )} */}
        </Pressable>

        {/* Wishlist */}
        <Pressable
          hitSlop={10}
          disabled={isWishlistBusy}
          onPress={() => onToggleWishlist?.(item.productId)}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: colors.light,
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

        {/* Discount */}
        {discount > 0 && (
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
              style={{
                color: colors.light,
                fontSize: 10,
                fontWeight: "bold",
              }}
            >
              {discount}% OFF
            </Text>
          </View>
        )}
      </View>

      {/* INFO */}
      <Pressable style={{ marginTop: 8 }} onPress={goToProduct}>
        <Text style={[typography.Poppins_m_semibold]} numberOfLines={2}>
          {item.productName || "Product"}
        </Text>

        {/* Price */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginTop: 4,
          }}
        >
          <Text style={[typography.Poppins_s_medium, { fontSize: 14 }]}>
            ₹{Math.round(item.lowestPrice || item.originalPrice || 0)}
          </Text>

          {item.originalPrice && item.lowestPrice !== item.originalPrice && (
            <Text
              style={{
                textDecorationLine: "line-through",
                color: colors.neutral,
                fontSize: 12,
              }}
            >
              ₹{Math.round(item.originalPrice)}
            </Text>
          )}
        </View>

        {/* Views */}
        <Text
          style={{
            fontSize: 11,
            color: colors.neutral,
            marginTop: 2,
          }}
        >
          👁 {views} views
        </Text>

        {/* Stock */}
        {isInStock && (
          <Text
            style={{
              fontSize: 11,
              color: isLowStock ? colors.warning : colors.secondary,
              marginTop: 4,
              fontWeight: "500",
            }}
          >
            {isLowStock
              ? `Only ${item.totalStock} left!`
              : `${item.vendorCount} ${
                  item.vendorCount === 1 ? "vendor" : "vendors"
                } • ${item.totalStock} left`}
          </Text>
        )}
      </Pressable>
    </View>
  );
}
