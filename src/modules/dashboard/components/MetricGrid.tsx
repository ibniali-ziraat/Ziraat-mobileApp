import { colors } from "@/src/constants/colors";
import * as Icons from "lucide-react-native";
import { View } from "react-native";
import type { DashboardMetric } from "../types/orchardSections";
import { formatMetricValue } from "../utils/metricFormat";
import EnhancedCard from "./EnhancedCard";

type Props = {
  metrics: DashboardMetric[];
  iconMap?: Record<string, keyof typeof Icons>;
};

// Every per-orchard domain endpoint returns the same self-describing metric
// list — one grid renderer covers all six tabs.
export default function MetricGrid({ metrics, iconMap = {} }: Props) {
  if (metrics.length === 0) return null;

  return (
    <View className="flex-row flex-wrap justify-between">
      {metrics.map((metric) => {
        const IconComp = (iconMap[metric.code]
          ? Icons[iconMap[metric.code]]
          : Icons.Activity) as any;

        return (
          <View key={metric.code} className="w-[48%] mb-3">
            <EnhancedCard
              title={metric.label}
              value={formatMetricValue(metric)}
              icon={<IconComp size={26} color={colors.secondary} strokeWidth={1.4} />}
            />
          </View>
        );
      })}
    </View>
  );
}
