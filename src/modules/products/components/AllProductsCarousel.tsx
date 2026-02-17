import RatingStars from "@/src/components/shared/RatingStars";
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
      renderItem={({ item }) => {
        const wishlistItem = getWishlistItem(item._id);
        const isWishlisted = Boolean(wishlistItem);

        return (
          <View style={{ width: cardWidth }} className="mr-3">
            {/* ✅ IMAGE + HEART */}
            <View className="relative">
              {/* 🔹 ONLY THIS navigates */}
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
                  className="rounded-2xl"
                  style={{ width: "100%", height: cardWidth }}
                />
              </Pressable>

              {/* HEART — NO NAVIGATION */}
              <Pressable
                hitSlop={10}
                disabled={isWishlistBusy}
                onPress={() => {
                  if (isWishlisted) {
                    onRemoveFromWishlist?.(wishlistItem.id); // wishlist id
                  } else {
                    onAddToWishlist?.(item._id); // product id
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
            </View>

            {/* 🔹 TITLE → NAVIGATES */}
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/products/single-product-details",
                  params: { productId: item._id },
                })
              }
            >
              <Text style={typography.Poppins_m_semibold} numberOfLines={1}>
                {item.title || item.name}
              </Text>

              <Text style={typography.Poppins_s_medium}>
                ₹{item.discountPrice ?? item.price}
              </Text>
            </Pressable>

            <RatingStars rating={item.rating || item.ratingAverage} />
          </View>
        );
      }}
    />
  );
}
