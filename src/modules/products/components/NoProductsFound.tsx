import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { PackageSearch } from "lucide-react-native";
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
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: cardTokens.mutedSurface,
          marginBottom: 6,
        }}
      >
        <PackageSearch size={30} color={cardTokens.inkMuted} strokeWidth={1.6} />
      </View>

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
