import CsText from "@/src/components/shared/CsText";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";
import { stripHtml } from "../utils/stripHtml";

export default function ProductDescription({ product }: any) {
  return (
    <View className="px-4 mt-6">
      {product.shortDescription && (
        <>
          <CsText style={typography.Poppins_m_semibold}>Overview</CsText>
          <CsText className="mt-2 text-justify">
            {stripHtml(product.shortDescription)}
          </CsText>
        </>
      )}

      {product.description && (
        <>
          <CsText style={typography.Poppins_m_semibold} className="mt-6">
            Product Description
          </CsText>
          <CsText className="mt-2 text-justify">
            {stripHtml(product.description)}
          </CsText>
        </>
      )}
    </View>
  );
}
