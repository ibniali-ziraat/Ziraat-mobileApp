import * as Icons from "lucide-react-native";
import { Text, View } from "react-native";


import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import StatChip from "./StatChip";

export default function OrchardStatsSection({ orchards, admin, weather }: any) {
  const Tree = Icons.Trees;
  const Calendar = Icons.Calendar;
  const Layers = Icons.Layers;
  const Percent = Icons.Percent;

  const totalArea = orchards.reduce(
    (sum: number, o: any) => sum + (Number(o.area_ha) || 0),
    0
  );

  const totalTrees = orchards.reduce(
    (sum: number, o: any) =>
      sum + (Number(o.plantDensity) || 0) * (Number(o.area_ha) || 0),
    0
  );

  const survivalRatePercent = admin?.survivalRatePercent ?? 90;
  const avgTreeAgeYears = admin?.avgTreeAgeYears ?? 4;

  return (
    <View>
      {/* Stats Row */}
      <View className="flex-row flex-wrap justify-between">
        <StatChip
          Icon={Tree}
          title="Total Area"
          value={`${totalArea.toFixed(2)} ha`}
        />
        <StatChip
          Icon={Layers}
          title="Tree Count"
          value={totalTrees.toLocaleString()}
        />
        <StatChip
          Icon={Percent}
          title="Survival Rate"
          value={`${survivalRatePercent}%`}
        />
        <StatChip
          Icon={Calendar}
          title="Avg Tree Age"
          value={`${avgTreeAgeYears} yrs`}
        />
      </View>

      {/* Smart Insight Card */}
      <ZiraatCard
        width="100%"
        height="26%"
        paddingHorizontal={1}
        paddingVertical={1}
      
      >
        <Text className="text-[18px] font-bold my-2">
          📈 Smart Insight
        </Text>

        <Text className="text-[14px] my-2 ">
          Tree density and survival suggest potential to increase yield by improving fertigation.
        </Text>
      </ZiraatCard>
    </View>
  );
}
