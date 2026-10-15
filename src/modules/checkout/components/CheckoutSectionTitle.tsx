import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

/** Badge + title used by every checkout card, so their headings line up. */
export default function CheckoutSectionTitle({
  title,
  art,
}: {
  title: string;
  /** Full-colour icon from `@/src/constants/iconArt`. */
  art: string;
}) {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 14 }}
    >
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 11,
          marginRight: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: cardTokens.mutedSurface,
        }}
      >
        <SvgXml xml={art} width={22} height={22} />
      </View>
      <Text
        style={[
          typography.Poppins_s_bold,
          { color: cardTokens.inkPrimary, fontSize: 17 },
        ]}
      >
        {title}
      </Text>
    </View>
  );
}
