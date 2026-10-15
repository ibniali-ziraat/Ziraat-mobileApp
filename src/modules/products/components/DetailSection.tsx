import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

type Props = {
  title: string;
  /** Full-colour icon from `@/src/constants/iconArt`. */
  art: string;
  children: ReactNode;
};

/**
 * One block of the product page: badge + title, then content. Every block
 * shares this spacing, so the page reads as one aligned column.
 */
export default function DetailSection({ title, art, children }: Props) {
  return (
    <View style={{ marginTop: 24 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            marginRight: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: cardTokens.mutedSurface,
          }}
        >
          <SvgXml xml={art} width={20} height={20} />
        </View>
        <Text
          style={[
            typography.Poppins_m_semibold,
            { color: cardTokens.inkPrimary, fontSize: 16 },
          ]}
        >
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}
