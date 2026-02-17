import RatingStars from "@/src/components/shared/RatingStars";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
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

export default function AllProductsCarousal({
  items,
  wishlistItems = [],
  onAddToWishlist,
  onRemoveFromWishlist,
  isWishlistBusy,
}) {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.42;

  console.log(items, "items data+++ in all products carousal");

  const getWishlistItem = (productId: string) =>
    wishlistItems.find((w: any) => String(w.productId) === String(productId));

  return (
    <FlatList
      horizontal
      data={items}
      keyExtractor={(item) => item._id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      renderItem={({ item }) => {
        const wishlistItem = getWishlistItem(item._id);
        const isWishlisted = Boolean(wishlistItem);

        const price = item.discountPrice ?? item.price;
        const oldPrice =
          item.discountPrice && item.discountPrice < item.price
            ? item.price
            : null;

        const discount =
          oldPrice && price
            ? Math.round(((oldPrice - price) / oldPrice) * 100)
            : null;

        return (
          <View style={{ width: cardWidth }} className="mr-4">

            {/* IMAGE CARD */}
            <View
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: colors.light,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 2,
              }}
            >

              {/* IMAGE */}
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/products/single-product-details",
                    params: { productId: item._id },
                  })
                }
              >
                <Image
                  source={{ uri: item.photos?.[0] || item.thumbnailUrl }}
                  style={{ width: "100%", height: cardWidth }}
                  resizeMode="cover"
                />
              </Pressable>

<<<<<<< HEAD
              {/* HEART — NO NAVIGATION */}
=======
              {/* HEART */}
>>>>>>> 0a3936c9de2fa9e847f56d6250a340390cc2ac4a
              <Pressable
                hitSlop={10}
                disabled={isWishlistBusy}
                onPress={() => {
                  if (isWishlisted) {
                    onRemoveFromWishlist?.(wishlistItem.id);
                  } else {
                    onAddToWishlist?.(item._id);
                  }
                }}
                className="absolute top-2 right-2 bg-white/90 p-2 rounded-full"
              >
                <Heart
                  size={18}
                  color={isWishlisted ? "#E11D48" : "#9CA3AF"}
                  fill={isWishlisted ? "#E11D48" : "none"}
                />
              </Pressable>

              {/* DISCOUNT BADGE */}
              {discount && (
                <View
                  className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md"
                  style={{ backgroundColor: colors.secondary }}
                >
                  <CsText
                  style={{color:colors.light}}
                   className="text-xs  font-semibold">
                    {discount}% OFF
                  </CsText>
                </View>
              )}

            </View>

            {/* CONTENT */}
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/products/single-product-details",
                  params: { productId: item._id },
                })
              }
            >
<<<<<<< HEAD
              <Text style={typography.Poppins_m_semibold} numberOfLines={1}>
=======
              <CsText
                style={typography.Poppins_s_semibold}
                numberOfLines={2}
                className="mt-2"
              >
>>>>>>> 0a3936c9de2fa9e847f56d6250a340390cc2ac4a
                {item.title || item.name}
              </Text>

<<<<<<< HEAD
              <Text style={typography.Poppins_s_medium}>
                ₹{item.discountPrice ?? item.price}
              </Text>
=======
              {/* PRICE */}
              <View className="flex-row items-center mt-1">

                <CsText
                  style={{ color: colors.primary }}
                  className="font-semibold mr-2"
                >
                  ₹{price}
                </CsText>

                {oldPrice && (
                  <CsText
                    className="text-xs line-through"
                    style={{ color: colors.darkHover }}
                  >
                    ₹{oldPrice}
                  </CsText>
                )}

              </View>
>>>>>>> 0a3936c9de2fa9e847f56d6250a340390cc2ac4a
            </Pressable>

            {/* RATING */}
            <View className="mt-1">
              <RatingStars rating={item.rating || item.ratingAverage} />
            </View>

          </View>
        );
      }}
    />
  );
}
