import { colors } from "@/src/constants/colors";
import { BarChart2, LineChart, PieChart } from "lucide-react-native";
import { Dimensions, SafeAreaView, ScrollView, Text, View } from "react-native";
import { BarChart, LineChart as CurveChart } from "react-native-chart-kit";
import kpis from "../../../../Data/kpis.json";
import recentInsights from "../../../../Data/recentInsights.json";
import InsightItem from "./components/InsightItem";
import KpiCard from "./components/KpiCard";

const screenWidth = Dimensions.get("window").width - 90;

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
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4 py-4 pb-16">

        {/* Header */}
        <View className="flex-row items-center gap-3 mb-2">
          <PieChart size={30} color={colors.secondary} />
          <Text className="text-2xl font-bold text-black">
            Financial & Yield Performance
          </Text>
        </View>

        <Text className="text-dark text-l mb-4">
          Visualize earnings, expenses & yield progress for smarter decisions.
        </Text>

        {/* KPI Cards */}
        <View className="flex-row flex-wrap justify-between gap-y-4">
          {kpis.map((item) => (
            <KpiCard key={item.id} item={item} />
          ))}
        </View>

        {/* Revenue vs Cost Chart */}
        <View className="mt-8 bg-white rounded-xl p-2 py-4 border border-dark ">
          <View className=" items-center text-center mb-6">
            <BarChart2 size={30} color={colors.secondary} />
            <Text className="ml-1 text-2xl font-bold text-black">Revenue vs Cost</Text>
          </View>

          <BarChart
            data={revenueVsCostData}
            width={screenWidth}
            height={200}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: () => "#2e7d32",
            }}
          />
        </View>

        {/* Net Profit Trend */}
        <View className="mt-8 bg-white rounded-xl py-4 border border-dark ">
          <View className="text-center items-center mb-8">
            <LineChart size={30} color={colors.secondary} />
            <Text className="ml-2 text-2xl font-bold text-black">
              Net Profit Trend (6 Months)
            </Text>
          </View>

          <CurveChart
            data={netProfitTrendData}
            width={screenWidth}
            height={200}
            bezier
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: () => "#c7611f",
            }}
          />
        </View>

        {/* Recent Financial Insights */}
        <View className="mt-8 bg-white p-5 rounded-xl border border-dark ">
          <Text className="font-bold item-center text-center text-black text-2xl mb-8">Recent Financial Insights</Text>
          {recentInsights.map((item) => (
            <InsightItem key={item.id} item={item} />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
