import AddToCartButton from "@/src/components/shared/AddToCartButton";
import CsText from "@/src/components/shared/CsText";
import QuantitySelector from "@/src/components/shared/QuantitySelector";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useState } from "react";
import { Dimensions, Image, Pressable, View } from "react-native";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth * 0.4;
const addToCartButtonHeight = 40;

const WishlistItem = ({ item, onRemove, onAddToCart }) => {
  const [quantity, setQuantity] = useState(item.quantity ?? 1);
  const [addedToCart, setAddedToCart] = useState(false);
  const router = useRouter();

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = async () => {
    await onAddToCart({
      productId: item.productId,
      quantity,
    });
    setAddedToCart(true);
  };

  const handleViewCart = () => router.push("/cartlist");

  return (
    <ZiraatCard width="100%" paddingHorizontal={1} paddingVertical={1}>
      <View className="flex-row items-start">
        {/* IMAGE */}
        <Image
          source={{ uri: item.productImage }}
          style={{
            width: imageWidth,
            height: addToCartButtonHeight + 130,
          }}
          className="rounded-2xl"
          resizeMode="cover"
        />

        <View className="flex-1 ml-4 justify-between">
          <View>
            {/* TITLE + REMOVE */}
            <View className="flex-row justify-between items-center">
              <CsText style={typography.Poppins_m_medium} numberOfLines={2}>
                {item.productName}
              </CsText>

              <Pressable onPress={() => onRemove(item.id)}>
                <X size={22} color={colors.dark} />
              </Pressable>
            </View>

            {/* PRODUCT ID */}
            <CsText
              className="mt-1 text-gray-500"
              style={typography.Poppins_xs_regular}
            >
              Product ID: {item.productId}
            </CsText>

            {/* QUANTITY SELECTOR */}
            <View className="mt-3">
              <QuantitySelector
                value={quantity}
                onIncrease={increaseQty}
                onDecrease={decreaseQty}
                min={1}
              />
            </View>
          </View>

          {/* ADD TO CART */}
          <View className="mt-6">
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
    </ZiraatCard>
  );
};

export default WishlistItem;
