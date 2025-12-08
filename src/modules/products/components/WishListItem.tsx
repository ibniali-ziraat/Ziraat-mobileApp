import AddToCartButton from "@/src/components/shared/AddToCartButton";
import RatingStars from "@/src/components/shared/RatingStars";
import { colors } from "@/src/constants/colors";
import { imageMapper } from "@/src/Data/imageMapper";
import { X } from "lucide-react-native";
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth * 0.9;
const imageWidth = screenWidth * 0.4;
const addToCartButtonHeight = 40;


const WishlistItem = ({ item, onRemove }) => {
  const getDiscountPercent = (price: number, discountPrice: number) => {
    if (!discountPrice || !price) return null;
    return Math.round(((price - discountPrice) / price) * 100);
  };

  const discountPercent = getDiscountPercent(item.price, item.discountPrice);

  return (
    <View
      className="bg-white border border-neutral rounded-2xl p-4 mb-4"
      style={{ width: cardWidth, alignSelf: "center" }}
    >
      <View className="flex-row items-start">

        <Image
          source={imageMapper[item.photos[0]]}
          style={{
            width: imageWidth,
            height: addToCartButtonHeight + 100,
          }}
          className="rounded-2xl"
          resizeMode="cover"
        />

        <View className="flex-1 ml-4 justify-between">
          <View>

            <View className="flex-row  justify-between items-center">
              <Text className="font-semibold text-[16px]" numberOfLines={1}>
                {item.title}
              </Text>
              <Pressable
                className="rounded-full bg-neutral"
                onPress={() => onRemove(item._id)}
              >
                <X size={22} color={colors.dark} />
              </Pressable>
            </View>

          
            {item.category && (
              <Text className="text-dark text-[14px] mt-1" numberOfLines={1}>
                {item.category}
              </Text>
            )}

            <View className="flex-row items-center mt-2">
              {item.discountPrice ? (
                <>
                  <Text className="text-dark line-through text-[14px] mr-2">
                    ₹{item.price}
                  </Text>
                  <Text className="text-primary font-bold text-[16px] mr-1">
                    ₹{item.discountPrice}
                  </Text>
                  {discountPercent && (
                    <Text className="text-secondary text-[12px] font-semibold">
                      {discountPercent}% OFF
                    </Text>
                  )}
                </>
              ) : (
                <Text className="text-primary font-semibold text-[16px]">
                  ₹{item.price}
                </Text>
              )}
            </View>

            <View className="flex-row items-center justify-between mt-2">
              <RatingStars rating={item.rating} />
              <Text className="text-sm text-light px-2 rounded-xl bg-primary">
                {item.inStock ? "In Stock" : "Out of Stock"}
              </Text>
            </View>
          </View>

          <View className="mt-4">
            <AddToCartButton
              product={item}
              style={{
                height: addToCartButtonHeight,
                width: "100%",
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default WishlistItem;
