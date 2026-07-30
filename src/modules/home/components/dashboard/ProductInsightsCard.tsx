import DashboardCard from "@/src/components/shared/DashboardCard";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { fonts } from "@/src/constants/fonts/font";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";
import { Pressable } from "@/src/components/shared/Pressable";
import Svg, { Line, Path, Text as SvgText } from "react-native-svg";
import type {
  PriceBand,
  ProductBar,
  ProductMetric,
} from "../../hooks/useHomeDashboard";
import { columnPath, niceCeiling } from "../../utils/chartPath";
import { formatCurrency } from "../../utils/dashboardFormat";

type ProductInsightsCardProps = {
  metric: ProductMetric;
  bars: ProductBar[];
  priceBands: PriceBand[];
  trendingCount: number;
  dealsCount: number;
  averagePrice: number;
};

const BAR_HEIGHT = 10;
const CHART_HEIGHT = 168;
const TOP_PADDING = 22;
const LABEL_BAND = 26;
const MAX_BAR_WIDTH = 30;

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={[
          typography.Poppins_s_semibold,
          { color: cardTokens.inkPrimary, fontSize: 16 },
        ]}
      >
        {value}
      </Text>
      <Text
        numberOfLines={1}
        style={[
          typography.Poppins_xs_regular,
          { color: cardTokens.inkMuted, fontSize: 10, marginTop: 1 },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export default function ProductInsightsCard({
  metric,
  bars,
  priceBands,
  trendingCount,
  dealsCount,
  averagePrice,
}: ProductInsightsCardProps) {
  const [width, setWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) =>
    setWidth(event.nativeEvent.layout.width);

  const maxValue = Math.max(1, ...bars.map((bar) => bar.value));

  const formatValue = (value: number) =>
    metric === "rating" ? value.toFixed(1) : formatCurrency(value);

  const plotHeight = CHART_HEIGHT - TOP_PADDING - LABEL_BAND;
  const peak = Math.max(...priceBands.map((band) => band.count), 0);
  const maxCount = niceCeiling(Math.max(1, peak));
  const bandWidth = priceBands.length && width ? width / priceBands.length : 0;
  const columnWidth = Math.min(MAX_BAR_WIDTH, Math.max(10, bandWidth - 18));
  const baseline = TOP_PADDING + plotHeight;

  if (bars.length === 0 && priceBands.length === 0) {
    return (
      <DashboardCard>
        <View style={{ paddingVertical: 24, alignItems: "center" }}>
          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, textAlign: "center" },
            ]}
          >
            Popular products appear here as soon as the marketplace loads.
          </Text>
        </View>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 12,
          paddingHorizontal: 14,
          borderRadius: 16,
          borderCurve: "continuous",
          backgroundColor: cardTokens.mutedSurface,
        }}
      >
        <MiniStat label="Trending now" value={String(trendingCount)} />
        <MiniStat label="Best deals" value={String(dealsCount)} />
        <MiniStat
          label="Avg. price"
          value={averagePrice > 0 ? formatCurrency(averagePrice) : "—"}
        />
      </View>

      {priceBands.length > 0 ? (
        <>
          <Text
            style={[
              typography.Poppins_xs_medium,
              { color: cardTokens.inkSecondary, fontSize: 12, marginTop: 18 },
            ]}
          >
            Price spread
          </Text>
          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, fontSize: 10, marginTop: 2 },
            ]}
          >
            How many of these products sit in each price band
          </Text>

          <View onLayout={onLayout} style={{ marginTop: 12 }}>
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

                {priceBands.map((band, index) => {
                  const height = (band.count / maxCount) * plotHeight;
                  const center = bandWidth * index + bandWidth / 2;
                  const isPeak = band.count === peak && peak > 0;

                  return (
                    <Path
                      key={`band-${index}`}
                      d={columnPath(
                        center - columnWidth / 2,
                        baseline - height,
                        columnWidth,
                        height,
                      )}
                      fill={isPeak ? chartTokens.current : chartTokens.previous}
                    />
                  );
                })}

                {priceBands.map((band, index) => {
                  const height = (band.count / maxCount) * plotHeight;
                  const center = bandWidth * index + bandWidth / 2;
                  const isPeak = band.count === peak && peak > 0;

                  return isPeak ? (
                    <SvgText
                      key={`peak-${index}`}
                      x={center}
                      y={baseline - height - 9}
                      fill={cardTokens.inkPrimary}
                      fontSize={11}
                      fontFamily={fonts.poppins.semibold}
                      textAnchor="middle"
                    >
                      {band.count}
                    </SvgText>
                  ) : null;
                })}

                {priceBands.map((band, index) => (
                  <SvgText
                    key={`label-${index}`}
                    x={bandWidth * index + bandWidth / 2}
                    y={baseline + 17}
                    fill={chartTokens.axisText}
                    fontSize={10}
                    fontFamily={fonts.poppins.regular}
                    textAnchor="middle"
                  >
                    ₹{band.label}
                  </SvgText>
                ))}
              </Svg>
            ) : (
              <View style={{ height: CHART_HEIGHT }} />
            )}
          </View>
        </>
      ) : null}

      {bars.length > 0 ? (
        <>
          <Text
            style={[
              typography.Poppins_xs_medium,
              {
                color: cardTokens.inkSecondary,
                fontSize: 12,
                marginTop: priceBands.length > 0 ? 20 : 18,
              },
            ]}
          >
            Top picks by {metric === "rating" ? "farmer rating" : "price"}
          </Text>

          <View style={{ marginTop: 12, gap: 14 }}>
            {bars.map((bar, index) => {
              const ratio = bar.value / maxValue;
              const leader = index === 0;

              return (
                <Pressable
                  key={bar.key}
                  onPress={() =>
                    router.push({
                      pathname: ROUTES.PRODUCTS.SINGLE_PRODUCT_DETAILS,
                      params: {
                        productId: bar.productId,
                        ...(bar.vendorId ? { vendorId: bar.vendorId } : {}),
                        ...(bar.vendorProductId
                          ? { vendorProductId: bar.vendorProductId }
                          : {}),
                      },
                    })
                  }
                  style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={[
                        typography.Poppins_xs_medium,
                        { color: cardTokens.inkPrimary, flex: 1, fontSize: 12 },
                      ]}
                    >
                      {bar.label}
                    </Text>
                    <Text
                      style={[
                        typography.Poppins_xs_semibold,
                        {
                          color: cardTokens.inkSecondary,
                          fontSize: 12,
                          marginLeft: 8,
                        },
                      ]}
                    >
                      {formatValue(bar.value)}
                    </Text>
                  </View>

                  <View
                    style={{
                      height: BAR_HEIGHT,
                      borderRadius: 4,
                      backgroundColor: chartTokens.track,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        width: `${Math.max(4, ratio * 100)}%`,
                        height: BAR_HEIGHT,
                        backgroundColor: leader
                          ? chartTokens.current
                          : chartTokens.previous,
                        borderTopRightRadius: 4,
                        borderBottomRightRadius: 4,
                      }}
                    />
                  </View>

                  <Text
                    numberOfLines={1}
                    style={[
                      typography.Poppins_xs_regular,
                      { color: cardTokens.inkMuted, fontSize: 10, marginTop: 4 },
                    ]}
                  >
                    {bar.vendor}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </>
      ) : null}
    </DashboardCard>
  );
}
