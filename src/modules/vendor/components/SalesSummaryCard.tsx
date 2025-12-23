import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function SalesSummaryCard({ data, net }) {
  return (
    <Animated.View
      entering={FadeInUp.duration(400)}
      className="rounded-2xl p-4 mb-4"
      style={{
        backgroundColor: colors.light,
        borderColor: colors.neutral,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      {/* TITLE */}
      <CsText
       className="text-[15px] font-semibold text-gray-900 mb-3">
        Summary Breakdown
     </CsText>

      {/* ROWS */}
      <Row label="Cash Sales" value={`₹${data.cash}`} color={colors.primary} />
      <Row label="Credit Sales" value={`₹${data.credit}`} color={colors.secondary} />
      <Row label="Platform Fee" value={`₹${data.fee}`} color={colors.primaryHover} />
      <Row label="Discounts Given" value={`₹${data.discount}`} color={colors.secondaryHover} />

      {/* NET RECEIVABLE */}
      <View
        className="mt-4 pt-3 border-t"
        style={{ borderColor: colors.neutral }}
      >
        <View className="flex-row justify-between items-center">
          <CsText className="text-[14px] font-bold text-gray-900">
            Net Receivable
         </CsText>

          <View
            className="px-3 py-[4px] rounded-full"
            style={{ backgroundColor: `${colors.primary}15` }}
          >
            <CsText
              className="text-[13px] font-bold"
              style={{ color: colors.primary }}
            >
              ₹{net}
           </CsText>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}


function Row({ label, value, color }) {
  return (
    <View className="flex-row justify-between items-center mb-[10px]">
      <CsText className="text-[13px] text-gray-700 font-medium">
        {label}
     </CsText>

      <CsText
        className="text-[13px] font-semibold"
        style={{ color }}
      >
        {value}
     </CsText>
    </View>
  );
}
