import CsText from "@/src/components/shared/CsText";
import Loader from "@/src/components/shared/Loader";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import { View } from "react-native";
import { useOrchardResources } from "../../hooks/useOrchardSections";
import { stripCurrencySymbol } from "../../utils/metricFormat";
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

const Row = ({ label, value }: { label: string; value: string | null }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 }}>
    <CsText style={{ color: colors.neutral, fontSize: 15 }}>{label}</CsText>
    <CsText style={{ color: colors.dark, fontWeight: "600", fontSize: 15 }}>
      {value || "No data yet"}
    </CsText>
  </View>
);

export default function ResourcesSection({ orchardProfileId }: Props) {
  const { data, isLoading } = useOrchardResources(orchardProfileId);

  if (isLoading) return <Loader />;

  const metrics = data?.metrics ?? [];
  const summary = data?.resourceSummary;
  const efficiency = data?.inputEfficiency;
  const insights = data?.performanceInsights ?? [];

  const sectionTitle = (label: string) => (
    <CsText
      style={[
        typography.Poppins_m_semibold,
        { fontSize: 17, color: colors.dark, marginTop: 16, marginBottom: 8 },
      ]}
    >
      {label}
    </CsText>
  );

  return (
    <View style={{ marginTop: 8 }}>
      <MetricGrid metrics={metrics} iconMap={ICON_MAP} />

      {sectionTitle("Resource Summary")}
      <View style={[{ backgroundColor: colors.light, borderRadius: 16, padding: 14 }, shadows.profile_card]}>
        <Row label="Fertilizer Cost" value={stripCurrencySymbol(summary?.fertilizerCostString)} />
        <Row label="Labor Cost" value={stripCurrencySymbol(summary?.laborCostString)} />
        <Row label="Material Cost" value={stripCurrencySymbol(summary?.materialCostString)} />
        <Row label="Overall Expenditure" value={stripCurrencySymbol(summary?.overallExpenditureString)} />
      </View>

      {sectionTitle("Input Efficiency")}
      <View style={[{ backgroundColor: colors.light, borderRadius: 16, padding: 14 }, shadows.profile_card]}>
        <Row
          label="Fertilizer Use"
          value={efficiency?.fertilizerUse != null ? String(efficiency.fertilizerUse) : null}
        />
        <Row
          label="Labor Productivity"
          value={efficiency?.laborProductivity != null ? String(efficiency.laborProductivity) : null}
        />
        <Row
          label="Cost Efficiency"
          value={efficiency?.costEfficiency != null ? String(efficiency.costEfficiency) : null}
        />
      </View>

      {sectionTitle("Performance Insights")}
      <View style={[{ backgroundColor: colors.light, borderRadius: 16, padding: 14 }, shadows.profile_card]}>
        {insights.length === 0 ? (
          <CsText style={{ color: colors.neutral }}>No insights yet.</CsText>
        ) : (
          insights.map((text, i) => (
            <CsText key={i} style={{ color: colors.dark, marginBottom: i < insights.length - 1 ? 6 : 0 }}>
              • {text}
            </CsText>
          ))
        )}
      </View>
    </View>
  );
}
