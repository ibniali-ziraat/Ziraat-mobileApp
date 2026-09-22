import CsText from "@/src/components/shared/CsText";
import Loader from "@/src/components/shared/Loader";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import { View } from "react-native";
import { useOrchardAdvisory } from "../../hooks/useOrchardSections";
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

const STATUS_COLOR: Record<string, string> = {
  Accepted: colors.primary,
  Posted: colors.primary,
  Resolved: colors.primary,
  open: colors.secondary,
};

type Props = { orchardProfileId: number };

export default function AdvisorySection({ orchardProfileId }: Props) {
  const { data, isLoading } = useOrchardAdvisory(orchardProfileId);

  if (isLoading) return <Loader />;

  const keyMetrics = data?.keyMetrics ?? [];
  const engagementScore = data?.engagementScore;
  const recentActivities = data?.recentActivities ?? [];

  const engagementPercent =
    engagementScore?.score != null && engagementScore?.maxScore
      ? Math.round((engagementScore.score / engagementScore.maxScore) * 100)
      : null;

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
      <MetricGrid metrics={keyMetrics} iconMap={ICON_MAP} />

      {sectionTitle("Engagement Score")}
      <View
        style={[
          { backgroundColor: colors.light, borderRadius: 16, padding: 14, alignItems: "center" },
          shadows.profile_card,
        ]}
      >
        <CsText style={{ fontSize: 20, color: colors.dark }}>
          {engagementScore?.score != null && engagementScore?.maxScore != null
            ? `${engagementScore.score} / ${engagementScore.maxScore}${
                engagementPercent != null ? ` (${engagementPercent}%)` : ""
              }`
            : "—"}
        </CsText>
        <CsText style={{ marginTop: 6, color: colors.neutral, fontSize: 12, textAlign: "center" }}>
          {engagementScore?.label ?? "No engagement scoring model is configured."}
        </CsText>
      </View>

      {sectionTitle("Recent Activities")}
      <View style={[{ backgroundColor: colors.light, borderRadius: 16, padding: 14 }, shadows.profile_card]}>
        {recentActivities.length === 0 ? (
          <CsText style={{ color: colors.neutral }}>No recent activity yet.</CsText>
        ) : (
          recentActivities.map((item, i) => (
            <View
              key={item.reference ?? i}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: i < recentActivities.length - 1 ? 12 : 0,
              }}
            >
              <View style={{ flex: 1, marginRight: 10 }}>
                <CsText style={{ color: colors.dark, fontSize: 13 }} numberOfLines={1}>
                  {item.title}
                </CsText>
                <CsText style={{ fontSize: 11, color: colors.neutral }}>
                  {new Date(item.occurredOn).toLocaleDateString()}
                </CsText>
              </View>
              <View
                style={{
                  backgroundColor: STATUS_COLOR[item.status] ?? colors.secondary,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 999,
                }}
              >
                <CsText style={{ color: colors.light, fontSize: 11 }}>{item.status}</CsText>
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  );
}
