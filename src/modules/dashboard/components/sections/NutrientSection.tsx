import CustomBarChart from "@/src/components/charts/CustomBarChart";
import CsText from "@/src/components/shared/CsText";
import Loader from "@/src/components/shared/Loader";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import { View } from "react-native";
import { useOrchardNutrient } from "../../hooks/useOrchardSections";
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

  const metrics = data?.metrics ?? [];
  const trend = data?.soilHealthTrend ?? [];

  return (
    <View style={{ marginTop: 8 }}>
      <MetricGrid metrics={metrics} iconMap={ICON_MAP} />

      <CsText
        style={[
          typography.Poppins_m_semibold,
          { fontSize: 17, color: colors.dark, marginTop: 16, marginBottom: 8 },
        ]}
      >
        Soil Health Trend
      </CsText>
      <View style={[{ backgroundColor: colors.light, borderRadius: 16, padding: 14 }, shadows.profile_card]}>
        <CustomBarChart
          labels={trend.map((t) => t.label)}
          values={trend.map((t) => t.value)}
        />
        {!!data?.trendNote && (
          <CsText style={{ textAlign: "center", marginTop: 8, color: colors.neutral, fontSize: 14 }}>
            {data.trendNote}
          </CsText>
        )}
      </View>
    </View>
  );
}
