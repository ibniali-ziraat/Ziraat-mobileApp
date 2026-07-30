import { getOrchardCreatedDate } from "../../orchards/utils/orchardDates";
import type { OrchardDateSource } from "../../orchards/utils/orchardDates";
import type { FarmActivityComparison } from "../types/farmerDashboard";

function isSameMonth(date: Date, reference: Date, monthsAgo: number) {
  const target = new Date(
    reference.getFullYear(),
    reference.getMonth() - monthsAgo,
    1,
  );
  return (
    date.getFullYear() === target.getFullYear() &&
    date.getMonth() === target.getMonth()
  );
}

function changePercent(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

export function buildMonthlyOverview(
  orchards: OrchardDateSource[] = [],
  now: Date = new Date(),
): FarmActivityComparison[] {
  let thisMonth = 0;
  let lastMonth = 0;

  for (const orchard of orchards) {
    const date = getOrchardCreatedDate(orchard);
    if (!date) continue;
    if (isSameMonth(date, now, 0)) thisMonth += 1;
    else if (isSameMonth(date, now, 1)) lastMonth += 1;
  }

  return [
    {
      label: "Orchards",
      currentValue: thisMonth,
      previousValue: lastMonth,
      changePercent: changePercent(thisMonth, lastMonth),
    },
    { label: "Harvest", currentValue: 0, previousValue: 0, changePercent: 0 },
    { label: "Spray", currentValue: 0, previousValue: 0, changePercent: 0 },
  ];
}
