import CustomBarChart from "@/src/components/charts/CustomBarChart";
import Loader from "@/src/components/shared/Loader";
import { View } from "react-native";
import { useOrchardPestDisease } from "../../hooks/useOrchardSections";
import { ChartBlock, NoteList, StatList } from "../DashboardBlocks";
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

const describe = (item: any): string =>
  item?.title ?? item?.name ?? (typeof item === "string" ? item : "");

export default function PestDiseaseSection({ orchardProfileId }: Props) {
  const { data, isLoading } = useOrchardPestDisease(orchardProfileId);

  if (isLoading) return <Loader />;

  const spray = data?.spraySchedule;
  const trend = data?.pestDiseaseTrend ?? [];
  const missed = spray?.missedSpraysThisMonth ?? 0;

  return (
    <View style={{ marginTop: 8 }}>
      <MetricGrid metrics={data?.metrics ?? []} iconMap={ICON_MAP} />

      <StatList
        title="Sprays"
        rows={[
          { label: "Last applied", value: spray?.lastAppliedSpray },
          { label: "Next scheduled", value: spray?.nextScheduledSpray },
          {
            label: "Missed this month",
            value: missed > 0 ? missed : null,
            alert: true,
          },
        ]}
      />

      <NoteList
        title="High-risk pests"
        items={(data?.highRiskPests ?? []).map(describe)}
      />
      <NoteList
        title="Disease observations"
        items={(data?.diseaseObservations ?? []).map(describe)}
      />

      <ChartBlock
        title="Pest & disease trend"
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
