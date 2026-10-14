import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { productArt } from "@/src/constants/iconArt";
import { SvgXml } from "react-native-svg";
import { View } from "react-native";
import CsText from "@/src/components/shared/CsText";

export default function NoProductsFound() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 80,
        gap: 4,
      }}
    >
      <SvgXml
        xml={productArt.empty}
        width={124}
        height={124}
        style={{ marginBottom: 8 }}
      />

      <CsText
        style={[typography.Poppins_s_semibold, { color: cardTokens.inkPrimary }]}
      >
        No products found
      </CsText>

      <CsText
        style={[
          typography.Poppins_xs_regular,
          {
            color: cardTokens.inkMuted,
            textAlign: "center",
            paddingHorizontal: 32,
            marginTop: 2,
          },
        ]}
      >
        Try adjusting your filters or search terms
      </CsText>
    </View>
  );
}
