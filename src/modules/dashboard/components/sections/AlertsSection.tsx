import CsText from "@/src/components/shared/CsText";
import Loader from "@/src/components/shared/Loader";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import { View } from "react-native";
import { useOrchardAlerts } from "../../hooks/useOrchardSections";
import MetricGrid from "../MetricGrid";

const ICON_MAP = {
  "pending-actions": "Clock",
  "advisory-tickets-resolved": "CheckCircle2",
  "services-booked": "Calendar",
  "total-alerts-triggered": "Bell",
  "alerts-acknowledged": "BellRing",
  "weather-alerts-sent": "CloudRain",
  weather: "CloudRain",
  pest: "Bug",
  nutrient: "Leaf",
  "spray-advisory": "Droplets",
} as const;

type Props = { orchardProfileId: number };

export default function AlertsSection({ orchardProfileId }: Props) {
  const { data, isLoading } = useOrchardAlerts(orchardProfileId);

  if (isLoading) return <Loader />;

  const summary = data?.summary ?? [];
  const categories = data?.categories ?? [];
  const recentTimeline = data?.recentTimeline ?? [];

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
      <MetricGrid metrics={summary} iconMap={ICON_MAP} />

      {sectionTitle("Alert Categories")}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {categories.map((cat) => (
          <View
            key={cat.code}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 999,
              backgroundColor: colors.light,
              borderWidth: 1,
              borderColor: colors.cardBorder,
            }}
          >
            <CsText style={{ fontSize: 12, color: colors.dark }}>{cat.label}</CsText>
          </View>
        ))}
      </View>

      {sectionTitle("Recent Alerts")}
      <View style={[{ backgroundColor: colors.light, borderRadius: 16, padding: 14 }, shadows.profile_card]}>
        {recentTimeline.length === 0 ? (
          <CsText style={{ color: colors.neutral }}>No recent alerts.</CsText>
        ) : (
          recentTimeline.map((item: any, i: number) => (
            <CsText key={i} style={{ color: colors.dark, marginBottom: 4 }}>
              {item.message ?? item.title ?? JSON.stringify(item)}
            </CsText>
          ))
        )}
      </View>
    </View>
  );
}
