import { Sun } from "lucide-react-native";
import { Text, View } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";
import { cardShadow, cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "../constants/fonts/typography";

type Props = {
  value: number;
};

const getUVInfo = (uv: number) => {
  if (uv <= 2) return { level: "Low", advice: "No protection needed." };
  if (uv <= 5)
    return { level: "Moderate", advice: "Wear sunglasses and sunscreen." };
  if (uv <= 7)
    return { level: "High", advice: "Use sun protection until evening." };
  if (uv <= 10)
    return { level: "Very High", advice: "Limit sun exposure midday." };
  return { level: "Extreme", advice: "Avoid outdoor activities." };
};

export default function UVCard({ value }: Props) {
  const BAR_WIDTH = 150;
  const markerX = Math.min(Math.max((value / 11) * BAR_WIDTH, 0), BAR_WIDTH);

  const { level, advice } = getUVInfo(value);

  return (
    <View
      style={[
        {
          width: "100%",
          marginVertical: 8,
          paddingHorizontal: 12,
          paddingVertical: 12,
          backgroundColor: cardTokens.surface,
          borderRadius: cardTokens.radius,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: cardTokens.border,
          height: 160,
          justifyContent: "space-between",
        },
        cardShadow,
      ]}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Sun size={18} color="#c7611f" />
        <Text
          style={[typography.Poppins_m_medium, { marginLeft: 8, color: cardTokens.inkPrimary }]}
        >
          UV INDEX
        </Text>
      </View>

      {/* Value + Level */}
      <View>
        <Text
          style={[typography.Poppins_l_medium, { marginTop: 4, color: cardTokens.inkPrimary }]}
        >
          {value}
        </Text>

        <Text
          style={[typography.Poppins_m_regular, { color: cardTokens.inkSecondary }]}
        >
          {level}
        </Text>
      </View>

      {/* UV Bar */}
      <Svg width={BAR_WIDTH} height={14} style={{ marginVertical: 6 }}>
        <Line x1="0" y1="7" x2="30" y2="7" stroke="#22C55E" strokeWidth="4" />
        <Line x1="30" y1="7" x2="60" y2="7" stroke="#FACC15" strokeWidth="4" />
        <Line x1="60" y1="7" x2="90" y2="7" stroke="#F97316" strokeWidth="4" />
        <Line x1="90" y1="7" x2="120" y2="7" stroke="#EF4444" strokeWidth="4" />
        <Line x1="120" y1="7" x2="150" y2="7" stroke="#A855F7" strokeWidth="4" />

        <Circle cx={markerX} cy={7} r={5} fill="#c7611f" />
      </Svg>

      {/* Advice */}
      <Text
        style={[typography.Poppins_xs_regular, { color: cardTokens.inkMuted, lineHeight: 22 }]}
      >
        {advice}
      </Text>
    </View>
  );
}