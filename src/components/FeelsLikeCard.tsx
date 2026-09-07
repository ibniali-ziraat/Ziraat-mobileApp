import { Thermometer } from "lucide-react-native";
import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { cardShadow, cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "../constants/fonts/typography";

type Props = {
  temp: number;
  actualTemp?: number;
};

export default function FeelsLikeCard({ temp, actualTemp }: Props) {
  const diff = actualTemp !== undefined ? temp - actualTemp : 0;

  const getMessage = () => {
    if (diff >= 3) return "Feels hotter due to humidity.";
    if (diff <= -3) return "Feels colder because of wind.";
    return "Similar to the actual temperature.";
  };

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
        <Thermometer size={18} color={colors.secondary} />
        <Text
          style={[typography.Poppins_m_medium, { marginLeft: 8, color: cardTokens.inkPrimary }]}
        >
          Feels Like
        </Text>
      </View>

      {/* Temperature */}
      <Text
        style={[typography.Poppins_l_medium, { marginTop: 4, color: cardTokens.inkPrimary }]}
      >
        {temp}°
      </Text>

      {/* Message */}
      <Text
        style={[typography.Poppins_xs_regular, { marginTop: 4, color: cardTokens.inkMuted }]}
      >
        {getMessage()}
      </Text>
    </View>
  );
}