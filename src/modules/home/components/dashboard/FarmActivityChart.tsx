import DashboardCard from "@/src/components/shared/DashboardCard";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { fonts } from "@/src/constants/fonts/font";
import { typography } from "@/src/constants/fonts/typography";
import { Fragment, useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";
import Svg, { Line, Path, Text as SvgText } from "react-native-svg";
import type { FarmActivityComparison } from "../../types/farmerDashboard";
import { columnPath, niceCeiling } from "../../utils/chartPath";
import { periodNoun } from "../../utils/dashboardFormat";

type FarmActivityChartProps = {
  activity: FarmActivityComparison[];
  period?: string;
};

const CHART_HEIGHT = 190;
const TOP_PADDING = 22;
const LABEL_BAND = 26;
const MAX_BAR_WIDTH = 22;
const BAR_GAP = 2;
const TRACK_HEIGHT = 12;

function LegendKey({ color, label }: { color: string; label: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View
        style={{
          width: 9,
          height: 9,
          borderRadius: 3,
          backgroundColor: color,
          marginRight: 6,
        }}
      />
      <Text
        style={[
          typography.Poppins_xs_regular,
          { color: cardTokens.inkSecondary, fontSize: 13.5 },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function DeltaPill({ change }: { change: number }) {
  const positive = change >= 0;

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
        backgroundColor: cardTokens.mutedSurface,
      }}
    >
      <Text
        style={[
          typography.Poppins_xs_semibold,
          {
            color: positive ? chartTokens.positive : chartTokens.negative,
            fontSize: 13.5,
          },
        ]}
      >
        {positive ? "▲" : "▼"} {Math.abs(Math.round(change))}%
      </Text>
    </View>
  );
}

/**
 * One metric is a before/after pair, not a chart — two tracks read faster and
 * more honestly than a lone column with nothing beside it on the axis.
 */
function ComparisonRows({
  item,
  periodLabel,
}: {
  item: FarmActivityComparison;
  periodLabel: string;
}) {
  const current = Math.max(0, item.currentValue ?? 0);
  const previous = Math.max(0, item.previousValue ?? 0);
  const max = Math.max(current, previous, 1);

  const rows = [
    { label: `This ${periodLabel}`, value: current, color: chartTokens.current },
    {
      label: `Last ${periodLabel}`,
      value: previous,
      color: chartTokens.previous,
    },
  ];

  return (
    <View style={{ marginTop: 16, gap: 14 }}>
      {rows.map((row) => (
        <View key={row.label}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <Text
              style={[
                typography.Poppins_xs_regular,
                { color: cardTokens.inkSecondary, flex: 1, fontSize: 14 },
              ]}
            >
              {row.label}
            </Text>
            <Text
              style={[
                typography.Poppins_s_semibold,
                { color: cardTokens.inkPrimary, fontSize: 16 },
              ]}
            >
              {row.value}
            </Text>
          </View>

          <View
            style={{
              height: TRACK_HEIGHT,
              borderRadius: 4,
              backgroundColor: chartTokens.track,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: `${Math.max(3, (row.value / max) * 100)}%`,
                height: TRACK_HEIGHT,
                backgroundColor: row.color,
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

export default function FarmActivityChart({
  activity,
  period,
}: FarmActivityChartProps) {
  const [width, setWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) =>
    setWidth(event.nativeEvent.layout.width);

  const periodLabel = periodNoun(period);
  const plotHeight = CHART_HEIGHT - TOP_PADDING - LABEL_BAND;
  const isSingle = activity.length === 1;

  const maxValue = niceCeiling(
    Math.max(
      1,
      ...activity.map((item) =>
        Math.max(item.currentValue ?? 0, item.previousValue ?? 0),
      ),
    ),
  );

  const bandWidth = activity.length && width ? width / activity.length : 0;
  const barWidth = Math.min(
    MAX_BAR_WIDTH,
    Math.max(8, (bandWidth - BAR_GAP) / 2 - 12),
  );

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
            {isSingle ? activity[0].label : "Farm activity"}
          </Text>
          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, marginTop: 2, fontSize: 13.5 },
            ]}
          >
            This {periodLabel} compared with the last one
          </Text>
        </View>

        {isSingle ? (
          <DeltaPill change={activity[0].changePercent ?? 0} />
        ) : (
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 999,
              backgroundColor: cardTokens.mutedSurface,
            }}
          >
            <Text
              style={[
                typography.Poppins_xs_semibold,
                { color: chartTokens.current, fontSize: 13 },
              ]}
            >
              {periodLabel.toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      {isSingle ? (
        <ComparisonRows item={activity[0]} periodLabel={periodLabel} />
      ) : (
        <>
          <View style={{ flexDirection: "row", gap: 16, marginTop: 12 }}>
            <LegendKey
              color={chartTokens.current}
              label={`This ${periodLabel}`}
            />
            <LegendKey
              color={chartTokens.previous}
              label={`Last ${periodLabel}`}
            />
          </View>

          <View onLayout={onLayout} style={{ marginTop: 14 }}>
            {width > 0 ? (
              <Svg width={width} height={CHART_HEIGHT}>
                {[0, 0.5, 1].map((ratio) => {
                  const y = TOP_PADDING + plotHeight * ratio;
                  return (
                    <Line
                      key={ratio}
                      x1={0}
                      y1={y}
                      x2={width}
                      y2={y}
                      stroke={chartTokens.grid}
                      strokeWidth={1}
                    />
                  );
                })}

                {activity.map((item, index) => {
                  const current = Math.max(0, item.currentValue ?? 0);
                  const previous = Math.max(0, item.previousValue ?? 0);

                  const currentHeight = (current / maxValue) * plotHeight;
                  const previousHeight = (previous / maxValue) * plotHeight;

                  const center = bandWidth * index + bandWidth / 2;
                  const pairWidth = barWidth * 2 + BAR_GAP;
                  const startX = center - pairWidth / 2;
                  const baseline = TOP_PADDING + plotHeight;

                  return (
                    <Fragment key={item.label}>
                      <Path
                        d={columnPath(
                          startX,
                          baseline - currentHeight,
                          barWidth,
                          currentHeight,
                        )}
                        fill={chartTokens.current}
                      />
                      <Path
                        d={columnPath(
                          startX + barWidth + BAR_GAP,
                          baseline - previousHeight,
                          barWidth,
                          previousHeight,
                        )}
                        fill={chartTokens.previous}
                      />

                      <SvgText
                        x={center}
                        y={
                          baseline - Math.max(currentHeight, previousHeight) - 8
                        }
                        fill={cardTokens.inkSecondary}
                        fontSize={11}
                        fontFamily={fonts.poppins.semibold}
                        textAnchor="middle"
                      >
                        {current}
                      </SvgText>

                      <SvgText
                        x={center}
                        y={baseline + 17}
                        fill={chartTokens.axisText}
                        fontSize={11}
                        fontFamily={fonts.poppins.regular}
                        textAnchor="middle"
                      >
                        {item.label}
                      </SvgText>
                    </Fragment>
                  );
                })}
              </Svg>
            ) : (
              <View style={{ height: CHART_HEIGHT }} />
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 12,
            }}
          >
            {activity.map((item) => (
              <View
                key={`delta-${item.label}`}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 999,
                  backgroundColor: cardTokens.mutedSurface,
                }}
              >
                <Text
                  style={[
                    typography.Poppins_xs_medium,
                    { color: cardTokens.inkSecondary, fontSize: 13.5 },
                  ]}
                >
                  {item.label}
                </Text>
                <Text
                  style={[
                    typography.Poppins_xs_semibold,
                    {
                      color:
                        (item.changePercent ?? 0) >= 0
                          ? chartTokens.positive
                          : chartTokens.negative,
                      fontSize: 13.5,
                      marginLeft: 6,
                    },
                  ]}
                >
                  {(item.changePercent ?? 0) >= 0 ? "▲" : "▼"}{" "}
                  {Math.abs(Math.round(item.changePercent ?? 0))}%
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
    </DashboardCard>
  );
}
