import { Wind } from "lucide-react-native";
import { Text, View } from "react-native";
import { typography } from "../constants/fonts/typography";
import { shadows } from "../constants/shadows";
import WindCompass from "./WindCompass";

type Props = {
  speed: number;
  gusts: number;
  degree: number;
  direction: string;
};

export default function WindCard({ speed, gusts, degree, direction }: Props) {
  return (
    <View
      style={[
        {
          width: "100%",
          marginVertical: 8,
          paddingHorizontal: 12,
          paddingVertical: 12,
          backgroundColor: "#fff",
          borderRadius: 16,
          height: 160, // 👈 fixed height
          justifyContent: "space-between",
        },
        shadows.profile_card, // 👈 shadow applied
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        
        {/* Left Section */}
        <View style={{ width: 140 }}>
          {/* Header */}
          <View style={{ flexDirection: "row", paddingBottom: 10 }}>
            <Wind size={18} color="#c7611f" />
            <Text
              style={[typography.Poppins_m_medium, { marginLeft: 8, color: "#000" }]}
            >
              WIND
            </Text>
          </View>

          {/* Data */}
          <View>
            <Row label="Wind" value={`${speed} kph`} />
            <Row label="Gusts" value={`${gusts} kph`} />
            <Row label="Direction" value={`${degree}° ${direction}`} />
          </View>
        </View>

        {/* Right Section */}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View style={{ paddingBottom: 6 }}>
            <WindCompass speed={speed} degree={degree} />
          </View>

          <Text
            style={[typography.Poppins_m_regular, { color: "#000" }]}
          >
            {direction}
          </Text>
        </View>
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
      }}
    >
      <Text style={[typography.Poppins_s_regular, { color: "#000" }]}>
        {label} -
      </Text>
      <Text style={[typography.Poppins_xs_regular, { color: "#000" }]}>
        {value}
      </Text>
    </View>
  );
}