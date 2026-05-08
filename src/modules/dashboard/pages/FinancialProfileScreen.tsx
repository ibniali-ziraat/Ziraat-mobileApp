import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { shadows } from "@/src/constants/shadows";
import { useWindowDimensions, View } from "react-native";
import { BarChart, LineChart as CurveChart } from "react-native-chart-kit";

import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { typography } from "@/src/constants/fonts/typography";
import kpis from "../../../data/kpis.json";
import recentInsights from "../../../data/recentInsights.json";
import InsightItem from "../components/InsightItem";
import KpiCard from "../components/KpiCard";

const revenueVsCostData = {
  labels: ["Cost", "Revenue"],
  datasets: [{ data: [28500, 52000] }],
};

const netProfitTrendData = {
  labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
  datasets: [
    {
      data: [19000, 20500, 21500, 22600, 23000, 23500],
      strokeWidth: 3,
    },
  ],
};

export default function FinancialPerformanceScreen() {
  const { width } = useWindowDimensions();
  const chartWidth = Math.max(width - 70, 280);

  const cardStyle = [
    {
      width: "100%",
      backgroundColor: colors.light,
      borderRadius: 16,
   
      borderColor: colors.neutral,
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
    shadows.profile_card,
  ];

  return (
    <ScreenLayout scrollable>
      <ScreenContent className="pt-4 pb-10">

        {/* KPI Cards */}
        <View className="flex-row flex-wrap justify-between mt-4">
          {kpis.map((item) => (
            <View key={item.id} className="w-[48%] mb-3">
              <KpiCard item={item} />
            </View>
          ))}
        </View>

        {/* Revenue vs Cost */}
        <View className="w-full mt-4">
          <View style={cardStyle}>
            <CsText
              style={[
                typography.Poppins_m_semibold,
                { fontSize: 18, color: colors.dark, marginBottom: 16 },
              ]}
            >
              Revenue vs Cost
            </CsText>

            <View style={{ width: "100%", overflow: "hidden" }}>
              <BarChart
                data={revenueVsCostData}
                width={chartWidth}
                height={220}
                fromZero
                showValuesOnTopOfBars
                chartConfig={{
                  backgroundColor: colors.light,
                  backgroundGradientFrom: colors.light,
                  backgroundGradientTo: colors.light,
                  decimalPlaces: 0,
                  color: () => colors.secondary,
                  labelColor: () => colors.dark,
                }}
                style={{ borderRadius: 12 }}
              />
            </View>
          </View>
        </View>

        {/* Net Profit Trend */}
        <View className="w-full mt-4">
          <View style={cardStyle}>
            <CsText
              style={[
                typography.Poppins_m_semibold,
                { fontSize: 16, color: colors.dark, marginBottom: 16 },
              ]}
            >
              Net Profit Trend (6 Months)
            </CsText>

            <View style={{ width: "100%", overflow: "hidden" }}>
              <CurveChart
                data={netProfitTrendData}
                width={chartWidth}
                height={220}
                bezier
                fromZero
                chartConfig={{
                  backgroundColor: colors.light,
                  backgroundGradientFrom: colors.light,
                  backgroundGradientTo: colors.light,
                  decimalPlaces: 0,
                  color: () => colors.secondary,
                  labelColor: () => colors.dark,
                }}
                style={{ borderRadius: 12 }}
              />
            </View>
          </View>
        </View>

        {/* Financial Insights */}
        <View className="w-full mt-4">
          <View style={cardStyle}>
            <CsText
              style={[
                typography.Poppins_m_semibold,
                { fontSize: 18, color: colors.dark, marginBottom: 16 },
              ]}
            >
              Recent Financial Insights
            </CsText>

            <View>
              {recentInsights.map((item) => (
                <InsightItem key={item.id} item={item} />
              ))}
            </View>
          </View>
        </View>

      </ScreenContent>
    </ScreenLayout>
  );
}