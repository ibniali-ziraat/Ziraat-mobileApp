import AddToCartButton from "@/src/components/shared/AddToCartButton";
import CsText from "@/src/components/shared/CsText";
import RatingStars from "@/src/components/shared/RatingStars";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { imageMapper } from "@/src/data/imageMapper";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ToastAndroid,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.4;
const addToCartButtonHeight = 40;


const WishlistItem = ({ item, onRemove }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const router = useRouter();

  const discountPercent =
    item.discountPrice && item.price
      ? Math.round(((item.price - item.discountPrice) / item.price) * 100)
      : null;

  const handleAddToCart = () => {
    setAddedToCart(true);
    ToastAndroid.show("Added to Cart", ToastAndroid.SHORT);
  };

  const handleViewCart = () => router.push("/cartlist");

  return (

    <ZiraatCard width="100%" paddingHorizontal={1} paddingVertical={1} marginBottom={1}
      paddingBottom={1} paddingTop={1}>
      <View className="flex-row items-start">

        <Image
          source={imageMapper[item.photos[0]]}
          style={{
            width: imageWidth,
            height: addToCartButtonHeight + 130,
          }}
          className="rounded-2xl"
          resizeMode="cover"
        />

        <View className="flex-1 ml-4 justify-between">
          <View>

            <View className="flex-row justify-between items-center">
              <CsText
                style={typography.Poppins_m_medium}
                numberOfLines={1}
              >
                {item.title}
              </CsText>

              <Pressable onPress={() => onRemove(item.wishlistId)}>
                <X size={22} color={colors.dark} />
              </Pressable>
            </View>

            <CsText
              className="mt-1"
              style={typography.Poppins_s_regular}
              numberOfLines={1}
            >
              {item.category}
            </CsText>

            <View className="flex-row items-center mt-2">
              {item.discountPrice ? (
                <>
                  <CsText
                    className="line-through mr-2"
                    style={typography.Poppins_xs_medium}
                  >
                    ₹{item.price}
                  </CsText>

                  <CsText
                    className="text-primary mr-1"
                    style={typography.Poppins_m_semibold}
                  >
                    ₹{item.discountPrice}
                  </CsText>

                  {discountPercent && (
                    <CsText
                      className="text-secondary"
                      style={typography.Poppins_xs_medium}
                    >
                      {discountPercent}% OFF
                    </CsText>
                  )}
                </>
              ) : (
                <CsText
                  className="text-primary"
                  style={typography.Poppins_xs_medium}
                >
                  ₹{item.price}
                </CsText>
              )}
            </View>

            <View className="flex-row items-center justify-between mt-2">
              <RatingStars rating={item.rating} />
              <CsText
                className={`px-2  text-secondary ${item.inStock ? "" : ""
                  }`}
                style={typography.Poppins_xs_bold}
              >
                {item.inStock ? "In Stock" : "Out of Stock"}
              </CsText>
            </View>
          </View>

          <View className="mt-8 ">
            {addedToCart ? (
              <AddToCartButton
                title="View Cart"
                onPress={handleViewCart}
                className="bg-secondary"
              />
            ) : (
              <AddToCartButton
                title="Add to Cart"
                onPress={handleAddToCart}
              />
            )}
          </View>
        </View>
      </View>
    </ZiraatCard>

  );
};

export default WishlistItem;
