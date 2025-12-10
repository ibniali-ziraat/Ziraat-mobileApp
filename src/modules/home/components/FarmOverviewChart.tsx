// components/home/FarmOverviewChart.tsx
import React from "react";
import { Dimensions, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function FarmOverviewChart() {
  const chartData = {
    labels: ["Orchards", "Harvest", "Spray"],
    datasets: [{ data: [1, 0.9, 0.8] }],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (o = 1) => `rgba(45,107,6,${o})`,
    labelColor: (o = 1) => `rgba(0,0,0,${o})`,
  };

  return (
    <View className="rounded-2xl shadow-sm bg-white p-3 mb-8">
      <BarChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        showValuesOnTopOfBars
        fromZero
      />
    </View>
  );
}
