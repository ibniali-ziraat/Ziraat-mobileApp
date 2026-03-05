import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import * as Icons from "lucide-react-native";
import { View } from "react-native";
import StatChip from "./StatChip";

export default function OrchardStatsSection({ orchards = [], admin }: any) {
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
    <View
      className="pt-2 flex-row flex-wrap justify-between"
      style={{ backgroundColor: colors.bgColor }}
    >
      <StatChip Icon={Tree} title="Total Avg Area" value={`${totalArea.toFixed(2)} ha`} />
      {/* <StatChip Icon={Layers} title="Tree Count" value={totalTrees.toLocaleString()} /> */}
      <StatChip Icon={Percent} title="Survival Rate" value={`${survivalRatePercent}%`} />
      <StatChip Icon={Calendar} title="Avg Tree Age" value={`${avgTreeAgeYears} yrs`} />

      <View
        className="w-full"
        style={[{
          height: 112,
               borderRadius: 16,
          marginVertical: 18,
          backgroundColor: colors.bgColor,
        },shadows.profile_card]}
      >
        <View  className="p-4">
          <CsText style={typography.Poppins_m_semibold} className="mb-2">
            Smart Insight
          </CsText>

          <CsText style={typography.Poppins_xs_regular}>
            Tree density and survival suggest potential to increase yield by improving
            fertigation.
          </CsText>
        </View>
      </View>
    </View>
  );
}
