import { chartTokens } from "@/src/constants/dashboardTheme";
import { View } from "react-native";

type MiniMeterProps = {
  /** 0-100. */
  percent: number;
  height?: number;
};

/**
 * One value against its limit, as a full-width track. The unfilled track is a
 * lighter step of the same ramp so the whole bar reads as a single measure —
 * which a ring the size of a fingertip never managed at this scale.
 */
export default function MiniMeter({ percent, height = 6 }: MiniMeterProps) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <View
      style={{
        height,
        borderRadius: height / 2,
        backgroundColor: chartTokens.track,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          width: `${clamped}%`,
          height: "100%",
          borderRadius: height / 2,
          backgroundColor: chartTokens.current,
        }}
      />
    </View>
  );
}
