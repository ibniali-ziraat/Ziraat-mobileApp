import { colors } from "@/src/constants/colors";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { useDashboardHome } from "@/src/modules/dashboard/hooks/useDashboardHome";
import type { DashboardOrchardSummary } from "@/src/modules/dashboard/types/dashboardHome";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import DashboardSectionHeader from "../dashboard/DashboardSectionHeader";

/** Bars before the rest fold into "Others" — keeps the card short. */
const MAX_BARS = 5;

type Metric = "area" | "trees" | "density";

const METRICS: {
  key: Metric;
  label: string;
  unit: string;
  read: (orchard: DashboardOrchardSummary) => number;
}[] = [
  {
    key: "area",
    label: "Area",
    unit: "kanals",
    // 20 marlas to a kanal
    read: (o) => Number(o.kanals ?? 0) + Number(o.marlas ?? 0) / 20,
  },
  {
    key: "trees",
    label: "Trees",
    unit: "trees",
    read: (o) => Number(o.totalTrees ?? 0),
  },
  {
    key: "density",
    label: "Density",
    unit: "trees/ha",
    read: (o) =>
      Number(o.areaHa) > 0 ? Number(o.totalTrees ?? 0) / Number(o.areaHa) : 0,
  },
];

const format = (value: number) =>
  value >= 1e5
    ? `${(value / 1e5).toFixed(1)}L`
    : value >= 1e4
      ? `${(value / 1e3).toFixed(1)}k`
      : value.toLocaleString("en-IN", { maximumFractionDigits: 1 });

/**
 * Your orchards side by side — area, trees or planting density — as plain
 * horizontal bars: label and value on one line, the bar under it. Needs at
 * least two orchards; one bar compares nothing.
 */
export default function OrchardCharts() {
  const { data } = useDashboardHome();
  const [metricKey, setMetricKey] = useState<Metric>("area");
  const orchards = data?.orchards ?? [];

  if (orchards.length < 2) return null;

  const metric = METRICS.find((m) => m.key === metricKey) ?? METRICS[0];
  const ranked = orchards
    .map((o) => ({
      id: o.orchardProfileId,
      name: o.orchardName,
      value: metric.read(o),
    }))
    .sort((a, b) => b.value - a.value);

  const bars = ranked.slice(0, MAX_BARS);
  const rest = ranked.slice(MAX_BARS);
  // Density is a rate — summing it across orchards would be meaningless.
  if (rest.length && metric.key !== "density") {
    bars.push({
      id: -1,
      name: `${rest.length} others`,
      value: rest.reduce((sum, r) => sum + r.value, 0),
    });
  }

  const max = Math.max(...bars.map((b) => b.value), 1);
  const total = ranked.reduce((sum, r) => sum + r.value, 0);
  const summary =
    metric.key === "density"
      ? `Average ${format(total / ranked.length)} ${metric.unit}`
      : `${format(total)} ${metric.unit} across ${ranked.length} orchards`;

  return (
    <View>
      <DashboardSectionHeader
        title="Your orchards"
        // Recent Orchards above already leaves a 20px gap.
        topSpacing={6}
        actionLabel="Dashboard"
        onAction={() => router.push(ROUTES.DASHBOARD.MAIN as any)}
      />

      <View
        style={{
          padding: 16,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: colors.cardBorder,
          backgroundColor: cardTokens.surface,
        }}
      >
        {/* Segmented switch */}
        <View
          style={{
            flexDirection: "row",
            padding: 3,
            borderRadius: 12,
            backgroundColor: cardTokens.mutedSurface,
          }}
        >
          {METRICS.map((m) => {
            const active = m.key === metric.key;
            return (
              <Pressable
                key={m.key}
                onPress={() => setMetricKey(m.key)}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 7,
                  borderRadius: 10,
                  backgroundColor: active ? cardTokens.surface : "transparent",
                  borderWidth: active ? 1 : 0,
                  borderColor: colors.cardBorder,
                }}
              >
                <Text
                  style={[
                    active
                      ? typography.Poppins_xs_semibold
                      : typography.Poppins_xs_medium,
                    {
                      color: active
                        ? cardTokens.inkPrimary
                        : cardTokens.inkMuted,
                    },
                  ]}
                >
                  {m.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text
          style={[
            typography.Poppins_xs_regular,
            { color: cardTokens.inkMuted, marginTop: 14, marginBottom: 4 },
          ]}
        >
          {summary}
        </Text>

        {bars.map((bar, index) => (
          <View key={bar.id} style={{ marginTop: 12 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <Text
                numberOfLines={1}
                style={[
                  typography.Poppins_xs_medium,
                  { color: cardTokens.inkPrimary, flex: 1, marginRight: 10 },
                ]}
              >
                {bar.name}
              </Text>
              <Text
                style={[
                  typography.Poppins_xs_semibold,
                  { color: cardTokens.inkPrimary },
                ]}
              >
                {format(bar.value)}
              </Text>
            </View>
            <View
              style={{
                height: 8,
                borderRadius: 4,
                backgroundColor: chartTokens.track,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: 8,
                  borderRadius: 4,
                  // Leader in brand green, the rest in the lighter step.
                  width: `${Math.max((bar.value / max) * 100, bar.value > 0 ? 3 : 0)}%`,
                  backgroundColor:
                    index === 0 ? chartTokens.current : chartTokens.previous,
                }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
