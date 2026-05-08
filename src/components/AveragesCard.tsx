import { GitGraph } from "lucide-react-native";
import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/fonts/typography";
import { shadows } from "../constants/shadows";

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
          width: "98%",
          marginVertical: 8,
          paddingHorizontal: 14,
          paddingVertical: 14,
          backgroundColor: "#fff",
          borderRadius: 16,
          height: 160, 
          justifyContent: "space-between",
        },
        shadows.profile_card, // 👈 shadow applied
      ]}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <GitGraph size={18} color={colors.secondary} />
        <Text
          style={[
            typography.Poppins_m_medium,
            { marginLeft: 8, color: "#000", textTransform: "uppercase" },
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
        style={[typography.Poppins_xs_regular, { color: "#000" }]}
      >
        {status} average daily high.
      </Text>

      {/* Extra Info */}
      <Text
        style={[typography.Poppins_xs_regular, { color: "#000" }]}
      >
        Today: {currentMax ?? 0}° | Avg: {averageMax ?? 0}°
      </Text>
    </View>
  );
}