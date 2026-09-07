import { Pressable } from "@/src/components/shared/Pressable";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { useState } from "react";
import { Text, View, type LayoutChangeEvent } from "react-native";
import Svg, { Path } from "react-native-svg";
import { columnPath } from "../../utils/chartPath";
import type { WeatherHourPoint } from "../../utils/weatherUtils";

const PLOT_HEIGHT = 118;
/** Cap the mark — never let a column fill its slot. */
const MAX_BAR = 22;
/** The surface gap that separates neighbouring columns. */
const GAP = 6;

type Props = {
  hours: WeatherHourPoint[];
  /** Index of the hour whose value is shown in the header. */
  selected: number;
  onSelect: (index: number) => void;
};

/**
 * Temperature over the next twelve hours, one column per hour.
 *
 * A single series, so there is no legend — the card's title says what is
 * plotted. Colour is emphasis only: the hour you have selected carries the
 * accent, the rest recede to the track grey. Height is the value.
 *
 * Every column is tappable and drives the header readout, so no value is
 * locked behind a tooltip.
 */
export default function HourlyTemperatureChart({
  hours,
  selected,
  onSelect,
}: Props) {
  const [width, setWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const next = Math.round(event.nativeEvent.layout.width);
    if (next !== width) setWidth(next);
  };

  if (hours.length === 0) return null;

  const temps = hours.map((hour) => hour.tempC);
  const max = Math.max(...temps);
  const min = Math.min(...temps);
  // A zero baseline would flatten a 12°-to-24° day into twelve near-identical
  // columns, so the baseline sits just below the coldest hour instead. That
  // makes the heights relative rather than absolute, which is why the caption
  // below spells the range out — a truncated scale has to be disclosed, not
  // hidden.
  const floor = min - Math.max(2, (max - min) * 0.35);
  const span = Math.max(1, max - floor);

  const slot = width > 0 ? width / hours.length : 0;
  const barWidth = Math.min(MAX_BAR, Math.max(6, slot - GAP));

  return (
    <View>
      <View onLayout={onLayout} style={{ height: PLOT_HEIGHT }}>
        {width > 0 ? (
          <Svg width={width} height={PLOT_HEIGHT}>
            {hours.map((hour, index) => {
              const height = Math.max(
                4,
                ((hour.tempC - floor) / span) * PLOT_HEIGHT,
              );
              const x = index * slot + (slot - barWidth) / 2;

              return (
                <Path
                  key={hour.time}
                  d={columnPath(
                    x,
                    PLOT_HEIGHT - height,
                    barWidth,
                    height,
                    4,
                  )}
                  fill={
                    index === selected ? chartTokens.current : chartTokens.track
                  }
                />
              );
            })}
          </Svg>
        ) : null}

        {/* Touch targets sit over the plot so they can be wider than the marks. */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: "row",
          }}
        >
          {hours.map((hour, index) => (
            <Pressable
              key={hour.time}
              onPress={() => onSelect(index)}
              accessibilityRole="button"
              accessibilityLabel={`${hour.label}, ${hour.tempC} degrees`}
              style={{ flex: 1 }}
            />
          ))}
        </View>
      </View>

      <View style={{ flexDirection: "row", marginTop: 8 }}>
        {hours.map((hour, index) => {
          // Twelve labels will not fit across a phone; every third hour plus
          // whatever is selected keeps the axis readable.
          const show = index % 3 === 0 || index === selected;

          return (
            <View key={hour.time} style={{ flex: 1, alignItems: "center" }}>
              <Text
                numberOfLines={1}
                style={[
                  typography.Poppins_xs_regular,
                  {
                    fontSize: 9.5,
                    color:
                      index === selected
                        ? chartTokens.current
                        : cardTokens.inkMuted,
                  },
                ]}
              >
                {show ? (index === 0 ? "Now" : hour.label) : ""}
              </Text>
            </View>
          );
        })}
      </View>

      <Text
        style={[
          typography.Poppins_xs_regular,
          {
            color: cardTokens.inkMuted,
            fontSize: 9.5,
            marginTop: 8,
            textAlign: "center",
          },
        ]}
      >
        Bar height spans {min}° to {max}° across these hours
      </Text>
    </View>
  );
}
