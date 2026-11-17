import Loader from "@/src/components/shared/Loader";
import { View } from "react-native";
import { useOrchardAlerts } from "../../hooks/useOrchardSections";
import { NoteList } from "../DashboardBlocks";
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

  return (
    <View style={{ marginTop: 8 }}>
      <MetricGrid metrics={data?.summary ?? []} iconMap={ICON_MAP} />

      <NoteList
        title="Recent alerts"
        items={(data?.recentTimeline ?? []).map(
          (item: any) => item?.message ?? item?.title ?? "",
        )}
      />
    </View>
  );
}
