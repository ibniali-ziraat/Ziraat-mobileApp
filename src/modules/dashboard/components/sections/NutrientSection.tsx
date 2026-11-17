import CustomBarChart from "@/src/components/charts/CustomBarChart";
import Loader from "@/src/components/shared/Loader";
import { View } from "react-native";
import { useOrchardNutrient } from "../../hooks/useOrchardSections";
import { ChartBlock } from "../DashboardBlocks";
import MetricGrid from "../MetricGrid";

const ICON_MAP = {
  "soil-ph": "Gauge",
  "ec-status": "Activity",
  "organic-matter": "Recycle",
  "organic-carbon": "Recycle",
  nitrogen: "Leaf",
  phosphorus: "Leaf",
  potassium: "Leaf",
  fertigation: "Droplets",
  "irrigation-volume": "Droplets",
  "water-use-efficiency": "BarChart3",
  "deficiency-symptoms": "AlertTriangle",
} as const;

type Props = { orchardProfileId: number };

export default function NutrientSection({ orchardProfileId }: Props) {
  const { data, isLoading } = useOrchardNutrient(orchardProfileId);

  if (isLoading) return <Loader />;

  const trend = data?.soilHealthTrend ?? [];

  return (
    <View style={{ marginTop: 8 }}>
      <MetricGrid metrics={data?.metrics ?? []} iconMap={ICON_MAP} />

      <ChartBlock
        title="Soil health trend"
        values={trend.map((t) => t.value)}
        note={data?.trendNote}
      >
        <CustomBarChart
          labels={trend.map((t) => t.label)}
          values={trend.map((t) => t.value)}
        />
      </ChartBlock>
    </View>
  );
}
