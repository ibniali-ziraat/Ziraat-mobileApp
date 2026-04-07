import { Gauge } from "lucide-react-native";
import { Text, View } from "react-native";
import Svg, { Circle, G, Line, Path } from "react-native-svg";
import { typography } from "../constants/fonts/typography";
import { shadows } from "../constants/shadows";

type Props = {
  value: number;
};

export default function PressureCard({ value }: Props) {
  const SIZE = 150;
  const CENTER = SIZE / 2;
  const RADIUS = 55;

  const angle = Math.min(
    Math.max(((value - 980) / (1040 - 980)) * 180 - 90, -90),
    90
  );

  return (
    <View
      style={[
        {
          width: "98%",
          marginVertical: 8,
          paddingHorizontal: 12,
          paddingVertical: 12,
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Gauge size={18} color="#c7611f" />
        <Text
          style={[typography.Poppins_m_medium, { marginLeft: 8, color: "#000" }]}
        >
          PRESSURE
        </Text>
      </View>

      {/* Gauge */}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Svg width={SIZE} height={SIZE / 1.6}>
          {/* Arc */}
          <Path
            d={`M ${CENTER - RADIUS} ${CENTER} A ${RADIUS} ${RADIUS} 0 0 1 ${
              CENTER + RADIUS
            } ${CENTER}`}
            stroke="#000000"
            strokeWidth={4}
            fill="none"
            strokeDasharray="3 5"
          />

          {/* Needle */}
          <G rotation={angle} origin={`${CENTER}, ${CENTER}`}>
            <Line
              x1={CENTER}
              y1={CENTER}
              x2={CENTER}
              y2={CENTER - 50}
              stroke="#c7611f"
              strokeWidth={3}
              strokeLinecap="round"
            />
          </G>

          {/* Center Dot */}
          <Circle cx={CENTER} cy={CENTER} r={5} fill="#c7611f" />
        </Svg>

        {/* Labels */}
        <View
          style={{
            width: RADIUS * 2 + 20,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: -6,
          }}
        >
          <Text style={[typography.Poppins_xs_regular, { color: "#000" }]}>
            Low
          </Text>
          <Text style={[typography.Poppins_xs_regular, { color: "#000" }]}>
            High
          </Text>
        </View>

        {/* Value */}
        <Text
          style={[
            typography.Poppins_s_regular,
            { color: "#000", marginTop: 6 },
          ]}
        >
          {Math.round(value)} hPa
        </Text>
      </View>
    </View>
  );
}