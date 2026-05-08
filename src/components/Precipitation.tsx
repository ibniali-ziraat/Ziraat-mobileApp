import { Droplets } from "lucide-react-native";
import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/fonts/typography";
import { shadows } from "../constants/shadows";

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
          width: "99%",
          marginVertical: 8,
          paddingHorizontal: 14,
          paddingVertical: 14,
          backgroundColor: "#fff",
          borderRadius: 16,
          height: 160, // 👈 small card size
          justifyContent: "space-between",
        },
        shadows.profile_card, // 👈 shadow applied
      ]}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Droplets size={18} color={colors.secondary} />
        <Text
          style={[typography.Poppins_m_medium, { marginLeft: 8, color: "#000" }]}
        >
          Precipitation
        </Text>
      </View>

      {/* Amount */}
      <Text
        style={[typography.Poppins_l_medium, { color: "#000" }]}
      >
        {amount} mm
      </Text>

      {/* Status */}
      <Text
        style={[typography.Poppins_xs_medium, { color: "#000" }]}
      >
        {amount > 0 ? "Rain recorded today." : "No rain in 24h."}
      </Text>

      {/* Probability */}
      <Text
        style={[typography.Poppins_xs_medium, { color: "#000" }]}
      >
        {probability}% chance today.
      </Text>
    </View>
  );
}