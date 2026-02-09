import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { IndianRupee } from "lucide-react-native";
import { View } from "react-native";

export default function ProductPriceCard({ product }: any) {
  const price = product.calculatedProductPrice;
  const inStock = !product.stockTrackingIsEnabled || product.stockQuantity > 0;

  return (
    <View className="mt-4 mx-4 p-4 bg-white rounded-2xl shadow-sm">
      <View className="flex-row items-center flex-wrap">
        <IndianRupee size={12} color={colors.dark} />
        <CsText
          style={[
            typography.Poppins_s_regular,
            price?.oldPrice && { textDecorationLine: "line-through" },
          ]}
          className="ml-1"
        >
          {price?.oldPriceString ?? price?.priceString}
        </CsText>

        {price?.oldPrice && (
          <>
            <IndianRupee size={18} color={colors.dark} className="ml-4" />
            <CsText style={typography.Poppins_xl_semibold} className="ml-1">
              {price.priceString}
            </CsText>

            <CsText className="ml-3 text-success">
              {price.percentOfSaving}% OFF
            </CsText>
          </>
        )}

        <View
          className={`ml-auto px-3 py-1 rounded-full ${
            inStock ? "bg-primary" : "bg-light"
          }`}
        >
          <CsText className={inStock ? "text-light" : "text-primary"}>
            {inStock ? "In Stock" : "Out of Stock"}
          </CsText>
        </View>
      </View>
    </View>
  );
}
