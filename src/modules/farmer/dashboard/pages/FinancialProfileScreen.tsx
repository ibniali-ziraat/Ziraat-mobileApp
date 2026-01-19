import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { useWindowDimensions, View } from "react-native";
import { BarChart, LineChart as CurveChart } from "react-native-chart-kit";

import kpis from "../../../../data/kpis.json";
import recentInsights from "../../../../data/recentInsights.json";
import InsightItem from "./components/InsightItem";
import KpiCard from "./components/KpiCard";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { typography } from "@/src/constants/fonts/typography";


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

  return (
    <ScreenLayout scrollable>
      <ScreenContent className="pt-4 pb-10">

        <View className="flex-row flex-wrap justify-between mt-4">
          {kpis.map((item) => (
            <View key={item.id} className="w-[48%] mb-3">
              <KpiCard item={item} />
            </View>
          ))}
        </View>


        <View className="w-full mt-4">
          <ZiraatCard width="100%" paddingVertical={1} paddingHorizontal={1}>
            <CsText style={typography.Poppins_m_semibold} className="text-[18px]  text-dark mb-4">
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
                  backgroundColor: "#ffffff",
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  decimalPlaces: 0,
                  color: () => colors.secondary,
                  labelColor: () => "#111",
                }}
                style={{ borderRadius: 12 }}
              />
            </View>
          </ZiraatCard>
        </View>


        <View className="w-full mt-4">
          <ZiraatCard width="100%" paddingVertical={1} paddingHorizontal={1}>
            <CsText style={typography.Poppins_m_semibold} className="text-[16px]  text-dark mb-4">
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
                  backgroundColor: "#ffffff",
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  decimalPlaces: 0,
                  color: () => "#c7611f",
                  labelColor: () => "#111",
                }}
                style={{ borderRadius: 12 }}
              />
            </View>
          </ZiraatCard>
        </View>


        <View className="w-full mt-4">

          <ZiraatCard width="100%" paddingVertical={1} paddingHorizontal={1}>
            <CsText style={typography.Poppins_m_semibold} className=" text-dark text-[18px] mb-4">
              Recent Financial Insights
            </CsText>

            <View>
              {recentInsights.map((item) => (
                <InsightItem key={item.id} item={item} />
              ))}
            </View>
          </ZiraatCard>
        </View>
      </ScreenContent>
    </ScreenLayout>
  );
}
