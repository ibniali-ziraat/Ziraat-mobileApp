// components/home/FarmOverviewChart.tsx
import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - 60;

export default function FarmOverviewChart() {
  const [mode, setMode] = useState<"WEEK" | "MONTH">("WEEK");

  
  const dataSet = {
    WEEK: {
      current: [12, 10, 8], 
      previous: [10, 9, 7], 
    },
    MONTH: {
      current: [50, 42, 36], 
      previous: [46, 40, 30], 
    },
  };

  const currentValues = dataSet[mode].current;
  const previousValues = dataSet[mode].previous;

  
  const growthValues = currentValues.map((curr, i) => {
    const prev = previousValues[i];
    const growth = ((curr - prev) / prev) * 100;
    return Math.round(growth);
  });

  const chartData = {
    labels: ["Orchards", "Harvest", "Spray"],
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
        marginTop:6,
      }}
    >
      {/* ---------------------------------------------- */}
      {/* TOGGLE BUTTONS */}
      {/* ---------------------------------------------- */}
      <View className="flex-row justify-end mb-2">
        <View className="flex-row bg-primary/5 rounded-full p-1">
          {["WEEK", "MONTH"].map((opt) => (
            <TouchableOpacity
              key={opt}
              onPress={() => setMode(opt as any)}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 16,
                backgroundColor: mode === opt ? colors.primary : "transparent",
                borderRadius: 20,
              }}
            >
              <CsText
                style={[
                  typography.Poppins_s_medium,
                  
                  { color: mode === opt ? "#fff" : colors.primary,}
                ]
                 
                }
              >
                {opt === "WEEK" ? "Weekly" : "Monthly"}
             </CsText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <CsText
      style={[typography.Poppins_xs_medium]}
      className="text-xs text-dark mb-4">
        Activity comparison ({mode === "WEEK" ? "This Week vs Last Week" : "This Month vs Last Month"})
     </CsText>

     
      <BarChart
        data={chartData}
        width={chartWidth}
        height={240}
        fromZero
        flatColor
        showValuesOnTopOfBars
        chartConfig={chartConfig}
        style={{ borderRadius: 16,  }}
      />

      
      <View className="mt-4 flex-row justify-between px-1">
        {["Orchards", "Harvest", "Spray"].map((label, i) => {
          const g = growthValues[i];
          const positive = g >= 0;
          return (
            <View key={i} className="items-center">
              <CsText
              style={[typography.Poppins_s_medium]}
              
              className="text-neutral-700">{label}</CsText>
              <CsText
              style={[typography.Poppins_xs_medium,

                { color: positive ? colors.secondary : "red" }
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
