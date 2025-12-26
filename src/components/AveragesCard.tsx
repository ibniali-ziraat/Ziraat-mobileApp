import { GitGraph } from "lucide-react-native";
import { View } from "react-native";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  currentMax?: number;
  averageMax?: number; // You can pass a static average like 10 for winter
};

export default function AveragesCard({
  currentMax = 0,
  averageMax = 10,
}: Props) {
  const diff = currentMax - averageMax;
  const status = diff > 0 ? "Above" : "Below";

  return (
    <ZiraatCard width="48%" paddingHorizontal={1.4} paddingVertical={1.4}>
      <View className="flex-row items-center mb-1">
        <GitGraph size={16} color="#c7611f" />
        <CsText className="ml-2 text-xs font-bold tracking-wide text-dark uppercase">
          Averages
        </CsText>
      </View>

      <CsText className="text-3xl font-bold text-dark">
        {diff > 0 ? `+${diff}` : diff}°
      </CsText>

      <CsText className="text-[11px] text-dark pt-2">
        {status} average daily high.
      </CsText>

      <CsText className="text-[10px] text-neutral-500 mt-1">
        Today: {currentMax}° | Avg: {averageMax}°
      </CsText>
    </ZiraatCard>
  );
}
