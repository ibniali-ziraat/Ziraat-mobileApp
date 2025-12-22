import { ProductCarouselProps } from "@/src/types/product-carousel.type";
import { Heart } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import RatingStars from "../../components/shared/RatingStars";
import { colors } from "../../constants/colors";

import {
  addToWishlist,
  isInWishlist,
  removeFromWishlist,
} from "@/src/utils/wishlistStore";

export default function ProductCarousel({
  items,
  imageMapper,
}: ProductCarouselProps) {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.42;
  const imageSize = screenWidth * 0.4;

  const getDiscountPercent = (price: number, discountPrice: number) => {
    if (!discountPrice || !price) return null;
    return Math.round(((price - discountPrice) / price) * 100);
  };

  const [refresh, setRefresh] = useState(false);

  const handleHeartPress = (item: any) => {
    if (isInWishlist(item._id)) {
      removeFromWishlist(item._id);
    } else {
      addToWishlist(item);

      ToastAndroid.show("Added to Wishlist", ToastAndroid.SHORT);
    }
    setRefresh(!refresh);
  };

  return (
    <View className="mb-6">
      <FlatList
        horizontal
        data={items}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const discountPercent = getDiscountPercent(
            item.price,
            item.discountPrice
          );

          return (
            <Pressable
            // onPress={() =>
            //   router.push({
            //     pathname: "/single-product-details",
            //     params: { productId: item._id },
            //   })
            // }
            >
              <View className="mr-2 items-center" style={{ width: cardWidth }}>
                <View className="relative">
                  <Image
                    source={imageMapper[item.photos[0]]}
                    className="rounded-2xl"
                    style={{ width: imageSize, height: imageSize }}
                  />

                  {item.label && (
                    <View className="absolute top-2 left-2 bg-primary px-2 py-1 rounded-lg">
                      <Text className="text-white text-[10px] font-semibold">
                        {item.label}
                      </Text>
                    </View>
                  )}

                  <Pressable
                    className="absolute top-2 right-2 p-1"
                    onPress={(event) => {
                      event.stopPropagation();
                      handleHeartPress(item);
                    }}
                  >
                    <Heart
                      size={20}
                      color={colors.dark}
                      fill={
                        isInWishlist(item._id)
                          ? colors.secondary
                          : "transparent"
                      }
                    />
                  </Pressable>
                </View>

                <Text
                  className="font-semibold text-[18px] mt-2 w-full px-2"
                  numberOfLines={1}
                >
                  {item.title}
                </Text>

                {item.category && (
                  <Text
                    className="text-dark text-[14px] w-full px-2 mt-1"
                    numberOfLines={1}
                  >
                    {item.category}
                  </Text>
                )}

                <View className="flex-row items-center mt-1 w-full px-2">
                  {item.discountPrice ? (
                    <>
                      <Text className="text-dark line-through text-[14px] mr-5">
                        ₹{item.price}
                      </Text>

                      <Text className="text-primary font-bold text-[16px] mr-1">
                        ₹{item.discountPrice}
                      </Text>

                      {discountPercent && (
                        <Text className="text-secondary text-[14px] font-semibold">
                          {discountPercent}% OFF
                        </Text>
                      )}
                    </>
                  ) : (
                    <Text className="text-primary font-semibold text-[18px]">
                      ₹{item.price}
                    </Text>
                  )}
                </View>

                <View className="flex-row items-center justify-between w-full px-2 mt-2">
                  <RatingStars rating={item.rating} />
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
