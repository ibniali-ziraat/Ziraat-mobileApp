import { Wind } from "lucide-react-native";
import { Text, View } from "react-native";
import { cardShadow, cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "../constants/fonts/typography";
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

        {/* Left Section */}
        <View style={{ width: 140 }}>
          {/* Header */}
          <View style={{ flexDirection: "row", paddingBottom: 10 }}>
            <Wind size={18} color="#c7611f" />
            <Text
              style={[typography.Poppins_m_medium, { marginLeft: 8, color: cardTokens.inkPrimary }]}
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
            style={[typography.Poppins_m_regular, { color: cardTokens.inkSecondary }]}
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
      <Text style={[typography.Poppins_s_regular, { color: cardTokens.inkSecondary }]}>
        {label} -
      </Text>
      <Text style={[typography.Poppins_xs_regular, { color: cardTokens.inkPrimary }]}>
        {value}
      </Text>
    </View>
  );
}