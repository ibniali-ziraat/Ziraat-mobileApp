import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { fonts } from "@/src/constants/fonts/font";
import { typography } from "@/src/constants/fonts/typography";
import { useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";
import Svg, { Line, Path, Text as SvgText } from "react-native-svg";
import { columnPath, niceCeiling } from "../../utils/chartPath";
import { areaUnit, formatArea } from "../../utils/dashboardFormat";

type AreaBar = {
  id: string;
  label: string;
  area: number;
};

type OwnershipRow = {
  label: string;
  count: number;
  share: number;
};

type OrchardOverviewCardProps = {
  bars: AreaBar[];
  unmeasured: number;
  ownership: OwnershipRow[];
  totalArea: number;
};

const CHART_HEIGHT = 186;
const TOP_PADDING = 24;
const LABEL_BAND = 30;
const MAX_COLUMN_WIDTH = 30;
const METER_HEIGHT = 6;

/** X-axis room is tight with five bands, so names get clipped, not wrapped. */
const shortLabel = (label: string): string =>
  label.length > 9 ? `${label.slice(0, 8)}…` : label;

export default function OrchardOverviewCard({
  bars,
  unmeasured,
  ownership,
  totalArea,
}: OrchardOverviewCardProps) {
  const [width, setWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) =>
    setWidth(event.nativeEvent.layout.width);

  const plotHeight = CHART_HEIGHT - TOP_PADDING - LABEL_BAND;
  const ceiling = niceCeiling(Math.max(1, ...bars.map((bar) => bar.area)));
  const bandWidth = bars.length && width ? width / bars.length : 0;
  const columnWidth = Math.min(MAX_COLUMN_WIDTH, Math.max(10, bandWidth - 16));
  const baseline = TOP_PADDING + plotHeight;

  return (
    <View>
      {bars.length > 0 ? (
        <>
          <Text
            style={[
              typography.Poppins_xs_medium,
              { color: cardTokens.inkSecondary, fontSize: 12 },
            ]}
          >
            Area by orchard
          </Text>

          <View onLayout={onLayout} style={{ marginTop: 10 }}>
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

                {bars.map((bar, index) => {
                  const height = (bar.area / ceiling) * plotHeight;
                  const center = bandWidth * index + bandWidth / 2;

                  return (
                    <Path
                      key={`col-${bar.id}`}
                      d={columnPath(
                        center - columnWidth / 2,
                        baseline - height,
                        columnWidth,
                        height,
                      )}
                      fill={
                        index === 0 ? chartTokens.current : chartTokens.previous
                      }
                    />
                  );
                })}

                {bars.map((bar, index) => {
                  const height = (bar.area / ceiling) * plotHeight;
                  const center = bandWidth * index + bandWidth / 2;

                  return (
                    <SvgText
                      key={`value-${bar.id}`}
                      x={center}
                      y={baseline - height - 8}
                      fill={cardTokens.inkPrimary}
                      fontSize={10}
                      fontFamily={fonts.poppins.semibold}
                      textAnchor="middle"
                    >
                      {formatArea(bar.area)}
                    </SvgText>
                  );
                })}

                {bars.map((bar, index) => (
                  <SvgText
                    key={`label-${bar.id}`}
                    x={bandWidth * index + bandWidth / 2}
                    y={baseline + 16}
                    fill={chartTokens.axisText}
                    fontSize={9.5}
                    fontFamily={fonts.poppins.regular}
                    textAnchor="middle"
                  >
                    {shortLabel(bar.label)}
                  </SvgText>
                ))}
              </Svg>
            ) : (
              <View style={{ height: CHART_HEIGHT }} />
            )}
          </View>

          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, fontSize: 10, marginTop: 2 },
            ]}
          >
            Measured in {areaUnit(totalArea)}
            {unmeasured > 0
              ? ` · ${unmeasured} orchard${unmeasured === 1 ? "" : "s"} without a recorded area not charted`
              : ""}
          </Text>
        </>
      ) : (
        <Text
          style={[
            typography.Poppins_xs_regular,
            { color: cardTokens.inkMuted, fontSize: 11, marginTop: 16 },
          ]}
        >
          Record orchard sizes to see how your area is distributed.
        </Text>
      )}

      {ownership.length > 0 ? (
        <>
          <Text
            style={[
              typography.Poppins_xs_medium,
              { color: cardTokens.inkSecondary, fontSize: 12, marginTop: 20 },
            ]}
          >
            Ownership mix
          </Text>

          <View style={{ marginTop: 12, gap: 11 }}>
            {ownership.map((row) => (
              <View key={row.label}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      typography.Poppins_xs_regular,
                      { color: cardTokens.inkPrimary, flex: 1, fontSize: 12 },
                    ]}
                  >
                    {row.label}
                  </Text>
                  <Text
                    style={[
                      typography.Poppins_xs_semibold,
                      {
                        color: cardTokens.inkSecondary,
                        fontSize: 11,
                        marginLeft: 8,
                      },
                    ]}
                  >
                    {row.count} · {Math.round(row.share)}%
                  </Text>
                </View>

                <View
                  style={{
                    height: METER_HEIGHT,
                    borderRadius: 3,
                    backgroundColor: chartTokens.track,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      width: `${Math.max(2, row.share)}%`,
                      height: METER_HEIGHT,
                      borderRadius: 3,
                      backgroundColor: chartTokens.current,
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </>
      ) : null}
    </View>
  );
}
