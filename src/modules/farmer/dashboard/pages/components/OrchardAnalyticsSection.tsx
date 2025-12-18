import CustomBarChart from "@/src/components/charts/CustomBarChart";
import PrecipitationMap from "@/src/components/PrecipitationMap";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { useState } from "react";
import { Text, View } from "react-native";

export default function OrchardAnalyticsSection({ orchards, admin }: any) {
  const [openYield, setOpenYield] = useState(true);

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

        <View className="flex-row flex-wrap justify-between "
        style={{ backgroundColor: colors.bgColor }}>
  
      <ZiraatCard
  width="100%"
  height={openYield ? 100 : 96}
  paddingHorizontal={1}
  paddingVertical={1}
  // onPress={() => setOpenYield(!openYield)}
>

  {/* Row 1: Estimated Productivity */}
  <View className="flex-row justify-between mb-2">
    <Text className="text-[14px] font-bold">Estimated Productivity</Text>
    <Text className="text-[14px] font-bold">{yieldPerTreeKg} kg / tree</Text>
  </View>

  {/* Row 2: Projected Yield */}
  <View className="flex-row justify-between mb-2">
    <Text className="text-[14px] font-bold">Projected Yield</Text>
    <Text className="text-[14px]" style={{ color: colors.dark }}>
      {totalYieldKg.toLocaleString()} kg
    </Text>
  </View>

  {/* Row 3: Revenue Estimate (optional) */}
  {openYield && (
    <View className="flex-row justify-between">
      <Text className="text-[14px] font-bold">Revenue Estimate</Text>
      <Text className="text-[14px]" style={{ color: colors.dark }}>
        ₹ {estimatedRevenue.toLocaleString()}
      </Text>
    </View>
  )}
</ZiraatCard>

      {/* -------------------- Charts Card -------------------- */}
      <ZiraatCard
        width="100%"
        height={300}
        marginTop={1.25}
        paddingHorizontal={1}
        paddingVertical={1}
      >
        <Text className="text-[18px] font-bold text-center mb-4">
          Graphical Analysis
        </Text>

        <CustomBarChart
          labels={["A", "B", "C"]}
          values={[4, 5, 3]}
          type="bar"
        />
      </ZiraatCard>
      <ZiraatCard
        width="100%"
          height={250}
          marginVertical={1}
          
          >
          
           <PrecipitationMap />
        </ZiraatCard>
</View>   
  );
}
