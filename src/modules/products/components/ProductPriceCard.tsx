import CsText from "@/src/components/shared/CsText";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import {
  formatPrice,
  getCreditPrice,
  roundPrice,
} from "@/src/utils/creditPrice";
import { View } from "react-native";

export default function ProductPriceCard({ product, selectedVariation }: any) {
  // Buy on Credit is the default payment method, so show its price
  const source = selectedVariation ?? product.vendorProduct;
  const basePrice = selectedVariation
    ? (selectedVariation.discountPrice ?? selectedVariation.assignedPrice)
    : product.calculatedProductPrice?.price;
  const salePrice = roundPrice(getCreditPrice(source) ?? basePrice ?? 0);
  const mrp = selectedVariation
    ? selectedVariation.maximumRetailPrice
    : (product.vendorProduct?.maximumRetailPrice ??
      product.calculatedProductPrice?.oldPrice);
  // only strike through an MRP that is actually higher than the price
  const showMrp = !!mrp && mrp > salePrice;

  const price = {
    price: formatPrice(salePrice),
    oldPrice: showMrp ? formatPrice(mrp) : null,
    percentOfSaving: showMrp ? Math.round((1 - salePrice / mrp) * 100) : 0,
  };

  const inStock = selectedVariation
    ? selectedVariation.stockQuantity > 0
    : !product.stockTrackingIsEnabled || product.stockQuantity > 0;

  const savings = showMrp ? formatPrice(mrp - salePrice) : null;

  return (
    <View
      style={{
        marginTop: 16,
        padding: 16,
        borderRadius: 20,
        backgroundColor: chartTokens.tint,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <CsText
          style={[
            typography.Poppins_l_semibold,
            { color: cardTokens.inkPrimary, fontSize: 26, lineHeight: 32 },
          ]}
        >
          ₹{price.price}
        </CsText>

        {price.oldPrice ? (
          <CsText
            style={[
              typography.Poppins_s_regular,
              {
                color: cardTokens.inkMuted,
                textDecorationLine: "line-through",
              },
            ]}
          >
            ₹{price.oldPrice}
          </CsText>
        ) : null}

        {price.oldPrice ? (
          <View
            style={{
              paddingHorizontal: 9,
              paddingVertical: 3,
              borderRadius: 999,
              backgroundColor: chartTokens.accent,
            }}
          >
            <CsText
              style={[
                typography.Poppins_xs_semibold,
                { color: "#FFFFFF", fontSize: 13.5 },
              ]}
            >
              {price.percentOfSaving}% OFF
            </CsText>
          </View>
        ) : null}
      </View>

      {savings ? (
        <CsText
          style={[
            typography.Poppins_xs_medium,
            { color: chartTokens.current, fontSize: 14, marginTop: 4 },
          ]}
        >
          You save ₹{savings}
        </CsText>
      ) : null}
    </View>
  );
}
