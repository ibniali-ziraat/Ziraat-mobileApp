import { Eye } from "lucide-react-native";
import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/fonts/typography";
import { shadows } from "../constants/shadows";

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
        <Eye size={18} color={colors.secondary} />
        <Text
          style={[typography.Poppins_m_medium, { marginLeft: 8, color: "#000" }]}
        >
          VISIBILITY
        </Text>
      </View>

      {/* Value */}
      <Text
        style={[typography.Poppins_l_medium, { color: "#000" }]}
      >
        {km} km
      </Text>

      {/* Note */}
      <Text
        style={[typography.Poppins_xs_regular, { color: "#000", marginTop: 4 }]}
      >
        {getNote(distance)}
      </Text>
    </View>
  );
}