import { typography } from "@/src/constants/fonts/typography";
import { Text, View } from "react-native";
import { stripHtml } from "../utils/stripHtml";

export default function ProductDescription({ product }: any) {
  return (
    <View className=" mt-6">
      {product.shortDescription && (
        <>
          <Text style={typography.Poppins_m_semibold}>Overview</Text>
          <Text className="mt-2 text-justify">
            {stripHtml(product.shortDescription)}
          </Text>
        </>
      )}

      {product.description && (
        <>
          <Text style={typography.Poppins_m_semibold} className="mt-6">
            Product Description
          </Text>
          <Text className="mt-2 text-justify">
            {stripHtml(product.description)}
          </Text>
        </>
      )}
    </View>
  );
}
