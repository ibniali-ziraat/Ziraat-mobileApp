import CustomBarChart from "@/src/components/charts/CustomBarChart";
import PrecipitationMap from "@/src/components/PrecipitationMap";
import CsText from "@/src/components/shared/CsText";
import Map from "@/src/components/shared/Map.native";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useMemo, useState } from "react";
import { useWindowDimensions, View } from "react-native";

export default function OrchardAnalyticsSection({ orchards = [], admin }: any) {
  const [openYield] = useState(true);
  const { width } = useWindowDimensions();

  const yieldPerTreeKg = admin?.yieldPerTreeKg ?? 12;
  const yieldPerHaKg = admin?.yieldPerHaKg ?? 15000;
  const pricePerKg = admin?.pricePerKg ?? 45;

  const totalArea = useMemo(() => {
    return orchards.reduce(
      (sum: number, o: any) => sum + (Number(o.area_ha) || 0),
      0
    );
  }, [orchards]);

  const totalYieldKg = Math.round(yieldPerHaKg * totalArea);
  const estimatedRevenue = totalYieldKg * pricePerKg;

  // ✅ chart width should never exceed screen width
  // ScreenContent padding (15+15 = 30) + card inner padding => keep extra safe
  const chartWidth = Math.max(width - 60, 260);

  return (
    <View className="w-full" style={{ backgroundColor: colors.bgColor }}>
      {/* ✅ Productivity */}
      <View className="w-full mb-4">
        <ZiraatCard
          width="100%"
          height={openYield ? 120 : 100}
          paddingHorizontal={1}
          paddingVertical={1}
        >
          <View className="flex-row justify-between mb-2">
            <CsText style={typography.Poppins_m_semibold} className="text-[14px]">
              Estimated Productivity
            </CsText>

            <CsText style={typography.Poppins_xs_medium} className="text-[14px]">
              {yieldPerTreeKg} kg / tree
            </CsText>
          </View>

          <View className="flex-row justify-between mb-2">
            <CsText style={typography.Poppins_xs_medium} className="text-[14px]">
              Projected Yield
            </CsText>

            <CsText
              style={[typography.Poppins_xs_medium, { color: colors.dark }]}
              className="text-[14px]"
            >
              {totalYieldKg.toLocaleString()} kg
            </CsText>
          </View>

          {openYield && (
            <View className="flex-row justify-between">
              <CsText style={typography.Poppins_xs_medium} className="text-[14px]">
                Revenue Estimate
              </CsText>

              <CsText style={{ color: colors.dark }} className="text-[14px]">
                ₹ {estimatedRevenue.toLocaleString()}
              </CsText>
            </View>
          )}
        </ZiraatCard>
      </View>

      {/* ✅ Graph */}
      <View className="w-full mb-4">
        <ZiraatCard width="100%" height={330} paddingHorizontal={1} paddingVertical={1}>
          <CsText
            style={typography.Poppins_m_semibold}
            className="text-[18px] text-center mb-4"
          >
            Graphical Analysis
          </CsText>


          <View style={{ width: "100%", flex: 1, overflow: "hidden" }}>
            <CustomBarChart
              labels={["A", "B", "C"]}
              values={[4, 5, 3]}
              type="bar"
              width={chartWidth}
            />
          </View>
        </ZiraatCard>
      </View>
      <ScreenLayout>


        <View className="mt-4">
          <CsText style={typography.Poppins_m_semibold} className="text-[16px] mb-3">
            Action Plan (Next 7 Days)
          </CsText>

          <ZiraatCard>
            <View
              className="w-full rounded-xl  py-3 mb-3"
            >
              <View className="flex-row justify-between items-center">
                <CsText style={typography.Poppins_m_semibold} className="text-[14px]">
                  Fertigation Adjustment
                </CsText>
                <CsText style={typography.Poppins_xs_medium} className="text-[12px]">
                  Priority: HIGH
                </CsText>
              </View>
              <CsText className="text-[13px] mt-2">
                Tree density is strong but yield can increase by improving fertigation timing
                (morning drip cycle + nutrient dosing).
              </CsText>
              <CsText style={typography.Poppins_xs_medium} className="text-[12px] mt-2">
                Expected Impact: +8% yield
              </CsText>
            </View>
          </ZiraatCard>

          <ZiraatCard>
            <View
              className="w-full rounded-xl py-3 mb-3"
            >
              <View className="flex-row justify-between items-center">
                <CsText style={typography.Poppins_m_semibold} className="text-[14px]">
                  Pruning Schedule
                </CsText>
                <CsText style={typography.Poppins_xs_medium} className="text-[12px]">
                  Priority: MEDIUM
                </CsText>
              </View>
              <CsText className="text-[13px] mt-2">
                Plan pruning for weak zones to improve sunlight penetration and airflow.
              </CsText>
              <CsText style={typography.Poppins_xs_medium} className="text-[12px] mt-2">
                Expected Impact: Better fruit quality
              </CsText>
            </View>
          </ZiraatCard>


          <ZiraatCard>
            <View
              className="w-full rounded-xl py-3"

            >
              <View className="flex-row justify-between items-center">
                <CsText style={typography.Poppins_m_semibold} className="text-[14px]">
                  Pest Monitoring Alert
                </CsText>
                <CsText style={typography.Poppins_xs_medium} className="text-[12px] ">
                  Priority: HIGH
                </CsText>
              </View>
              <CsText className="text-[13px] mt-2">
                Weather conditions may increase pest risk. Inspect leaves and set traps in
                orchard corners.
              </CsText>
              <CsText style={typography.Poppins_xs_medium} className="text-[12px] mt-2">
                Expected Impact: Protect survival rate
              </CsText>
            </View>
          </ZiraatCard>
        </View>
      </ScreenLayout>

    </View>
  );
}
