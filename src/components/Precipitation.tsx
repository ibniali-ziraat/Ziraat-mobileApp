import { Droplets } from "lucide-react-native";
import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { cardShadow, cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "../constants/fonts/typography";

type Props = {
  amount?: number;
  probability?: number;
};

export function Precipitation({
  amount = 0,
  probability = 0,
}: Props) {
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
        <Droplets size={18} color={colors.secondary} />
        <Text
          style={[typography.Poppins_m_medium, { marginLeft: 8, color: cardTokens.inkPrimary }]}
        >
          Precipitation
        </Text>
      </View>

      {/* Amount */}
      <Text
        style={[typography.Poppins_l_medium, { color: cardTokens.inkPrimary }]}
      >
        {amount} mm
      </Text>

      {/* Status */}
      <Text
        style={[typography.Poppins_xs_medium, { color: cardTokens.inkSecondary }]}
      >
        {amount > 0 ? "Rain recorded today." : "No rain in 24h."}
      </Text>

      {/* Probability */}
      <Text
        style={[typography.Poppins_xs_medium, { color: cardTokens.inkMuted }]}
      >
        {probability}% chance today.
      </Text>
    </View>
  );
}