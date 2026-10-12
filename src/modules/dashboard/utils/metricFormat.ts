import type { DashboardMetric } from "../types/orchardSections";

// Every per-orchard domain endpoint returns the same self-describing metric
// shape — one formatter covers all six tabs instead of per-tab mapping.
export const formatMetricValue = (metric: DashboardMetric): string => {
  if (metric.dataStatus === "missing" || metric.value == null || metric.value === "") {
    return "No data yet";
  }
  // cost metrics come back as "currency", "currency/acre", etc. — the label
  // already says what the number is, so show just the price
  if (metric.unit?.startsWith("currency")) return `${metric.value}`;
  return metric.unit ? `${metric.value} ${metric.unit}` : `${metric.value}`;
};

// the api sends pre-formatted money like "$6,800.00" — drop the symbol
export const stripCurrencySymbol = (value: string | null | undefined) =>
  value ? value.replace(/^[^\d-]+/, "") : null;
