import AddToCartButton from "@/src/components/shared/AddToCartButton";
import BuyNowButton from "@/src/components/shared/BuyNowButton";
import { colors } from "@/src/constants/colors";
import { router } from "expo-router";
import { View } from "react-native";

type Props = {
  product: any;
  quantity: number;
  isInCart: boolean;
  isCartBusy: boolean;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
};

export default function ProductStickyBar({
  product,
  quantity,
  isInCart,
  isCartBusy,
  onAddToCart,
  onRemoveFromCart,
}: Props) {
  const handleCartPress = () => {
    isInCart ? onRemoveFromCart() : onAddToCart();
  };

  return (
    <View
      className="absolute bottom-0 left-0 right-0 pt-3 px-4 pb-5"
      style={{
        backgroundColor: colors.light,
        shadowColor: colors.dark,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      {/* Top Divider */}
      <View
        className="absolute top-0 left-0 right-0"
        style={{
          height: 1,
          backgroundColor: colors.dark,
          opacity: 0.08,
        }}
      />

      <View className="flex-row mt-2">

        {/* Buy Now */}
        <View className="flex-1 mr-3">
          <BuyNowButton
            onPress={() =>
              router.push({
                pathname: "/products/shipping",
                params: {
                  productId: String(product.id),
                  quantity: String(quantity),
                },
              })
            }
          />
        </View>

        {/* Add / Remove */}
        <View className="flex-1">
          <AddToCartButton
            title={isInCart ? "Remove from Cart" : "Add to Cart"}
    onPress={handleCartPress}
    disabled={isCartBusy}
    loading={isCartBusy}   
    variant={isInCart ? "danger" : "primary"}
          />
        </View>

      </View>
    </View>
  );
}
