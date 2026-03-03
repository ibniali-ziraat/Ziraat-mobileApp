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
    if (isInCart) {
      onRemoveFromCart();
    } else {
      onAddToCart();
    }
  };

  const handleBuyNowPress = () => {
    router.push({
      pathname: "/products/shipping",
      params: {
        productId: String(product.id),
        quantity: String(quantity),
      },
    });
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,

        paddingTop: 12,
        paddingHorizontal: 16,

        backgroundColor: colors.light,

        zIndex: 999,
      }}
    >
      {/* Top border line */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: colors.dark,
          opacity: 0.08,
        }}
      />

      {/* Buttons row */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 8,
        }}
      >
        <View style={{ flex: 1, marginRight: 12 }}>
          <BuyNowButton onPress={handleBuyNowPress} />
        </View>

        <View style={{ flex: 1 }}>
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
