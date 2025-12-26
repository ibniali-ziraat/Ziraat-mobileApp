import { Sun } from "lucide-react-native";
import { View } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  value: number;
};

const getUVInfo = (uv: number) => {
  if (uv <= 2) return { level: "Low", advice: "No protection needed." };
  if (uv <= 5)
    return { level: "Moderate", advice: "Wear sunglasses and sunscreen." };
  if (uv <= 7)
    return { level: "High", advice: "Use sun protection until evening." };
  if (uv <= 10)
    return { level: "Very High", advice: "Limit sun exposure midday." };
  return { level: "Extreme", advice: "Avoid outdoor activities." };
};

export default function UVCard({ value }: Props) {
  const BAR_WIDTH = 150;
  const markerX = Math.min(Math.max((value / 11) * BAR_WIDTH, 0), BAR_WIDTH);

  const { level, advice } = getUVInfo(value);

  return (
    <ZiraatCard
      width="48%"
      marginVertical={1}
      paddingHorizontal={1}
      paddingVertical={1}
    >
      <View className="w-full ">
        <View className="flex-row items-center">
          <Sun size={18} color="#c7611f" />
          <CsText className="ml-1 text-md font-semibold text-dark">
            UV INDEX
          </CsText>
        </View>

        <CsText className="mt-1 text-3xl font-bold text-dark">{value}</CsText>

        <CsText className="text-md text-dark">{level}</CsText>

        <Svg
          width={BAR_WIDTH}
          height={14}
          style={{
            marginVertical: 10,
          }}
        >
          <Line x1="0" y1="7" x2="30" y2="7" stroke="#22C55E" strokeWidth="4" />
          <Line
            x1="30"
            y1="7"
            x2="60"
            y2="7"
            stroke="#FACC15"
            strokeWidth="4"
          />
          <Line
            x1="60"
            y1="7"
            x2="90"
            y2="7"
            stroke="#F97316"
            strokeWidth="4"
          />
          <Line
            x1="90"
            y1="7"
            x2="120"
            y2="7"
            stroke="#EF4444"
            strokeWidth="4"
          />
          <Line
            x1="120"
            y1="7"
            x2="150"
            y2="7"
            stroke="#A855F7"
            strokeWidth="4"
          />

          <Circle cx={markerX} cy={7} r={4} fill="#c7611f" />
        </Svg>

        <CsText className="text-sm leading-5 text-dark">{advice}</CsText>
      </View>
    </ZiraatCard>
  );
}
