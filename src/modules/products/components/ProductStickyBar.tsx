import AddToCartButton from "@/src/components/shared/AddToCartButton";
import BuyNowButton from "@/src/components/shared/BuyNowButton";
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
    if (isInCart) {
      onRemoveFromCart();
    } else {
      onAddToCart();
    }
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
      <View className="flex-row">
        {/* Buy Now */}
        <View className="flex-1 mr-2">
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

        {/* Single Add/Remove Button */}
        <View className="flex-1">
          <AddToCartButton
            title={isInCart ? "Remove from Cart" : "Add to Cart"}
            onPress={handleCartPress}
            disabled={isCartBusy}
            variant={isInCart ? "danger" : "primary"} // optional styling
          />
        </View>
      </View>
    </View>
  );
}
