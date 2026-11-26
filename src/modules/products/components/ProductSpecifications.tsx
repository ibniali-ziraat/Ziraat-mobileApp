import HtmlContent from "@/src/components/shared/HtmlContent";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { pageArt } from "@/src/constants/iconArt";
import { Text, View } from "react-native";
import DetailSection from "./DetailSection";

/** Free-text spec first, then attributes as an aligned two-column table. */
export default function ProductSpecifications({ product }: any) {
  const attributes: { name: string; value: string }[] =
    product.attributes ?? [];
  if (!product.specification && !attributes.length) return null;

  return (
    <DetailSection title="Specifications" art={pageArt.conditions}>
      {product.specification ? (
        <View style={{ marginBottom: attributes.length ? 10 : 0 }}>
          <HtmlContent html={product.specification} />
        </View>
      ) : null}

      {attributes.length ? (
        <View
          style={{
            borderRadius: 16,
            overflow: "hidden",
            backgroundColor: cardTokens.mutedSurface,
          }}
        >
          {attributes.map((attr, i) => (
            <View
              key={`${attr.name}-${i}`}
              style={{
                flexDirection: "row",
                paddingHorizontal: 14,
                paddingVertical: 11,
                borderTopWidth: i === 0 ? 0 : 1,
                borderTopColor: "#FFFFFF",
              }}
            >
              <Text
                style={[
                  typography.Poppins_xs_regular,
                  { flex: 1, color: cardTokens.inkMuted, fontSize: 12.5 },
                ]}
              >
                {attr.name}
              </Text>
              <Text
                style={[
                  typography.Poppins_xs_semibold,
                  {
                    flex: 1.3,
                    color: cardTokens.inkPrimary,
                    fontSize: 12.5,
                    textAlign: "right",
                  },
                ]}
              >
                {attr.value}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
    </DetailSection>
  );
}
