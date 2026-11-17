import { badgeToneCycle, getLineIcon } from "@/src/components/shared/IconBadge";
import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import type { DashboardMetric } from "../types/orchardSections";
import { formatMetricValue } from "../utils/metricFormat";
import EnhancedCard from "./EnhancedCard";

type Props = {
  metrics: DashboardMetric[];
  /** Metric code -> lucide icon name; drawn as that line icon. */
  iconMap?: Record<string, string>;
};

/** Tiles shown before "Show all" — two rows keeps the tab scannable. */
const INITIAL = 4;

const hasData = (metric: DashboardMetric) =>
  metric.dataStatus !== "missing" &&
  metric.value !== null &&
  metric.value !== undefined &&
  metric.value !== "";

// Every per-orchard domain endpoint returns the same self-describing metric
// list — one renderer covers all six tabs. Only recorded metrics get a tile;
// the missing ones collapse into one quiet line instead of a wall of
// "No data yet" tiles.
export default function MetricGrid({ metrics, iconMap = {} }: Props) {
  const [expanded, setExpanded] = useState(false);
  if (metrics.length === 0) return null;

  const recorded = metrics.filter(hasData);
  const missing = metrics.filter((metric) => !hasData(metric));
  const shown = expanded ? recorded : recorded.slice(0, INITIAL);

  return (
    <View>
      {recorded.length === 0 ? (
        <View
          style={{
            paddingVertical: 22,
            paddingHorizontal: 16,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.cardBorder,
            alignItems: "center",
          }}
        >
          <Text
            style={[
              typography.Poppins_s_semibold,
              { color: cardTokens.inkPrimary },
            ]}
          >
            Nothing recorded yet
          </Text>
          <Text
            style={[
              typography.Poppins_xs_regular,
              {
                color: cardTokens.inkMuted,
                textAlign: "center",
                marginTop: 4,
              },
            ]}
          >
            Figures appear here as you log activity for this orchard.
          </Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            rowGap: 12,
          }}
        >
          {shown.map((metric, index) => (
            <View key={metric.code} style={{ width: "48.5%" }}>
              <EnhancedCard
                title={metric.label}
                value={formatMetricValue(metric)}
                icon={getLineIcon(iconMap[metric.code])}
                tone={badgeToneCycle[index % badgeToneCycle.length]}
              />
            </View>
          ))}
        </View>
      )}

      {recorded.length > INITIAL ? (
        <Pressable
          onPress={() => setExpanded((value) => !value)}
          hitSlop={8}
          style={{ alignSelf: "flex-start", marginTop: 12 }}
        >
          <Text
            style={[
              typography.Poppins_s_semibold,
              { color: colors.primary, textDecorationLine: "underline" },
            ]}
          >
            {expanded ? "Show less" : `Show all ${recorded.length}`}
          </Text>
        </Pressable>
      ) : null}

      {missing.length > 0 && recorded.length > 0 ? (
        <Text
          numberOfLines={2}
          style={[
            typography.Poppins_xs_regular,
            { color: cardTokens.inkMuted, marginTop: 12 },
          ]}
        >
          {`Not recorded yet: ${missing.map((metric) => metric.label).join(", ")}`}
        </Text>
      ) : null}
    </View>
  );
}
