import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { ChevronRight, Sprout } from "lucide-react-native";
import { useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";
import { Pressable } from "@/src/components/shared/Pressable";
import Svg, { Line, Path, Text as SvgText } from "react-native-svg";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { fonts } from "@/src/constants/fonts/font";
import type {
  OrchardHistoryEntry,
  TrendPoint,
} from "../../hooks/useHomeDashboard";
import { columnPath, niceCeiling } from "../../utils/chartPath";
import {
  areaUnit,
  formatArea,
  formatRelativeDate,
} from "../../utils/dashboardFormat";
import DashboardCard from "@/src/components/shared/DashboardCard";

type OrchardHistoryCardProps = {
  history: OrchardHistoryEntry[];
  areaTrend: TrendPoint[];
  totalArea: number;
};

const CHART_HEIGHT = 150;
const MAX_BAR_WIDTH = 26;
const TOP_PADDING = 14;
const LABEL_BAND = 22;
const VISIBLE_ENTRIES = 4;

function AreaTrend({ points }: { points: TrendPoint[] }) {
  const [width, setWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) =>
    setWidth(event.nativeEvent.layout.width);

  const plotHeight = CHART_HEIGHT - TOP_PADDING - LABEL_BAND;
  const max = Math.max(...points.map((point) => point.value), 0);
  const ceiling = niceCeiling(Math.max(1, max));

  const bandWidth = points.length && width ? width / points.length : 0;
  const columnWidth = Math.min(MAX_BAR_WIDTH, Math.max(10, bandWidth - 18));
  const baseline = TOP_PADDING + plotHeight;

  return (
    <View onLayout={onLayout} style={{ marginTop: 14 }}>
      {width > 0 ? (
        <Svg width={width} height={CHART_HEIGHT}>
          {[0, 0.5, 1].map((ratio) => (
            <Line
              key={ratio}
              x1={0}
              y1={TOP_PADDING + plotHeight * ratio}
              x2={width}
              y2={TOP_PADDING + plotHeight * ratio}
              stroke={chartTokens.grid}
              strokeWidth={1}
            />
          ))}

          {points.map((point, index) => {
            const height = (point.value / ceiling) * plotHeight;
            const center = bandWidth * index + bandWidth / 2;
            const isLatest = index === points.length - 1;

            return (
              <Path
                key={`col-${point.label}-${index}`}
                d={columnPath(
                  center - columnWidth / 2,
                  baseline - height,
                  columnWidth,
                  height,
                )}
                fill={isLatest ? chartTokens.current : chartTokens.previous}
              />
            );
          })}

          {points.map((point, index) => {
            const height = (point.value / ceiling) * plotHeight;
            const center = bandWidth * index + bandWidth / 2;

            return index === points.length - 1 ? (
              <SvgText
                key={`value-${index}`}
                x={center}
                y={baseline - height - 8}
                fill={cardTokens.inkPrimary}
                fontSize={11}
                fontFamily={fonts.poppins.semibold}
                textAnchor="middle"
              >
                {formatArea(point.value)}
              </SvgText>
            ) : null;
          })}

          {points.map((point, index) => (
            <SvgText
              key={`label-${point.label}-${index}`}
              x={bandWidth * index + bandWidth / 2}
              y={baseline + 15}
              fill={chartTokens.axisText}
              fontSize={10}
              fontFamily={fonts.poppins.regular}
              textAnchor="middle"
            >
              {point.label}
            </SvgText>
          ))}
        </Svg>
      ) : (
        <View style={{ height: CHART_HEIGHT }} />
      )}
    </View>
  );
}

export default function OrchardHistoryCard({
  history,
  areaTrend,
  totalArea,
}: OrchardHistoryCardProps) {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? history : history.slice(0, VISIBLE_ENTRIES);
  const hasTrend = areaTrend.length >= 2;

  const openOrchard = (id: string) =>
    router.push({
      pathname: ROUTES.ORCHARDS.DETAILS.ORCHARD_DETAILS,
      params: { id },
    });

  return (
    <DashboardCard>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text
            style={[
              typography.Poppins_s_semibold,
              { color: cardTokens.inkPrimary, fontSize: 16 },
            ]}
          >
            Orchard history
          </Text>
          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, marginTop: 2, fontSize: 13.5 },
            ]}
          >
            {hasTrend
              ? `Cumulative registered area in ${areaUnit(totalArea)}`
              : "Everything you have registered so far"}
          </Text>
        </View>

        <Pressable
          onPress={() => router.push(ROUTES.TABS.ORCHARDS)}
          hitSlop={10}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Text
            style={[
              typography.Poppins_xs_semibold,
              { color: chartTokens.current },
            ]}
          >
            All
          </Text>
          <ChevronRight size={15} color={chartTokens.current} />
        </Pressable>
      </View>

      {hasTrend ? <AreaTrend points={areaTrend} /> : null}

      {history.length === 0 ? (
        <View style={{ paddingVertical: 24, alignItems: "center" }}>
          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, textAlign: "center" },
            ]}
          >
            No orchards registered yet. Add one to start building your history.
          </Text>
        </View>
      ) : (
        <View style={{ marginTop: hasTrend ? 16 : 14 }}>
          {visible.map((entry, index) => {
            const isLast = index === visible.length - 1;
            const when = entry.createdAt
              ? formatRelativeDate(entry.createdAt)
              : entry.establishmentYear
                ? `Established ${entry.establishmentYear}`
                : "Date not recorded";

            return (
              <Pressable
                key={entry.id}
                onPress={() => openOrchard(entry.id)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <View style={{ width: 28, alignItems: "center" }}>
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: cardTokens.mutedSurface,
                    }}
                  >
                    <Sprout size={13} color={chartTokens.current} />
                  </View>

                  {!isLast ? (
                    <View
                      style={{
                        flex: 1,
                        width: 1.5,
                        marginVertical: 3,
                        borderRadius: 1,
                        backgroundColor: chartTokens.grid,
                      }}
                    />
                  ) : null}
                </View>

                <View style={{ flex: 1, paddingLeft: 12, paddingBottom: isLast ? 0 : 16 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      numberOfLines={1}
                      style={[
                        typography.Poppins_s_semibold,
                        { color: cardTokens.inkPrimary, flex: 1, fontSize: 15 },
                      ]}
                    >
                      {entry.name}
                    </Text>
                    <Text
                      style={[
                        typography.Poppins_xs_regular,
                        { color: cardTokens.inkMuted, fontSize: 13, marginLeft: 8 },
                      ]}
                    >
                      {when}
                    </Text>
                  </View>

                  <Text
                    numberOfLines={1}
                    style={[
                      typography.Poppins_xs_regular,
                      { color: cardTokens.inkSecondary, fontSize: 13.5, marginTop: 2 },
                    ]}
                  >
                    {entry.areaKanals > 0
                      ? `${formatArea(entry.areaKanals)} ${areaUnit(entry.areaKanals)}`
                      : "Area not recorded"}
                    {"  ·  "}
                    {entry.location}
                  </Text>

                  <View
                    style={{
                      alignSelf: "flex-start",
                      marginTop: 6,
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderRadius: 999,
                      backgroundColor: cardTokens.mutedSurface,
                    }}
                  >
                    <Text
                      style={[
                        typography.Poppins_xs_medium,
                        { color: cardTokens.inkSecondary, fontSize: 10.5 },
                      ]}
                    >
                      {entry.ownership}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}

          {history.length > VISIBLE_ENTRIES ? (
            <Pressable
              onPress={() => setExpanded((value) => !value)}
              style={({ pressed }) => ({
                marginTop: 14,
                paddingVertical: 10,
                borderRadius: 14,
                alignItems: "center",
                backgroundColor: cardTokens.mutedSurface,
                opacity: pressed ? 0.75 : 1,
              })}
            >
              <Text
                style={[
                  typography.Poppins_xs_semibold,
                  { color: chartTokens.current, fontSize: 13.5 },
                ]}
              >
                {expanded
                  ? "Show less"
                  : `Show ${history.length - VISIBLE_ENTRIES} more`}
              </Text>
            </Pressable>
          ) : null}
        </View>
      )}
    </DashboardCard>
  );
}
