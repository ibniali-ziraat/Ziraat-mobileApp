import CustomBarChart from "@/src/components/charts/CustomBarChart";
import Loader from "@/src/components/shared/Loader";
import { View } from "react-native";
import { useOrchardFinancial } from "../../hooks/useOrchardSections";
import { ChartBlock, StatList } from "../DashboardBlocks";
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

  const revenueVsCost = data?.revenueVsCost ?? [];
  const netProfitTrend = data?.netProfitTrend ?? [];

  return (
    <View style={{ marginTop: 8 }}>
      <MetricGrid metrics={data?.metrics ?? []} iconMap={ICON_MAP} />

      <ChartBlock
        title="Revenue vs cost"
        values={revenueVsCost.map((p) => p.value)}
      >
        <CustomBarChart
          labels={revenueVsCost.map((p) => p.label)}
          values={revenueVsCost.map((p) => p.value)}
        />
      </ChartBlock>

      <ChartBlock
        title="Net profit trend"
        values={netProfitTrend.map((p) => p.value)}
      >
        <CustomBarChart
          labels={netProfitTrend.map((p) => p.label)}
          values={netProfitTrend.map((p) => p.value)}
          type="line"
        />
      </ChartBlock>

      <StatList
        title="Insights"
        rows={(data?.recentInsights ?? []).map((item) => ({
          label: item.title,
          value: item.status,
        }))}
      />
    </View>
  );
}
