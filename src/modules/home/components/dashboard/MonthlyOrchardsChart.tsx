import DashboardCard from "@/src/components/shared/DashboardCard";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { fonts } from "@/src/constants/fonts/font";
import { typography } from "@/src/constants/fonts/typography";
import { useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";
import Svg, { Line, Path, Text as SvgText } from "react-native-svg";
import type { TrendPoint } from "../../hooks/useHomeDashboard";
import { columnPath, niceCeiling } from "../../utils/chartPath";

type MonthlyOrchardsChartProps = {
  points: TrendPoint[];
};

const CHART_HEIGHT = 200;
const TOP_PADDING = 24;
const LABEL_BAND = 26;
const MAX_BAR_WIDTH = 26;

export default function MonthlyOrchardsChart({
  points,
}: MonthlyOrchardsChartProps) {
  const [width, setWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) =>
    setWidth(event.nativeEvent.layout.width);

  const plotHeight = CHART_HEIGHT - TOP_PADDING - LABEL_BAND;
  const total = points.reduce((sum, point) => sum + point.value, 0);
  const peak = Math.max(...points.map((point) => point.value), 0);
  const maxValue = niceCeiling(Math.max(1, peak));

  const bandWidth = points.length && width ? width / points.length : 0;
  const barWidth = Math.min(MAX_BAR_WIDTH, Math.max(10, bandWidth - 22));
  const baseline = TOP_PADDING + plotHeight;

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
              { color: cardTokens.inkPrimary, fontSize: 15 },
            ]}
          >
            Orchards registered
          </Text>
          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, marginTop: 2, fontSize: 11 },
            ]}
          >
            Last {points.length} months
          </Text>
        </View>

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
              { color: chartTokens.current, fontSize: 10 },
            ]}
          >
            {total} TOTAL
          </Text>
        </View>
      </View>

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
              const height = (point.value / maxValue) * plotHeight;
              const center = bandWidth * index + bandWidth / 2;
              const isPeak = point.value === peak && peak > 0;

              return (
                <Path
                  key={`bar-${point.label}-${index}`}
                  d={columnPath(
                    center - barWidth / 2,
                    baseline - height,
                    barWidth,
                    height,
                  )}
                  fill={isPeak ? chartTokens.current : chartTokens.previous}
                />
              );
            })}

            {points.map((point, index) => {
              const height = (point.value / maxValue) * plotHeight;
              const center = bandWidth * index + bandWidth / 2;
              const isPeak = point.value === peak && peak > 0;

              return isPeak ? (
                <SvgText
                  key={`value-${point.label}-${index}`}
                  x={center}
                  y={baseline - height - 9}
                  fill={cardTokens.inkPrimary}
                  fontSize={11}
                  fontFamily={fonts.poppins.semibold}
                  textAnchor="middle"
                >
                  {point.value}
                </SvgText>
              ) : null;
            })}

            {points.map((point, index) => (
              <SvgText
                key={`label-${point.label}-${index}`}
                x={bandWidth * index + bandWidth / 2}
                y={baseline + 17}
                fill={chartTokens.axisText}
                fontSize={11}
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
    </DashboardCard>
  );
}
