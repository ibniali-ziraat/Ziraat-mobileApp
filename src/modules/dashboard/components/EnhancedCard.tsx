import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";

type Props = {
  title: string;
  value?: string;
  accent?: string;
  /** Full-colour icon from `getDashboardIcon`. */
  art: string;
  /** Pastel wash behind the tile. */
  tint: string;
};

/** One metric on a pastel tile, its icon in a white disc. */
export default function EnhancedCard({
  title,
  value,
  accent,
  art,
  tint,
}: Props) {
  return (
    <View
      style={{
        width: "100%",
        minHeight: 138,
        borderRadius: 18,
        padding: 12,
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

      <CsText
        numberOfLines={2}
        style={[
          typography.Poppins_s_medium,
          { fontSize: 14.5, lineHeight: 21, color: colors.dark, marginTop: 10 },
        ]}
      >
        {title}
      </CsText>

      {value ? (
        <CsText
          numberOfLines={1}
          style={[
            typography.Poppins_m_semibold,
            { fontSize: 18, color: colors.primary, marginTop: 4 },
          ]}
        >
          {value}
        </CsText>
      ) : null}

      {accent ? (
        <CsText style={{ fontSize: 14, marginTop: 2, color: colors.dark }}>
          {accent}
        </CsText>
      ) : null}
    </View>
  );
}
