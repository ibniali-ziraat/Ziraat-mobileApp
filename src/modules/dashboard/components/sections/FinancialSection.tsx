import CustomBarChart from "@/src/components/charts/CustomBarChart";
import CsText from "@/src/components/shared/CsText";
import Loader from "@/src/components/shared/Loader";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
import { View } from "react-native";
import { useOrchardFinancial } from "../../hooks/useOrchardSections";
import MetricGrid from "../MetricGrid";

const ICON_MAP = {
  "cost-of-cultivation": "Wallet",
  "gross-revenue": "DollarSign",
  "net-profit": "TrendingUp",
  "return-on-investment": "Percent",
  "break-even-yield": "Wheat",
  "year-on-year": "TrendingUp",
  "total-revenue": "DollarSign",
  "total-cost": "Wallet",
  "total-profit": "TrendingUp",
} as const;

type Props = { orchardProfileId: number };

// NOTE: revenueVsCost/netProfitTrend shapes weren't in the sample response
// either — assumed consistent with the other domains' chart-point arrays
// until confirmed against a real populated call.
export default function FinancialSection({ orchardProfileId }: Props) {
  const { data, isLoading } = useOrchardFinancial(orchardProfileId);

  if (isLoading) return <Loader />;

  const metrics = data?.metrics ?? [];
  const revenueVsCost = data?.revenueVsCost ?? [];
  const netProfitTrend = data?.netProfitTrend ?? [];
  const insights = data?.recentInsights ?? [];

  const sectionTitle = (label: string) => (
    <CsText
      style={[
        typography.Poppins_m_semibold,
        { fontSize: 17, color: colors.dark, marginTop: 16, marginBottom: 8 },
      ]}
    >
      {label}
    </CsText>
  );

  return (
    <View style={{ marginTop: 8 }}>
      <MetricGrid metrics={metrics} iconMap={ICON_MAP} />

      {sectionTitle("Revenue vs Cost")}
      <View style={[{ backgroundColor: colors.light, borderRadius: 16, padding: 14 }, shadows.profile_card]}>
        <CustomBarChart
          labels={revenueVsCost.map((p) => p.label)}
          values={revenueVsCost.map((p) => p.value)}
        />
      </View>

      {sectionTitle("Net Profit Trend")}
      <View style={[{ backgroundColor: colors.light, borderRadius: 16, padding: 14 }, shadows.profile_card]}>
        <CustomBarChart
          labels={netProfitTrend.map((p) => p.label)}
          values={netProfitTrend.map((p) => p.value)}
          type="line"
        />
      </View>

      {sectionTitle("Recent Insights")}
      <View style={[{ backgroundColor: colors.light, borderRadius: 16, padding: 14 }, shadows.profile_card]}>
        {insights.length === 0 ? (
          <CsText style={{ color: colors.neutral }}>No financial insights yet.</CsText>
        ) : (
          insights.map((item, i) => (
            <View
              key={item.code ?? i}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: i < insights.length - 1 ? 10 : 0,
              }}
            >
              <CsText style={{ color: colors.dark, fontSize: 15, flex: 1, marginRight: 10 }}>
                {item.title}
              </CsText>
              {!!item.status && (
                <View
                  style={{
                    backgroundColor: colors.secondary,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 999,
                  }}
                >
                  <CsText style={{ color: colors.light, fontSize: 13.5 }}>{item.status}</CsText>
                </View>
              )}
            </View>
          ))
        )}
      </View>
    </View>
  );
}
