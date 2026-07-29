// components/home/FarmOverviewChart.tsx
import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import type {
  FarmActivityComparison,
  FarmerDashboardFarmOverview,
} from "../types/farmerDashboard";

const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - 60;

type FarmOverviewChartProps = {
  overview?: FarmerDashboardFarmOverview;
};

const weeklyFallback: FarmActivityComparison[] = [
  { label: "Orchards", currentValue: 0, previousValue: 0, changePercent: 0 },
  { label: "Harvest", currentValue: 0, previousValue: 0, changePercent: 0 },
  { label: "Spray", currentValue: 0, previousValue: 0, changePercent: 0 },
];

// Temporary values until the monthly API response is available.
const monthlyPlaceholder: FarmActivityComparison[] = [
  { label: "Orchards", currentValue: 50, previousValue: 46, changePercent: 9 },
  { label: "Harvest", currentValue: 42, previousValue: 40, changePercent: 5 },
  { label: "Spray", currentValue: 36, previousValue: 30, changePercent: 20 },
];

export default function FarmOverviewChart({
  overview,
}: FarmOverviewChartProps) {
  const [mode, setMode] = useState<"WEEK" | "MONTH">("WEEK");
  const weeklyActivities = overview?.activityComparison ?? [];
  const activities =
    mode === "WEEK"
      ? weeklyActivities.length > 0
        ? weeklyActivities
        : weeklyFallback
      : monthlyPlaceholder;
  const labels = activities.map((activity) => activity.label);
  const currentValues = activities.map((activity) => activity.currentValue);

  const chartData = {
    labels,
    datasets: [
      {
        data: currentValues,
        colors: [
          () => colors.primary,
          () => colors.secondary,
          () => colors.primary + "99",
        ],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: () => colors.primary,
    labelColor: () => "#666",
    barPercentage: 0.85,
    propsForBackgroundLines: {
      stroke: "#eaeaea",
      strokeDasharray: "4",
    },
  };

  return (
    <View
      style={{
        backgroundColor: colors.light,
        padding: 20,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.06)",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        marginBottom: 18,
        marginTop: 6,
      }}
    >
      <View className="flex-row justify-end mb-2">
        <View className="flex-row bg-primary/5 rounded-full p-1">
          {(["WEEK", "MONTH"] as const).map((option) => (
            <Pressable
              key={option}
              onPress={() => setMode(option)}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 16,
                backgroundColor:
                  mode === option ? colors.primary : "transparent",
                borderRadius: 20,
              }}
            >
              <CsText
                style={[
                  typography.Poppins_s_medium,
                  { color: mode === option ? colors.light : colors.primary },
                ]}
              >
                {option === "WEEK" ? "Weekly" : "Monthly"}
              </CsText>
            </Pressable>
          ))}
        </View>
      </View>

      <CsText
        style={[typography.Poppins_xs_medium]}
        className="text-xs text-dark mb-4"
      >
        Activity comparison (
        {mode === "WEEK"
          ? "This Week vs Last Week"
          : "This Month vs Last Month"}
        )
      </CsText>

      <BarChart
        data={chartData}
        width={chartWidth}
        height={240}
        fromZero
        flatColor
        showValuesOnTopOfBars
        chartConfig={chartConfig}
        style={{ borderRadius: 16 }}
      />

      <View className="mt-4 flex-row justify-between px-1">
        {activities.map((activity) => {
          const g = activity.changePercent;
          const positive = g >= 0;
          return (
            <View key={activity.label} className="items-center">
              <CsText
                style={[typography.Poppins_s_medium]}
                className="text-neutral-700"
              >
                {activity.label}
              </CsText>
              <CsText
                style={[
                  typography.Poppins_xs_medium,

                  { color: positive ? colors.secondary : "red" },
                ]}
              >
                {positive ? `+${g}% ↑` : `${g}% ↓`}
              </CsText>
            </View>
          );
        })}
      </View>
    </View>
  );
}
