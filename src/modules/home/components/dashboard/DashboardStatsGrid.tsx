import { statIcons } from "@/src/constants/iconArt";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { CalendarClock, MapPin, Ruler, Trees } from "lucide-react-native";
import { View } from "react-native";
import type { TrendPoint } from "../../hooks/useHomeDashboard";
import type { FarmActivityComparison } from "../../types/farmerDashboard";
import { areaUnit, formatArea, periodNoun } from "../../utils/dashboardFormat";
import StatCard from "./StatCard";

type Stats = {
  totalOrchards: number;
  datedPercent: number;
  totalArea: number;
  averageArea: number;
  districts: number;
  averageAge: number;
  measured: number;
  completeness: number;
};

type DashboardStatsGridProps = {
  stats: Stats;
  activity: FarmActivityComparison[];
  areaTrend: TrendPoint[];
  /** Running orchard count per month; empty when the run is flat. */
  orchardGrowth: TrendPoint[];
  completionPercent: number;
  /** Share of orchards that actually carry an establishment year. */
  datedPercent: number;
  period?: string;
};

/**
 * A meter pinned at 100% is decoration — there is nothing left to act on — so
 * a finished stat drops the bar and says so in words instead.
 */
const meterFor = (percent: number): number | null =>
  percent >= 100 ? null : percent;

const findDelta = (
  activity: FarmActivityComparison[],
  keyword: string,
): number | null => {
  const match = activity.find((item) =>
    item.label?.toLowerCase().includes(keyword),
  );

  return typeof match?.changePercent === "number" ? match.changePercent : null;
};

export default function DashboardStatsGrid({
  stats,
  activity,
  areaTrend,
  orchardGrowth,
  completionPercent,
  datedPercent,
  period,
}: DashboardStatsGridProps) {
  const orchardDelta = findDelta(activity, "orchard");
  const deltaLabel = `vs last ${periodNoun(period)}`;

  const areaValues = areaTrend.map((point) => point.value);
  const growthValues = orchardGrowth.map((point) => point.value);

  const openOrchards = () => router.push(ROUTES.TABS.ORCHARDS);

  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <StatCard
          label="Registered orchards"
          value={String(stats.totalOrchards)}
          caption={
            !stats.totalOrchards
              ? "Add your first orchard"
              : stats.measured === stats.totalOrchards
                ? "Every orchard has its area"
                : `${stats.totalOrchards - stats.measured} still need an area`
          }
          icon={Trees}
          art={statIcons.orchard}
          delta={orchardDelta}
          deltaLabel={deltaLabel}
          bars={growthValues}
          onPress={openOrchards}
        />

        <StatCard
          label="Total farm area"
          value={formatArea(stats.totalArea)}
          unit={
            areaUnit(stats.totalArea) === "hectares"
              ? "Ha"
              : areaUnit(stats.totalArea)
          }
          caption={
            stats.averageArea > 0
              ? `Avg ${formatArea(stats.averageArea)} per orchard`
              : "Area not recorded yet"
          }
          icon={Ruler}
          art={statIcons.area}
          bars={areaValues}
          onPress={openOrchards}
        />
      </View>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <StatCard
          label="Districts covered"
          value={String(stats.districts)}
          caption={
            !stats.totalOrchards
              ? "Add district details"
              : completionPercent >= 100
                ? "Every orchard has a district"
                : `${completionPercent}% of details filled`
          }
          icon={MapPin}
          art={statIcons.district}
          ring={stats.totalOrchards ? meterFor(completionPercent) : null}
          onPress={openOrchards}
        />

        <StatCard
          label="Average orchard age"
          value={stats.averageAge ? String(stats.averageAge) : "—"}
          unit={stats.averageAge ? "years" : undefined}
          caption={
            !stats.averageAge
              ? "Add establishment year"
              : datedPercent >= 100
                ? "Every orchard has a year"
                : `${datedPercent}% have a year recorded`
          }
          icon={CalendarClock}
          art={statIcons.age}
          ring={stats.totalOrchards ? meterFor(datedPercent) : null}
          onPress={openOrchards}
        />
      </View>
    </View>
  );
}
