import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { IndianRupee } from "lucide-react-native";
import { View } from "react-native";

export default function ProductPriceCard({ product }: any) {
  const price = product.calculatedProductPrice;
  const inStock =
    !product.stockTrackingIsEnabled || product.stockQuantity > 0;

  const savings =
    price?.oldPrice && price?.price
      ? price.oldPrice - price.price
      : null;

  return (
    <View
      className="mt-3 rounded-2xl p-4"
      style={{
        backgroundColor: colors.light,
        borderWidth: 1,
        borderColor: colors.light,
      }}
    >
      {/* PRICE + STOCK ROW */}
      <View className="flex-row justify-between items-start">

        {/* LEFT */}
        <View>

          {/* OLD PRICE */}
          {price?.oldPrice && (
            <View className="flex-row items-center mb-1">
              <IndianRupee size={12} color={colors.darkHover} />
              <CsText
                style={[
                  typography.Poppins_s_regular,
                  {
                    textDecorationLine: "line-through",
                    color: colors.darkHover,
                  },
                ]}
                className="ml-1"
              >
                {price.oldPriceString}
              </CsText>
            </View>
          )}

          {/* MAIN PRICE */}
          <View className="flex-row items-center">

            <IndianRupee size={20} color={colors.dark} />

            <CsText
              style={[typography.Poppins_l_semibold, { color: colors.dark }]}
              className="ml-1"
            >
              {price?.priceString}
            </CsText>

            {/* DISCOUNT */}
            {price?.oldPrice && (
              <View
                className="ml-3 px-2 py-0.5 rounded-full"
                style={{ backgroundColor: colors.secondary + "20" }}
              >
                <CsText
                  style={{ color: colors.secondary }}
                  className="text-xs font-semibold"
                >
                  {price.percentOfSaving}% OFF
                </CsText>
              </View>
            )}

          </View>

          {/* SAVINGS */}
          {savings && (
            <CsText
              style={{ color: colors.primary }}
              className="text-xs mt-1"
            >
              You save ₹{savings}
            </CsText>
          )}

        </View>

        {/* STOCK BADGE */}
        <View
          className="px-3 py-1 rounded-full"
          style={{
            backgroundColor: inStock
              ? colors.primary + "15"
              : colors.lightHover,
          }}
        >
          <CsText
            style={{
              color: inStock ? colors.primary : colors.darkHover,
            }}
            className="text-xs font-semibold"
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </CsText>
        </View>

      </View>

      {/* DIVIDER */}
      <View
        className="mt-3"
        style={{
          height: 1,
          backgroundColor: colors.lightHover,
        }}
      />

    </View>
  );
}
