import { Droplets } from "lucide-react-native";
import { Text, View } from "react-native";
import { cardShadow, cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "../constants/fonts/typography";

type Props = {
  value: number;
};

export default function HumidityCard({ value }: Props) {
  const getNote = (val: number) => {
    if (val >= 70) return "The air is quite humid and heavy right now.";
    if (val <= 30) return "The air is very dry and crisp.";
    return "The humidity level is currently comfortable.";
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
          height: 180,
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: cardTokens.border,
        },
        cardShadow,
      ]}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Droplets size={18} color="#c7611f" />
          <Text
            style={[typography.Poppins_m_medium, { marginLeft: 8, color: cardTokens.inkPrimary }]}
          >
            HUMIDITY
          </Text>
        </View>

        <Text style={[typography.Poppins_s_regular, { color: cardTokens.inkSecondary }]}>
          {Math.round(value)}%
        </Text>
      </View>

      {/* Big Value */}
      <Text
        style={[typography.Poppins_xl_semibold, { color: cardTokens.inkPrimary }]}
      >
        {Math.round(value)}%
      </Text>

      {/* Note */}
      <Text
        style={[typography.Poppins_xs_regular, { color: cardTokens.inkMuted, marginTop: 4 }]}
      >
        {getNote(value)}
      </Text>
    </View>
  );
}