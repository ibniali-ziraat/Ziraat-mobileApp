import type { DashboardMetric } from "../types/orchardSections";

// Every per-orchard domain endpoint returns the same self-describing metric
// shape — one formatter covers all six tabs instead of per-tab mapping.
export const formatMetricValue = (metric: DashboardMetric): string => {
  if (metric.dataStatus === "missing" || metric.value == null || metric.value === "") {
    return "No data yet";
  }
  return metric.unit ? `${metric.value} ${metric.unit}` : `${metric.value}`;
};
