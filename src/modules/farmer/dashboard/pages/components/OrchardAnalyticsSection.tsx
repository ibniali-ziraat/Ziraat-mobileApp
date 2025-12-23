import CustomBarChart from "@/src/components/charts/CustomBarChart";
import PrecipitationMap from "@/src/components/PrecipitationMap";
import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { useState } from "react";
import { View } from "react-native";

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
    <CsText className="text-[14px] font-bold">Estimated Productivity</CsText>
    <CsText className="text-[14px] font-bold">{yieldPerTreeKg} kg / tree</CsText>
  </View>

  {/* Row 2: Projected Yield */}
  <View className="flex-row justify-between mb-2">
    <CsText className="text-[14px] font-bold">Projected Yield</CsText>
    <CsText className="text-[14px]" style={{ color: colors.dark }}>
      {totalYieldKg.toLocaleString()} kg
   </CsText>
  </View>

  {/* Row 3: Revenue Estimate (optional) */}
  {openYield && (
    <View className="flex-row justify-between">
      <CsText className="text-[14px] font-bold">Revenue Estimate</CsText>
      <CsText className="text-[14px]" style={{ color: colors.dark }}>
        ₹ {estimatedRevenue.toLocaleString()}
     </CsText>
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
        <CsText className="text-[18px] font-bold text-center mb-4">
          Graphical Analysis
       </CsText>

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
