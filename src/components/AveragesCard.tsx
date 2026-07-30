import { GitGraph } from "lucide-react-native";
import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { cardShadow, cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "../constants/fonts/typography";

type Props = {
  currentMax?: number;
  averageMax?: number;
};

export default function AveragesCard({
  currentMax = 0,
  averageMax = 10,
}: Props) {
  const diff = currentMax - averageMax;
  const safeDiff = isNaN(diff) ? 0 : diff;

  const status = safeDiff > 0 ? "Above" : "Below";
  const diffColor = safeDiff > 0 ? colors.primary : colors.error;

  return (
    <View
      style={[
        {
          width: "100%",
          marginVertical: 8,
          paddingHorizontal: 14,
          paddingVertical: 14,
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
        <GitGraph size={18} color={colors.secondary} />
        <Text
          style={[
            typography.Poppins_m_medium,
            { marginLeft: 8, color: cardTokens.inkPrimary, textTransform: "uppercase" },
          ]}
        >
          Averages
        </Text>
      </View>

      {/* Difference */}
      <Text
        style={[
          typography.Poppins_l_medium,
          { color: diffColor },
        ]}
      >
        {safeDiff > 0 ? `+${safeDiff}` : `${safeDiff}`}°
      </Text>

      {/* Status */}
      <Text
        style={[typography.Poppins_xs_regular, { color: cardTokens.inkMuted }]}
      >
        {status} average daily high.
      </Text>

      {/* Extra Info */}
      <Text
        style={[typography.Poppins_xs_regular, { color: cardTokens.inkMuted }]}
      >
        Today: {currentMax ?? 0}° | Avg: {averageMax ?? 0}°
      </Text>
    </View>
  );
}