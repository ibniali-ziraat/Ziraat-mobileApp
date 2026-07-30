import { Eye } from "lucide-react-native";
import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { cardShadow, cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "../constants/fonts/typography";

type Props = {
  distance: number;
};

export default function VisibilityCard({ distance }: Props) {
  const km = (distance / 1000).toFixed(0);

  const getNote = (d: number) => {
    if (d >= 10000) return "Perfectly clear view.";
    if (d >= 5000) return "Light haze present.";
    if (d >= 2000) return "Moderate fog/haze.";
    return "Very low visibility. Be careful!";
  };

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
        <Eye size={18} color={colors.secondary} />
        <Text
          style={[typography.Poppins_m_medium, { marginLeft: 8, color: cardTokens.inkPrimary }]}
        >
          VISIBILITY
        </Text>
      </View>

      {/* Value */}
      <Text
        style={[typography.Poppins_l_medium, { color: cardTokens.inkPrimary }]}
      >
        {km} km
      </Text>

      {/* Note */}
      <Text
        style={[typography.Poppins_xs_regular, { color: cardTokens.inkMuted, marginTop: 4 }]}
      >
        {getNote(distance)}
      </Text>
    </View>
  );
}