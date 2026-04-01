import RatingStars from "@/src/components/shared/RatingStars";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { Heart } from "lucide-react-native";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

export default function ProductsList({
  items,
  wishlistItems = [],
  onToggleWishlist,
  isWishlistBusy,
  onSeeMore,
  variant = "grid",
}) {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.42;

  const isCarousel = variant === "carousel";

  /**
   * ✅ NORMALIZE DATA (handles both API + old format)
   */
  const normalizedItems = (items?.products || items || [])
    .filter((item) => item) // remove null/undefined
    .map((item) => ({
      id: item.id ?? item._id,
      title: item.name ?? item.title,
      price: item.price,
      oldPrice: item.oldPrice ?? item.discountPrice,
      image: item.thumbnailUrl ?? item.photos?.[0],
      rating: item.ratingAverage ?? item.rating,
    }))
    .filter((item) => item.id); // ensure valid id

  return (
    <FlatList
      data={normalizedItems}
      horizontal={isCarousel}
      numColumns={isCarousel ? 1 : 2}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={!isCarousel}
      contentContainerStyle={{
        paddingHorizontal: 12,
        paddingBottom: isCarousel ? 0 : 30,
      }}
      columnWrapperStyle={
        !isCarousel ? { justifyContent: "space-between" } : undefined
      }

      /**
       * ✅ SAFE KEY EXTRACTOR
       */
      keyExtractor={(item, index) =>
        item?.id ? String(item.id) : `fallback-${index}`
      }

      renderItem={({ item }) => {
        if (!item) return null;

        /**
         * ✅ SAFE WISHLIST CHECK
         */
        const isWishlisted = (wishlistItems || []).some(
          (w) => String(w?.productId) === String(item.id)
        );

        const price = item.price;
        const oldPrice = item.oldPrice;

        const discount =
          oldPrice && price
            ? Math.round(((oldPrice - price) / oldPrice) * 100)
            : null;

        return (
          <View
            style={{
              width: isCarousel ? cardWidth : "48%",
              marginRight: isCarousel ? 12 : 0,
              marginBottom: isCarousel ? 0 : 16,
            }}
          >
            {/* CARD */}
            <View
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: colors.light,
                elevation: 2,
              }}
            >
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: ROUTES.PRODUCTS.SINGLE_PRODUCT_DETAILS,
                    params: { productId: item.id },
                  })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: "100%",
                    height: isCarousel ? cardWidth : 160,
                  }}
                  resizeMode="cover"
                />
              </Pressable>

              {/* Wishlist */}
              <Pressable
                hitSlop={10}
                disabled={isWishlistBusy}
                onPress={() => onToggleWishlist?.(item.id)}
                className="absolute top-2 right-2 bg-white/90 p-2 rounded-full"
              >
                <Heart
                  size={18}
                  color={isWishlisted ? "#E11D48" : "#9CA3AF"}
                  fill={isWishlisted ? "#E11D48" : "none"}
                />
              </Pressable>

              {/* Discount */}
              {discount && (
                <View
                  className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md"
                  style={{ backgroundColor: colors.secondary }}
                >
                  <Text style={{ color: "#fff", fontSize: 10 }}>
                    {discount}% OFF
                  </Text>
                </View>
              )}
            </View>

            {/* INFO */}
            <Pressable
              className="mt-2"
              onPress={() =>
                router.push({
                  pathname: ROUTES.PRODUCTS.SINGLE_PRODUCT_DETAILS,
                  params: { productId: item.id },
                })
              }
            >
              <Text style={typography.Poppins_m_semibold} numberOfLines={1}>
                {item.title}
              </Text>

              <View className="flex-row items-center gap-2">
                <Text style={typography.Poppins_s_medium}>₹{price}</Text>

                {oldPrice && (
                  <Text
                    style={{
                      textDecorationLine: "line-through",
                      color: "#9CA3AF",
                      fontSize: 12,
                    }}
                  >
                    ₹{oldPrice}
                  </Text>
                )}
              </View>
            </Pressable>

            <View className="mt-1">
              <RatingStars rating={item.rating || 0} />
            </View>
          </View>
        );
      }}
    />
  );
}