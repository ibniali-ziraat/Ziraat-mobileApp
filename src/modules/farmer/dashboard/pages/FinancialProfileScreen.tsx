import BackHeader from "@/src/components/shared/BackHeader";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { BarChart2, LineChart } from "lucide-react-native";
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
      <ScrollView className="">
   <BackHeader title="Financial & Yield Performance"
   desc="Visualize earnings, expenses & yield progress for smarter decisions." />
       

        {/* KPI Cards */}
        <View className="flex-row flex-wrap justify-between gap-y-4">
          {kpis.map((item) => (
            <KpiCard key={item.id} item={item} />
          ))}
        </View>

        {/* Revenue vs Cost Chart */}
         <ZiraatCard
      width="100%"
      height={300}
      paddingVertical={1}
      paddingHorizontal={0.75}
      marginTop={2}
    >
      {/* Header */}
      <View className="items-center mb-6">
        <BarChart2 size={30} color={colors.secondary} />
        <Text className="mt-1 text-[16px] font-bold text-black">
          Revenue vs Cost
        </Text>
      </View>

      {/* Chart */}
      <BarChart
        data={revenueVsCostData}
        width={screenWidth - 32}
        height={200}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: () => colors.secondary,
        }}
        style={{
          borderRadius: 12,
        }}
      />
    </ZiraatCard>

        {/* Net Profit Trend */}
        <ZiraatCard
      width="100%"
      height={300}
      paddingVertical={1}
      paddingHorizontal={0.75}
      marginTop={2}
    >
      {/* Header */}
      <View className="items-center mb-8">
        <LineChart size={30} color={colors.secondary} />
        <Text className="mt-1 text-[16px] font-bold text-black text-center">
          Net Profit Trend (6 Months)
        </Text>
      </View>

      {/* Chart */}
      <CurveChart
        data={netProfitTrendData}
        width={screenWidth - 32}
        height={200}
        bezier
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: () => "#c7611f",
        }}
        style={{
          borderRadius: 12,
        }}
      />
    </ZiraatCard>

        {/* Recent Financial Insights */}
            <ZiraatCard
      width="100%"
      height="11%"
      paddingVertical={1}
      paddingHorizontal={1}
      marginTop={2}
      marginBottom={2}
    >
      {/* Title */}
      <Text className="font-bold text-center text-black text-[16px] my-2 ">
        Recent Financial Insights
      </Text>

      {/* List */}
      <View>
        {recentInsights.map((item) => (
          <InsightItem key={item.id} item={item} />
        ))}
      </View>
    </ZiraatCard>

      </ScrollView>
    </SafeAreaView>
  );
}
