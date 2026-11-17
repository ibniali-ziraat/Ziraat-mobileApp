import Loader from "@/src/components/shared/Loader";
import { View } from "react-native";
import { useOrchardAdvisory } from "../../hooks/useOrchardSections";
import { StatList } from "../DashboardBlocks";
import MetricGrid from "../MetricGrid";

const ICON_MAP = {
  "articles-read": "BookOpen",
  "seasonal-advisory-compliance": "Percent",
  "expert-consultations": "Users",
  "complaints-registered": "MessageCircle",
  "complaints-resolved": "MessageCircle",
  "forum-questions": "MessageCircle",
  "knowledge-shared": "BookOpen",
  "forum-comments": "MessageCircle",
} as const;

type Props = { orchardProfileId: number };

export default function AdvisorySection({ orchardProfileId }: Props) {
  const { data, isLoading } = useOrchardAdvisory(orchardProfileId);

  if (isLoading) return <Loader />;

  const score = data?.engagementScore;
  const percent =
    score?.score != null && score?.maxScore
      ? Math.round((score.score / score.maxScore) * 100)
      : null;

  return (
    <View style={{ marginTop: 8 }}>
      <MetricGrid metrics={data?.keyMetrics ?? []} iconMap={ICON_MAP} />

      <StatList
        title="Engagement"
        rows={[
          {
            label: score?.label ?? "Engagement score",
            value:
              score?.score != null && score?.maxScore != null
                ? `${score.score} / ${score.maxScore}${percent != null ? ` (${percent}%)` : ""}`
                : null,
          },
        ]}
      />

      <StatList
        title="Recent activity"
        rows={(data?.recentActivities ?? []).map((item) => ({
          label: `${item.title} · ${new Date(item.occurredOn).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`,
          value: item.status,
        }))}
      />
    </View>
  );
}
