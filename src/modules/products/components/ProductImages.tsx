import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { getCategoryArt } from "@/src/constants/iconArt";
import ProductDetailCarousel from "@/src/modules/products/components/ProductDetailCarousel";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

/** Photos, then name, brand and category chips — no card, no shadow. */
export default function ProductImages({ product }: any) {
  const categories: { name: string }[] = product.categories ?? [];

  return (
    <>
      <ProductDetailCarousel
        photos={product.images?.map((i: any) => i.url) ?? []}
      />

      <View style={{ marginTop: 18 }}>
        {product.brand?.name ? (
          <Text
            style={[
              typography.Poppins_xs_semibold,
              {
                color: chartTokens.current,
                fontSize: 11.5,
                letterSpacing: 0.6,
                textTransform: "uppercase",
              },
            ]}
          >
            {product.brand.name}
          </Text>
        ) : null}

        <Text
          style={[
            typography.Poppins_s_semibold,
            {
              color: cardTokens.inkPrimary,
              fontSize: 20,
              lineHeight: 28,
              marginTop: 2,
            },
          ]}
        >
          {product.name}
        </Text>

        {categories.length > 0 ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 10,
            }}
          >
            {categories.map((category) => (
              <View
                key={category.name}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 4,
                  paddingRight: 10,
                  paddingVertical: 4,
                  borderRadius: 999,
                  backgroundColor: chartTokens.tint,
                }}
              >
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    marginRight: 6,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <SvgXml
                    xml={getCategoryArt(category.name)}
                    width={15}
                    height={15}
                  />
                </View>
                <Text
                  style={[
                    typography.Poppins_xs_semibold,
                    { color: chartTokens.current, fontSize: 11.5 },
                  ]}
                >
                  {category.name}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </>
  );
}
