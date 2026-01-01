import { GitGraph } from "lucide-react-native";
import { View } from "react-native";
import { typography } from "../constants/fonts/typography";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  currentMax?: number;
  averageMax?: number; // e.g. seasonal average
};

export default function AveragesCard({
  currentMax = 0,
  averageMax = 10,
}: Props) {
  const diff = currentMax - averageMax;
  const status = diff > 0 ? "Above" : "Below";
  const diffColor = diff > 0 ? "#16a34a" : "#dc2626"; // green / red

  return (
    <ZiraatCard width="48%" paddingHorizontal={1.4} paddingVertical={1.4}>
      <View className="flex justify-center">
        {/* Header */}
        <View className="flex-row items-center mb-1">
          <GitGraph size={18} color="#c7611f" />
          <CsText
            className="ml-2 text-sm font-bold tracking-wide uppercase"
            style={typography.caption_xs_bold}
          >
            Averages
          </CsText>
        </View>

        {/* Value */}
        <CsText className="text-3xl font-bold" style={{ color: diffColor }}>
          {diff > 0 ? `+${diff}` : diff}°
        </CsText>

        {/* Status */}
        <CsText className="text-[11px] text-dark pt-2">
          {status} average daily high.
        </CsText>

        {/* Meta */}
        <CsText className="text-[10px] text-dark mt-1">
          Today: {currentMax}° | Avg: {averageMax}°
        </CsText>
      </View>
    </ZiraatCard>
  );
}
