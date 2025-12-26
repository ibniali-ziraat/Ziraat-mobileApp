import { Gauge } from "lucide-react-native";
import { View } from "react-native";
import Svg, { Circle, G, Line, Path } from "react-native-svg";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  value: number; // This is sealevelpressure from your data
};

export default function PressureCard({ value }: Props) {
  const SIZE = 150;
  const CENTER = SIZE / 2;
  const RADIUS = 55;

  // Mapping 980hPa (Low) to 1040hPa (High)
  const angle = Math.min(
    Math.max(((value - 980) / (1040 - 980)) * 180 - 90, -90),
    90
  );

  return (
    <ZiraatCard
      width="48%"
      paddingHorizontal={1}
      paddingVertical={1}
      className="border border-white"
    >
      {/* Header with Title and Dynamic Value in Right Corner */}
      <View className="flex-row items-center justify-between px-3 mt-1">
        <View className="flex-row items-center">
          <Gauge size={16} color="#c7611f" />
          <CsText className="ml-1 text-[13px] font-semibold tracking-wide text-dark">
            PRESSURE
          </CsText>
        </View>
      </View>

      {/* Main Gauge Area */}
      <View className="items-center justify-center -mt-2 mb-1">
        <Svg width={SIZE} height={SIZE / 1.6}>
          {/* Black Dotted Scale */}
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
          <CsText className="text-[9px] font-medium text-neutral-500">
            Low
          </CsText>
          <CsText className="text-[9px] font-medium text-neutral-500">
            High
          </CsText>
        </View>
        <View className="pt-2">
          {/* Dynamic Value in the Right Corner */}
          <CsText className="text-[2px]  text-neutral-500 ">
            {Math.round(value)}
            <CsText className="text-[2px] font-normal text-neutral-500">
              {" "}
              hPa
            </CsText>
          </CsText>
        </View>
      </View>
    </ZiraatCard>
  );
}
