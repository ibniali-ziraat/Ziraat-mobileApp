import BackButton from "@/src/components/shared/BackButton";
import BuyNowButton from "@/src/components/shared/BuyNowButton";
import LegalDisclaimer from "@/src/components/shared/LegalDisclaimer";

import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
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

  const handleBackPress = () => {
    router.replace(ROUTES.TABS.PRODUCTS); // change path if needed
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
        paddingBottom: 20,

        backgroundColor: colors.light,

        borderTopWidth: 1,
        borderTopColor: "#E5E5E5",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,

        elevation: 6,
        zIndex: 999,
      }}
    >
      {/* Legal Disclaimer */}
      <View style={{ marginBottom: 8 }}>
        <LegalDisclaimer />
      </View>

      {/* Buttons Row */}
      <View
        style={{
          flexDirection: "row",
          gap: 12,
        }}
      >
        {/* Back Button */}
        <View style={{ flex: 1 }}>
          <BackButton
            title="Back"
            onPress={handleBackPress}
            variant="secondary"
          />
        </View>

        {/* Add To Cart Button */}
        <View style={{ flex: 1 }}>
          <BuyNowButton
            title={isInCart ? "Remove from Cart" : "Add to Cart"}
            onPress={handleCartPress}
            disabled={isCartBusy}
            loading={isCartBusy}
          />
        </View>
      </View>
    </View>
  );
}
