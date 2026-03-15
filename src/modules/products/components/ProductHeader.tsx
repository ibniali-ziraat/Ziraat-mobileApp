import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import ProductDetailCarousel from "@/src/modules/products/components/ProductDetailCarousel";
import { Text, View } from "react-native";

export default function ProductHeader({ product }: any) {
  return (
    <>
      <ProductDetailCarousel
        photos={product.images?.map((i: any) => i.url) ?? []}
      />

      <View
        className="p-5 mt-4 rounded-2xl"
        style={{
          backgroundColor: colors.light,
          shadowColor: colors.dark,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
          marginHorizontal: 1,
        }}
      >
        {/* Product Name */}
        <Text
          style={[
            typography.Poppins_s_semibold,
            { fontSize: 19, lineHeight: 30 },
          ]}
        >
          {product.name}
        </Text>

        {/* Accent line
        <View
          className="mt-2 mb-3 w-10 h-[3px] rounded-full"
          style={{ backgroundColor: colors.primary }}
        /> */}

        {/* Brand */}
        {product.brand && (
          <View className="flex-row justify-between items-center">
            <Text
              style={{ color: colors.dark }}
              className=" text-xs uppercase tracking-wider"
            >
              Brand:
            </Text>

            <Text style={{ color: colors.primary }}>{product.brand.name}</Text>
          </View>
        )}

        {/* Soft Divider */}
        <View
          className="my-4"
          style={{ height: 1, backgroundColor: "#ECECEC" }}
        />

        {/* Categories */}
        {product.categories?.length > 0 && (
          <Text style={{ color: colors.dark }} className=" text-sm leading-5">
            {product.categories.map((c: any) => c.name).join(" • ")}
          </Text>
        )}
      </View>
    </>
  );
}
