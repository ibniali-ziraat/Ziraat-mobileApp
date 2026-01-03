import { Gauge } from "lucide-react-native";
import { View } from "react-native";
import Svg, { Circle, G, Line, Path } from "react-native-svg";
import { typography } from "../constants/fonts/typography";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

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
    <ZiraatCard
      width="48%"
      paddingHorizontal={1}
      paddingVertical={1}
      className="border border-light"
    >
      <View className="flex-row items-center justify-between px-3 mt-1">
        <View className="flex-row items-center">
          <Gauge size={18} color="#c7611f" />
          <CsText style={typography.Poppins_m_medium} className="ml-2 text-dark">
            PRESSURE
          </CsText>
        </View>
      </View>

      <View className="items-center justify-center -mt-2 mb-1">
        <Svg width={SIZE} height={SIZE / 1.6}>

          <Path
            d={`M ${CENTER - RADIUS} ${CENTER} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER + RADIUS} ${CENTER}`}
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

          <Circle cx={CENTER} cy={CENTER} r={5} fill="#c7611f" />
        </Svg>

        {/* Labels */}
        <View
          style={{ width: RADIUS * 2 + 20 }}
          className="flex-row justify-between -mt-2"
        >
          <CsText style={typography.Poppins_xs_regular} className=" text-dark">
            Low
          </CsText>
          <CsText style={typography.Poppins_xs_regular} className=" text-dark">
            High
          </CsText>
        </View>
        <View className="pt-2">

          <CsText style={typography.Poppins_s_regular} className=" text-dark">
            {Math.round(value)}
            <CsText style={typography.Poppins_s_regular} className=" text-dark">
              {" "}
              hPa
            </CsText>
          </CsText>
        </View>
      </View>
    </ZiraatCard>
  );
}
