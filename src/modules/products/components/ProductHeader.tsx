import CsText from "@/src/components/shared/CsText";
import { typography } from "@/src/constants/fonts/typography";
import ProductDetailCarousel from "@/src/modules/products/components/ProductDetailCarousel";
import { View } from "react-native";

export default function ProductHeader({ product }: any) {
  return (
    <>
      <ProductDetailCarousel
        photos={product.images?.map((i: any) => i.url) ?? []}
      />

      <View className="px-4 mt-6">
        <CsText style={typography.Poppins_l_semibold}>{product.name}</CsText>

        {product.brand && (
          <CsText className="text-secondary mt-1">
            Brand:{" "}
            <CsText className="text-primary">{product.brand.name}</CsText>
          </CsText>
        )}

        {product.categories?.length > 0 && (
          <CsText className="text-secondary mt-1">
            Categories: {product.categories.map((c: any) => c.name).join(", ")}
          </CsText>
        )}
      </View>
    </>
  );
}
