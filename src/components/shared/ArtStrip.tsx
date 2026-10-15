import { typography } from "@/src/constants/fonts/typography";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

type ArtStripProps = {
  /** Full-colour icon from `@/src/constants/iconArt`. */
  art: string;
  /** Pastel wash behind the strip. */
  tint: string;
  title: string;
  subtitle?: string;
};

/** Slim pastel summary row: icon in a white disc, a line of text beside it. */
export default function ArtStrip({
  art,
  tint,
  title,
  subtitle,
}: ArtStripProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 18,
        backgroundColor: tint,
      }}
    >
      <View
        style={{
          width: 46,
          height: 46,
          borderRadius: 23,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <SvgXml xml={art} width={28} height={28} />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text
          numberOfLines={1}
          style={[
            typography.Poppins_s_semibold,
            { color: cardTokens.inkPrimary, fontSize: 14.5 },
          ]}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            numberOfLines={2}
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkSecondary, fontSize: 11.5, marginTop: 1 },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
