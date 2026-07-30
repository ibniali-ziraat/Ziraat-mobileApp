import { Pressable } from "@/src/components/shared/Pressable";
import {
  cardShadow,
  cardTokens,
  chartTokens,
} from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import {
  ArrowDownRight,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react-native";
import { Text, View } from "react-native";
import MiniBars from "./MiniBars";
import MiniMeter from "./MiniMeter";

export type StatCardProps = {
  label: string;
  value: string;
  unit?: string;
  caption?: string;
  icon: LucideIcon;
  delta?: number | null;
  deltaLabel?: string;
  /** Series of values -> mini column chart along the card's foot. */
  bars?: number[];
  /** 0-100 -> meter along the card's foot, for stats with no series behind them. */
  ring?: number | null;
  onPress?: () => void;
};

/**
 * One headline number per tile. The reading order is label -> value ->
 * caption, and any chart lives in a full-width band pinned to the card's foot
 * so it reads as part of the tile rather than a mark floating beside the icon.
 */
export default function StatCard({
  label,
  value,
  unit,
  caption,
  icon: Icon,
  delta,
  deltaLabel,
  bars,
  ring,
  onPress,
}: StatCardProps) {
  const hasDelta = typeof delta === "number" && Number.isFinite(delta);
  const positive = hasDelta && (delta as number) >= 0;
  const DeltaIcon = positive ? ArrowUpRight : ArrowDownRight;
  const deltaColor = positive ? chartTokens.positive : chartTokens.negative;

  // A run of identical columns is a shape with nothing in it; drawing it just
  // puts grey dashes under the number.
  const hasBars =
    !!bars && bars.length > 1 && Math.max(...bars) > Math.min(...bars);
  const hasMeter = !hasBars && typeof ring === "number";

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={`${label}: ${value}${unit ? ` ${unit}` : ""}`}
      style={({ pressed }) => [
        {
          flex: 1,
          minHeight: 148,
          backgroundColor: cardTokens.surface,
          borderRadius: 22,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: cardTokens.hairline,
          paddingHorizontal: 15,
          paddingVertical: 14,
          justifyContent: "space-between",
          opacity: pressed ? 0.94 : 1,
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
        cardShadow,
      ]}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Text
            numberOfLines={2}
            style={[
              typography.Poppins_xs_medium,
              {
                flex: 1,
                marginRight: 8,
                color: cardTokens.inkSecondary,
                fontSize: 11.5,
                lineHeight: 15,
              },
            ]}
          >
            {label}
          </Text>

          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: chartTokens.tint,
            }}
          >
            <Icon size={15} color={chartTokens.current} strokeWidth={2} />
          </View>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "baseline", marginTop: 10 }}
        >
          <Text
            style={[
              typography.Poppins_l_semibold,
              { color: cardTokens.inkPrimary, fontSize: 30, lineHeight: 36 },
            ]}
          >
            {value}
          </Text>

          {unit ? (
            <Text
              style={[
                typography.Poppins_xs_medium,
                {
                  color: cardTokens.inkSecondary,
                  fontSize: 12,
                  marginLeft: 5,
                },
              ]}
            >
              {unit}
            </Text>
          ) : null}
        </View>

        {hasDelta ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <DeltaIcon size={12} color={deltaColor} strokeWidth={2.4} />
            <Text
              style={[
                typography.Poppins_xs_semibold,
                { color: deltaColor, fontSize: 10.5, marginLeft: 1 },
              ]}
            >
              {positive ? "+" : ""}
              {Math.round(delta as number)}%
            </Text>
            {deltaLabel ? (
              <Text
                numberOfLines={1}
                style={[
                  typography.Poppins_xs_regular,
                  {
                    flex: 1,
                    color: cardTokens.inkMuted,
                    fontSize: 10,
                    marginLeft: 4,
                  },
                ]}
              >
                {deltaLabel}
              </Text>
            ) : null}
          </View>
        ) : caption ? (
          <Text
            numberOfLines={2}
            style={[
              typography.Poppins_xs_regular,
              {
                color: cardTokens.inkMuted,
                fontSize: 10.5,
                lineHeight: 14,
                marginTop: 5,
              },
            ]}
          >
            {caption}
          </Text>
        ) : null}
      </View>

      {hasBars ? (
        <View style={{ marginTop: 12 }}>
          <MiniBars values={bars!} height={26} />
        </View>
      ) : hasMeter ? (
        <View style={{ marginTop: 12 }}>
          <MiniMeter percent={ring as number} />
        </View>
      ) : null}
    </Pressable>
  );
}
