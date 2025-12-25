// import { View } from "react-native";
// import SummaryCard from "./SummaryCard";

// export default function SummaryGrid() {
//   const summaryData = [
//     {
//       label: "Total Sales",
//       sublabel: "(Lifetime)",
//       value: 145980.5,
//       trend: +12,
//     },
//     {
//       label: "Payable to Vendor",
//       sublabel: "(After Fees)",
//       value: 128402.05,
//       trend: +6,
//     },
//     {
//       label: "Platform Fees",
//       value: 8578.45,
//       trend: -2,
//     },
//   ];

//   return (
//     <View className="flex-row flex-wrap justify-between mt-2">
//       {summaryData.map((item, index) => (
//         <SummaryCard key={index} item={item} />
//       ))}
//     </View>
//   );
// }


import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function VendorFinancialSummary({ data }) {
  const {
    totalSales,
    payableToVendor,
    platformFees,
    discounts,
    outstanding,
    settlementsCount,
  } = data;
<VendorFinancialSummary
  data={{
    totalSales: 650000,
    payableToVendor: 510000,
    platformFees: 32000,
    discounts: 18000,
    outstanding: 120000,
    settlementsCount: 14,
  }}
/>

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 18,
        marginTop: 12,
        borderWidth: 1,
        borderColor: "#e9e9e9",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      {/* HEADER */}
      <View className="flex-row items-center mb-4">
        <Ionicons name="stats-chart-outline" size={22} color={colors.primary} />
        <CsText className="ml-2 text-[17px] font-bold text-gray-900">
          Vendor Financial Summary
       </CsText>
      </View>

      {/* GRID */}
      <View className="flex-row flex-wrap justify-between">
        {/* Total Sales */}
        <FinancialRow label="Total Sales" value={totalSales} color={colors.primaryHover} />

        {/* Payable to Vendor */}
        <FinancialRow label="Payable to Vendor" value={payableToVendor} color={colors.primary} />

        {/* Platform Fees */}
        <FinancialRow label="Platform Fees" value={platformFees} color={colors.error} />

        {/* Discounts */}
        <FinancialRow label="Discounts Provided" value={discounts} color={colors.secondary} />

        {/* Outstanding */}
        <FinancialRow label="Outstanding Credit" value={outstanding} color={colors.secondaryHover} />

        {/* Settlement History */}
        <FinancialRow
          label="Settlement History"
          value={`${settlementsCount} Settlements`}
          isText
          color={colors.dark}
        />
      </View>

      {/* FOOTER LINE */}
      <View
        style={{
          height: 5,
          backgroundColor: colors.primary,
          opacity: 0.85,
          borderRadius: 10,
          marginTop: 16,
        }}
      />
    </View>
  );
}

function FinancialRow({ label, value, color, isText }) {
  return (
    <View className="w-[48%] mb-4">
      <CsText className="text-[12px] text-gray-500">{label}</CsText>

      {isText ? (
        <CsText
          className="text-[14px] mt-1 font-semibold"
          style={{ color }}
        >
          {value}
       </CsText>
      ) : (
        <CsText
          className="text-[20px] mt-1 font-extrabold"
          style={{ color }}
        >
          ₹{value.toLocaleString()}
       </CsText>
      )}
    </View>
  );
}
