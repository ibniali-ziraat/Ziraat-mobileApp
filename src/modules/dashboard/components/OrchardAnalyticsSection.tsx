import CustomBarChart from "@/src/components/charts/CustomBarChart";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";
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

  const chartWidth = Math.max(width - 60, 260);

  const cardStyle = [
    {
      width: "100%",
      backgroundColor: colors.light,
      borderRadius: 16,
      borderColor: colors.neutral,
     
      paddingHorizontal: 12,
      paddingVertical: 12,
    },
    shadows.profile_card,
  ];

  return (
    <View className="w-full" style={{ backgroundColor: colors.bgColor }}>

      {/* Productivity */}
      <View className="w-full mb-4">
        <View style={cardStyle}>
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
        </View>
      </View>

      {/* Chart */}
      <View className="w-full mb-4">
        <View style={[...cardStyle, { height: 330 }]}>
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
              
            />
          </View>
        </View>
      </View>

      <ScreenLayout>
        <View className="mt-4">

          <CsText style={typography.Poppins_m_semibold} className="text-[16px] mb-3">
            Action Plan (Next 7 Days)
          </CsText>

          {/* Action Card 1 */}
          <View style={cardStyle}>
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

          {/* Action Card 2 */}
          <View style={[cardStyle, { marginTop: 16 }]}>
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

          {/* Action Card 3 */}
          <View style={[cardStyle, { marginTop: 16 }]}>
            <View className="flex-row justify-between items-center">
              <CsText style={typography.Poppins_m_semibold} className="text-[14px]">
                Pest Monitoring Alert
              </CsText>
              <CsText style={typography.Poppins_xs_medium} className="text-[12px]">
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

        </View>
      </ScreenLayout>
    </View>
  );
}