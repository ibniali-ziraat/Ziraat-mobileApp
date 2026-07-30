import { chartTokens } from "@/src/constants/dashboardTheme";
import { useState } from "react";
import { View, type LayoutChangeEvent } from "react-native";
import Svg, { Path } from "react-native-svg";
import { columnPath } from "../../utils/chartPath";

type MiniBarsProps = {
  values: number[];
  height?: number;
};

/**
 * Column sparkline for discrete counts, sized to whatever box it is given.
 * The last column is the current period, so it carries the accent and the rest
 * recede — the height is the value, the colour only marks "now".
 *
 * Empty periods keep a 2px stub in the track colour so the baseline stays
 * legible; drawing them in the accent is what made the strip read as stray
 * dashes floating in the card.
 */
export default function MiniBars({ values, height = 26 }: MiniBarsProps) {
  const [width, setWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const next = Math.round(event.nativeEvent.layout.width);
    if (next !== width) setWidth(next);
  };

  const max = Math.max(...values, 1);
  const gap = 4;
  const barWidth =
    width > 0
      ? Math.max(3, (width - gap * (values.length - 1)) / values.length)
      : 0;

  return (
    <View onLayout={onLayout} style={{ height }}>
      {width > 0 && values.length > 1 ? (
        <Svg width={width} height={height}>
          {values.map((value, index) => {
            const barHeight = Math.max(2, (value / max) * height);
            const x = index * (barWidth + gap);
            const isCurrent = index === values.length - 1;

            return (
              <Path
                key={index}
                d={columnPath(x, height - barHeight, barWidth, barHeight, 3)}
                fill={
                  isCurrent && value > 0
                    ? chartTokens.current
                    : chartTokens.track
                }
              />
            );
          })}
        </Svg>
      ) : null}
    </View>
  );
}
