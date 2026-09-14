import CustomBarChart from "@/src/components/charts/CustomBarChart";
import CsText from "@/src/components/shared/CsText";
import Loader from "@/src/components/shared/Loader";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import { View } from "react-native";
import { useOrchardPestDisease } from "../../hooks/useOrchardSections";
import MetricGrid from "../MetricGrid";

const ICON_MAP = {
  "pest-incidence": "Bug",
  "disease-incidence-rate": "Activity",
  "risk-level": "AlertCircle",
  "resistance-developed": "ShieldHalf",
  "spray-compliance": "CheckCircle2",
  "photo-diagnoses": "Image",
  "avg-response-time": "Clock",
} as const;

type Props = { orchardProfileId: number };

export default function PestDiseaseSection({ orchardProfileId }: Props) {
  const { data, isLoading } = useOrchardPestDisease(orchardProfileId);

  if (isLoading) return <Loader />;

  const metrics = data?.metrics ?? [];
  const spray = data?.spraySchedule;
  const trend = data?.pestDiseaseTrend ?? [];
  const highRiskPests = data?.highRiskPests ?? [];
  const diseaseObservations = data?.diseaseObservations ?? [];

  const spraySchedule = [
    {
      title: "Last Applied Spray",
      description: spray?.lastAppliedSpray || "No spray recorded yet",
    },
    {
      title: "Next Scheduled Spray",
      description: spray?.nextScheduledSpray || "Nothing scheduled",
    },
    {
      title: "Missed Sprays This Month",
      description: `${spray?.missedSpraysThisMonth ?? 0} missed`,
      isError: (spray?.missedSpraysThisMonth ?? 0) > 0,
    },
  ];

  const sectionTitle = (label: string) => (
    <CsText
      style={[
        typography.Poppins_m_semibold,
        { fontSize: 16, color: colors.dark, marginTop: 16, marginBottom: 8 },
      ]}
    >
      {label}
    </CsText>
  );

  return (
    <View style={{ marginTop: 8 }}>
      <MetricGrid metrics={metrics} iconMap={ICON_MAP} />

      {sectionTitle("High-Risk Pests")}
      {highRiskPests.length === 0 ? (
        <CsText style={{ color: colors.neutral }}>No high-risk pests currently identified.</CsText>
      ) : (
        highRiskPests.map((item: any, i: number) => (
          <CsText key={i} style={{ color: colors.dark, marginBottom: 4 }}>
            {item.title ?? item.name ?? JSON.stringify(item)}
          </CsText>
        ))
      )}

      {sectionTitle("Disease Observations")}
      {diseaseObservations.length === 0 ? (
        <CsText style={{ color: colors.neutral }}>No disease observations recorded.</CsText>
      ) : (
        diseaseObservations.map((item: any, i: number) => (
          <CsText key={i} style={{ color: colors.dark, marginBottom: 4 }}>
            {item.title ?? item.name ?? JSON.stringify(item)}
          </CsText>
        ))
      )}

      {sectionTitle("Spray Schedule")}
      <View style={[{ backgroundColor: colors.light, borderRadius: 16, padding: 14 }, shadows.profile_card]}>
        {spraySchedule.map((item, index) => (
          <View key={index} style={{ marginBottom: index < spraySchedule.length - 1 ? 12 : 0 }}>
            <CsText
              style={{ fontWeight: "600", fontSize: 14, color: item.isError ? colors.error : colors.dark }}
            >
              {item.title}
            </CsText>
            <CsText
              style={{ marginTop: 2, fontSize: 13, color: item.isError ? colors.error : colors.neutral }}
            >
              {item.description}
            </CsText>
          </View>
        ))}
      </View>

      {sectionTitle("Pest & Disease Trend")}
      <View style={[{ backgroundColor: colors.light, borderRadius: 16, padding: 14 }, shadows.profile_card]}>
        <CustomBarChart labels={trend.map((t) => t.label)} values={trend.map((t) => t.value)} />
        {!!data?.trendNote && (
          <CsText style={{ textAlign: "center", marginTop: 8, color: colors.neutral, fontSize: 12 }}>
            {data.trendNote}
          </CsText>
        )}
      </View>
    </View>
  );
}
