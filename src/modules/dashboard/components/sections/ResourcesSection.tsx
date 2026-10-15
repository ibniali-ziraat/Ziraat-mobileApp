import Loader from "@/src/components/shared/Loader";
import { View } from "react-native";
import { useOrchardResources } from "../../hooks/useOrchardSections";
import { stripCurrencySymbol } from "../../utils/metricFormat";
import { NoteList, StatList } from "../DashboardBlocks";
import MetricGrid from "../MetricGrid";

const ICON_MAP = {
  "fertilizer-consumption": "Leaf",
  "pesticide-usage": "Shield",
  "sprays-season": "Tractor",
  "usage-condition": "AlertTriangle",
  "labor-hours": "GaugeCircle",
  "equipment-hours": "Tractor",
  "machinery-utilization": "GaugeCircle",
  "total-input-cost": "Wallet",
  "input-cost-per-acre": "PiggyBank",
  "input-cost-per-tree": "PiggyBank",
} as const;

type Props = { orchardProfileId: number };

export default function ResourcesSection({ orchardProfileId }: Props) {
  const { data, isLoading } = useOrchardResources(orchardProfileId);

  if (isLoading) return <Loader />;

  const summary = data?.resourceSummary;
  const efficiency = data?.inputEfficiency;

  return (
    <View style={{ marginTop: 8 }}>
      <MetricGrid metrics={data?.metrics ?? []} iconMap={ICON_MAP} />

      <StatList
        title="Spending"
        rows={[
          {
            label: "Fertilizer",
            value: stripCurrencySymbol(summary?.fertilizerCostString),
          },
          {
            label: "Labour",
            value: stripCurrencySymbol(summary?.laborCostString),
          },
          {
            label: "Materials",
            value: stripCurrencySymbol(summary?.materialCostString),
          },
          {
            label: "Total",
            value: stripCurrencySymbol(summary?.overallExpenditureString),
          },
        ]}
      />

      <StatList
        title="Efficiency"
        rows={[
          { label: "Fertilizer use", value: efficiency?.fertilizerUse },
          {
            label: "Labour productivity",
            value: efficiency?.laborProductivity,
          },
          { label: "Cost efficiency", value: efficiency?.costEfficiency },
        ]}
      />

      <NoteList title="Insights" items={data?.performanceInsights ?? []} />
    </View>
  );
}
