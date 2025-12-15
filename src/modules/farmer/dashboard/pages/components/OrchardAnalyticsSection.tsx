import CustomBarChart from "@/src/components/charts/CustomBarChart";
import PrecipitationMap from "@/src/components/PrecipitationMap";
import { colors } from "@/src/constants/colors";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function OrchardAnalyticsSection({ orchards, admin }: any) {
  const [openYield, setOpenYield] = useState(true);
  const [openSoil, setOpenSoil] = useState(false);
  const [openTasks, setOpenTasks] = useState(true);

  const yieldPerTreeKg = admin?.yieldPerTreeKg ?? 12;
  const yieldPerHaKg = admin?.yieldPerHaKg ?? 15000;
  const pricePerKg = admin?.pricePerKg ?? 45;

  const totalArea = orchards.reduce(
    (sum: number, o: any) => sum + (Number(o.area_ha) || 0),
    0
  );

  const totalYieldKg = Math.round(yieldPerHaKg * totalArea);
  const estimatedRevenue = totalYieldKg * pricePerKg;

  return (
    <View className="mt-3">

      {/* Yield Section */}
      <TouchableOpacity
        onPress={() => setOpenYield(!openYield)}
        className="bg-white border border-dark rounded-xl p-[14px] mt-2"
       
      >
        <View className="flex-row justify-between">
          <View>
            <Text className="text-[16px] font-bold">
              Estimated Productivity
            </Text>

            <Text
              className="mt-[6px]"
            >
              {yieldPerTreeKg} kg / tree
            </Text>
          </View>

          <View className="items-end">
           
            <Text className="text-[16px] font-bold">
              Projected Yield
            </Text>
             <Text
              className="text-[14px] mt-[6px]"
              style={{ color: colors.dark }}
            >
              {totalYieldKg.toLocaleString()} kg
            </Text>
          </View>
        </View>

        {openYield && (
          <View className="mt-3">
            <Text className="text-[16px] font-bold" style={{ color: colors.dark }}>
              Revenue Estimate
            </Text>

            <Text
              className="text-[14px] mt-[6px]"
              style={{ color: colors.dark }}
            >
              ₹ {estimatedRevenue.toLocaleString()}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Charts */}
      <View className="mt-6">
        <Text
          className="text-[18px] font-bold justify-text text-center mb-6">
          Graphical Analysis
        </Text>

        <CustomBarChart
          labels={["A", "B", "C"]}
          values={[4, 5, 3]}
          type="bar"
        />
      </View>

      {/* Map */}
      <View
        className="h-[160px] rounded-xl items-center justify-center mt-4"
        style={{ backgroundColor: colors.neutral }}
      >
        <PrecipitationMap />
      </View>
    </View>
  );
}
