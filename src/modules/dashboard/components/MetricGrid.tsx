import { dashboardTints, getDashboardIcon } from "@/src/constants/iconArt";
import { View } from "react-native";
import type { DashboardMetric } from "../types/orchardSections";
import { formatMetricValue } from "../utils/metricFormat";
import EnhancedCard from "./EnhancedCard";

type Props = {
  metrics: DashboardMetric[];
  /** Metric code -> lucide icon name; drawn as the matching colour icon. */
  iconMap?: Record<string, string>;
};

// Every per-orchard domain endpoint returns the same self-describing metric
// list — one grid renderer covers all six tabs.
export default function MetricGrid({ metrics, iconMap = {} }: Props) {
  if (metrics.length === 0) return null;

  return (
    <View className="flex-row flex-wrap justify-between">
      {metrics.map((metric, index) => (
        <View key={metric.code} className="w-[48%] mb-3">
          <EnhancedCard
            title={metric.label}
            value={formatMetricValue(metric)}
            art={getDashboardIcon(iconMap[metric.code])}
            tint={dashboardTints[index % dashboardTints.length]}
          />
        </View>
      ))}
    </View>
  );
}
