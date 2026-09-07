import RatingStars from "@/src/components/shared/RatingStars";
import { colors } from "@/src/constants/colors";
import { cardShadow, cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { Heart, Store } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import { NormalizedProduct, WishlistItem } from "../types/productlist.types";
import { calcDiscount } from "../utils/utils";

interface ProductCardProps {
  item: NormalizedProduct;
  cardWidth: number;
  isCarousel: boolean;
  wishlistItems: WishlistItem[];
  isWishlistBusy?: boolean;
  onToggleWishlist?: (
    productId: string,
    vendorId?: string | number,
    vendorProductId?: string | number,
  ) => void;
  vendors?: [];
}
//
export default function ProductCard({
  item,
  cardWidth,
  isCarousel,
  wishlistItems,
  isWishlistBusy,
  onToggleWishlist,
  vendors,
}: ProductCardProps) {
  const isWishlisted = wishlistItems.some(
    (w) =>
      String(w?.productId) === String(item.id) &&
      String(w?.vendorId) === String(item.vendorId),
  );

  // console.log(vendors, "vendors...");
  // console.log(item, "item...bb");

  const discount = calcDiscount(item.price, item.oldPrice);
  // console.log(item, "product detail item...");

  const goToProduct = () =>
    router.push({
      pathname: ROUTES.PRODUCTS.SINGLE_PRODUCT_DETAILS,
      params: {
        productId: item.id,
        vendorId: item.vendorId,
        vendorProductId: item.vendorProductId,
      },
    });

  // console.log(item, "prodcut item");

  return (
    <View
      style={{
        width: isCarousel ? cardWidth : "48%",
        marginRight: isCarousel ? 12 : 0,
        marginBottom: isCarousel ? 0 : 16,
      }}
    >
      <View
        style={[
          {
            backgroundColor: cardTokens.surface,
            borderRadius: cardTokens.radius,
            borderCurve: "continuous",
            borderWidth: 1,
            borderColor: cardTokens.border,
            overflow: "hidden",
          },
          cardShadow,
        ]}
      >
        <View>
          <Pressable onPress={goToProduct}>
            <Image
              source={{ uri: item.image }}
              style={{
                width: "100%",
                height: isCarousel ? cardWidth : 150,
                backgroundColor: cardTokens.mutedSurface,
              }}
              resizeMode="cover"
            />
          </Pressable>

          {/* Wishlist Button */}
          <Pressable
            hitSlop={10}
            disabled={isWishlistBusy}
            onPress={() =>
              onToggleWishlist?.(item.id, item.vendorId, item.vendorProductId)
            }
            style={[
              {
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(255, 255, 255, 0.92)",
                padding: 8,
                borderRadius: 24,
              },
              cardShadow,
            ]}
          >
            <Heart
              size={17}
              color={isWishlisted ? colors.error : cardTokens.inkSecondary}
              fill={isWishlisted ? colors.error : "none"}
            />
          </Pressable>

          {/* Discount Badge */}
          {discount && (
            <View
              style={{
                position: "absolute",
                bottom: 8,
                left: 8,
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 999,
                backgroundColor: chartTokens.accent,
              }}
            >
              <Text
                style={[
                  typography.Poppins_xs_semibold,
                  { color: "#FFFFFF", fontSize: 10 },
                ]}
              >
                {discount}% OFF
              </Text>
            </View>
          )}
        </View>

        <Pressable style={{ padding: 10 }} onPress={goToProduct}>
          <Text
            style={[
              typography.Poppins_s_semibold,
              { color: cardTokens.inkPrimary },
            ]}
            numberOfLines={1}
          >
            {item.title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-start",
              marginTop: 5,
              paddingHorizontal: 7,
              paddingVertical: 3,
              borderRadius: 999,
              backgroundColor: chartTokens.tint,
              maxWidth: "100%",
            }}
          >
            <Store size={11} color={chartTokens.current} strokeWidth={2.2} />
            <Text
              numberOfLines={1}
              style={[
                typography.Poppins_xs_semibold,
                {
                  color: chartTokens.current,
                  fontSize: 10.5,
                  marginLeft: 4,
                  flexShrink: 1,
                },
              ]}
            >
              {item.vendorName}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginTop: 7,
            }}
          >
            <Text
              style={[
                typography.Poppins_s_medium,
                { color: cardTokens.inkPrimary },
              ]}
            >
              ₹{item.price}
            </Text>
            {item.oldPrice && (
              <Text
                style={[
                  typography.Poppins_xs_regular,
                  {
                    textDecorationLine: "line-through",
                    color: cardTokens.inkMuted,
                    fontSize: 12,
                  },
                ]}
              >
                ₹{item.oldPrice}
              </Text>
            )}
          </View>

          <View style={{ marginTop: 4 }}>
            <RatingStars rating={item.rating ?? 0} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
