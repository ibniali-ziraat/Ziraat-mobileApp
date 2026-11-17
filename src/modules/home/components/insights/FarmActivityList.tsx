import { colors } from "@/src/constants/colors";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { getDashboardIcon, homeArt } from "@/src/constants/iconArt";
import { TrendingDown, TrendingUp } from "lucide-react-native";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import type { FarmActivityComparison } from "../../types/farmerDashboard";
import DashboardSectionHeader from "../dashboard/DashboardSectionHeader";

type Props = {
  activity: FarmActivityComparison[];
  /** Period name from the API, e.g. "This month". */
  period?: string;
};

const iconFor = (label: string) => {
  const name = label.toLowerCase();
  if (/fertili|nutrient/.test(name)) return getDashboardIcon("Leaf");
  if (/irrigat|water|fertigat/.test(name)) return getDashboardIcon("Droplets");
  if (/prun/.test(name)) return getDashboardIcon("Recycle");
  if (/labou?r|worker/.test(name)) return getDashboardIcon("Users");
  if (/cost|expense|spend/.test(name)) return getDashboardIcon("Wallet");
  if (/pest|disease/.test(name)) return getDashboardIcon("Bug");
  return getDashboardIcon("Activity");
};

/**
 * Farm activity this period vs the last, from the farmer dashboard API. The
 * hook already drops empty rows, so an empty list means nothing to show.
 */
export default function FarmActivityList({ activity, period }: Props) {
  if (activity.length === 0) return null;

  return (
    <View>
      <DashboardSectionHeader
        title="Farm activity"
        subtitle={
          period ? `${period} vs previous` : "Compared with last period"
        }
        art={homeArt.records}
      />

      <View
        style={{
          borderRadius: 18,
          borderWidth: 1,
          borderColor: colors.cardBorder,
          overflow: "hidden",
        }}
      >
        {activity.map((row, index) => {
          const change = Number(row.changePercent ?? 0);
          const up = change > 0;
          const flat = change === 0;
          const tone = flat
            ? cardTokens.inkMuted
            : up
              ? chartTokens.positive
              : chartTokens.negative;
          const Trend = up ? TrendingUp : TrendingDown;

          return (
            <View
              key={row.label}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 12,
                borderTopWidth: index === 0 ? 0 : 1,
                borderTopColor: colors.cardBorder,
              }}
            >
              <View
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: cardTokens.mutedSurface,
                }}
              >
                <SvgXml xml={iconFor(row.label)} width={24} height={24} />
              </View>

              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text
                  numberOfLines={1}
                  style={[
                    typography.Poppins_s_medium,
                    { color: cardTokens.inkPrimary },
                  ]}
                >
                  {row.label}
                </Text>
                <Text
                  style={[
                    typography.Poppins_xs_regular,
                    { color: cardTokens.inkMuted },
                  ]}
                >
                  {`${row.currentValue ?? 0} now · ${row.previousValue ?? 0} before`}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 999,
                  backgroundColor: flat
                    ? cardTokens.mutedSurface
                    : up
                      ? chartTokens.tint
                      : "#FDECEC",
                }}
              >
                {flat ? null : <Trend size={14} color={tone} />}
                <Text style={[typography.Poppins_xs_semibold, { color: tone }]}>
                  {flat ? "No change" : `${Math.abs(Math.round(change))}%`}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
