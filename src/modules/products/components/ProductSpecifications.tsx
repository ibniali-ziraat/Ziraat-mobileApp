import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { Package } from "lucide-react-native";
import { View } from "react-native";
import { stripHtml } from "../utils/stripHtml";

export default function ProductSpecifications({ product }: any) {
  if (!product.specification && !product.attributes?.length) return null;

  return (
    <View className=" mt-6">
      <CsText style={typography.Poppins_m_semibold}>Specifications</CsText>

      {product.specification && (
        <CsText className="mt-2">{stripHtml(product.specification)}</CsText>
      )}

      {product.attributes?.map((attr: any, i: number) => (
        <View key={i} className="flex-row items-center mt-2">
          <Package size={16} color={colors.secondary} />
          <CsText className="ml-2">
            {attr.name}: {attr.value}
          </CsText>
        </View>
      ))}
    </View>
  );
}
