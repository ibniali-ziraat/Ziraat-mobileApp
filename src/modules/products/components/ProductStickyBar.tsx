import AddToCartButton from "@/src/components/shared/AddToCartButton";
import BuyNowButton from "@/src/components/shared/BuyNowButton";
import { router } from "expo-router";
import { View } from "react-native";

type Props = {
  product: any;
  quantity: number;
  onAddToCart: () => void;
};
export default function ProductStickyBar({
  product,
  quantity,
  isInCart,
  onAddToCart,
  onRemoveFromCart,
}: Props) {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
      <View className="flex-row">
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

        <View className="flex-1">
          {isInCart ? (
            <AddToCartButton
              title="Remove from Cart"
              onPress={onRemoveFromCart}
              variant="danger"
            />
          ) : (
            <AddToCartButton
              title="Add to Cart"
              onPress={onAddToCart}
              disabled={!product.isAllowToOrder}
            />
          )}
        </View>
      </View>
    </View>
  );
}
