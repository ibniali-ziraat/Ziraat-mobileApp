import AddToCartButton from "@/src/components/shared/AddToCartButton";
import CsText from "@/src/components/shared/CsText";
import RatingStars from "@/src/components/shared/RatingStars";
import { colors } from "@/src/constants/colors";
import { imageMapper } from "@/src/data/imageMapper";
// import { addToCartList, getCartList } from "@/src/utils/cartlistStore";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ToastAndroid,
  View
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth * 0.9;
const imageWidth = screenWidth * 0.4;
const addToCartButtonHeight = 40;

const WishlistItem = ({ item, onRemove }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkInCart = async () => {
      const cart = await getCartList();
      if (cart.some((cartItem) => cartItem.id === item._id.toString())) {
        setAddedToCart(true);
      }
    };
    checkInCart();
  }, [item._id]);

  const getDiscountPercent = (price: number, discountPrice: number) => {
    if (!discountPrice || !price) return null;
    return Math.round(((price - discountPrice) / price) * 100);
  };

  const discountPercent = getDiscountPercent(item.price, item.discountPrice);

  const handleAddToCart = async () => {
    try {
      await addToCartList({
        id: item._id.toString(),
        title: item.title,
        category: item.category,
        price: item.price,
        discountPrice: item.discountPrice || null,
        photos: item.photos,
      });
      ToastAndroid.show("Added to Cart", ToastAndroid.SHORT);
      setAddedToCart(true);
    } catch (error) {
      console.error("Add to cart failed:", error);
      ToastAndroid.show("Failed to add to cart", ToastAndroid.SHORT);
    }
  };

  const handleViewCart = () => {
    router.push("/cartlist");
  };

  return (
    <View
      className="bg-white border border-neutral rounded-2xl mt-4 p-4"
      style={{ width: cardWidth, alignSelf: "center" }}
    >
      <View className="flex-row items-start ">
        <Image
          source={imageMapper[item.photos[0]]}
          style={{ width: imageWidth, height: addToCartButtonHeight + 100 }}
          className="rounded-2xl"
          resizeMode="cover"
        />

        <View className="flex-1 ml-4 justify-between">
          <View>
            <View className="flex-row justify-between items-center">
              <CsText className="font-semibold text-[16px]" numberOfLines={1}>
                {item.title}
              </CsText>
              <Pressable
                className="rounded-full"
                onPress={() => onRemove(item._id)}
              >
                <X size={22} color={colors.dark} />
              </Pressable>
            </View>

            {item.category && (
              <CsText className="text-dark text-[14px] mt-1" numberOfLines={1}>
                {item.category}
              </CsText>
            )}

            <View className="flex-row items-center mt-2">
              {item.discountPrice ? (
                <>
                  <CsText className="text-dark line-through text-[14px] mr-2">
                    ₹{item.price}
                  </CsText>
                  <CsText className="text-primary font-bold text-[16px] mr-1">
                    ₹{item.discountPrice}
                  </CsText>
                  {discountPercent && (
                    <CsText className="text-secondary text-[12px] font-semibold">
                      {discountPercent}% OFF
                    </CsText>
                  )}
                </>
              ) : (
                <CsText className="text-primary font-semibold text-[16px]">
                  ₹{item.price}
                </CsText>
              )}
            </View>

            <View className="flex-row items-center justify-between mt-2">
              <RatingStars rating={item.rating} />
              <CsText className="text-sm text-light px-2 rounded-xl bg-primary">
                {item.inStock ? "In Stock" : "Out of Stock"}
              </CsText>
            </View>
          </View>

          <View className="mt-4">
            {addedToCart ? (
              <AddToCartButton
                title="View Cart"
                onPress={handleViewCart}
                className="bg-secondary"
              />
            ) : (
              <AddToCartButton title="Add to Cart" onPress={handleAddToCart} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default WishlistItem;
