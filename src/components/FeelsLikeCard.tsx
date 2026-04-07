import { Thermometer } from "lucide-react-native";
import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/fonts/typography";
import { shadows } from "../constants/shadows";

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
          width: "95%",
          marginVertical: 8,
          paddingHorizontal: 12,
          paddingVertical: 12,
          backgroundColor: "#fff",
          borderRadius: 16,
          height: 160, 
          justifyContent: "space-between",
        },
        shadows.profile_card, 
      ]}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Thermometer size={18} color={colors.secondary} />
        <Text
          style={[typography.Poppins_m_medium, { marginLeft: 8, color: "#000" }]}
        >
          Feels Like
        </Text>
      </View>

      {/* Temperature */}
      <Text
        style={[typography.Poppins_l_medium, { marginTop: 4, color: "#000" }]}
      >
        {temp}°
      </Text>

      {/* Message */}
      <Text
        style={[typography.Poppins_xs_regular, { marginTop: 4, color: "#000" }]}
      >
        {getMessage()}
      </Text>
    </View>
  );
}