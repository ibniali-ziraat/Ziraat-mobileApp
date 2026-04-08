import { Droplets } from "lucide-react-native";
import { Text, View } from "react-native";
import { typography } from "../constants/fonts/typography";
import { shadows } from "../constants/shadows";

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
          width: "98%",
          marginVertical: 8,
          paddingHorizontal: 14,
          paddingVertical: 14,
          backgroundColor: "#fff",
          borderRadius: 16,
          height: 180, 
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.05)",
        },
        shadows.profile_card,
      ]}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Droplets size={18} color="#c7611f" />
          <Text
            style={[typography.Poppins_m_medium, { marginLeft: 8, color: "#000" }]}
          >
            HUMIDITY
          </Text>
        </View>

        <Text style={[typography.Poppins_s_regular, { color: "#000" }]}>
          {Math.round(value)}%
        </Text>
      </View>

      {/* Big Value */}
      <Text
        style={[typography.Poppins_xl_semibold, { color: "#000" }]}
      >
        {Math.round(value)}%
      </Text>

      {/* Note */}
      <Text
        style={[typography.Poppins_xs_regular, { color: "#000", marginTop: 4 }]}
      >
        {getNote(value)}
      </Text>
    </View>
  );
}