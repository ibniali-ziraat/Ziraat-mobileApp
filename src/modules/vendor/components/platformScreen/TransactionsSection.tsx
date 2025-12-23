import CsText from "@/src/components/shared/CsText";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import ExpandableTransactionRow from "./ExpandableTransactionRow";

export default function TransactionsSection({ transactions, colors }) {
  return (
    <View className="mb-7">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <CsText className="text-[17px] font-semibold text-gray-900">
          Recent Fee Transactions
       </CsText>

        {/* Optional mini action */}
        <Ionicons name="chevron-forward" size={18} color={colors.primaryDark} />
      </View>

      {/* Table Card */}
      <View
        className="p-4 rounded-2xl"
        style={{
          backgroundColor: colors.light,
          borderColor: colors.border,
          borderWidth: 1,
          
        }}
      >
        {/* Table Header */}
        <View
          className="flex-row pb-2 mb-1 border-b"
          style={{ borderColor: colors.border }}
        >
          <CsText className="w-[25%] text-[12px] font-semibold text-black">
            Order
         </CsText>
          <CsText className="w-[20%] text-[12px] font-semibold text-black">
            Type
         </CsText>
          <CsText className="w-[25%] text-[12px] font-semibold ttext-black">
            Amount
         </CsText>
          <CsText className="w-[30%] text-[12px] font-semibold text-black">
            Fee
         </CsText>
        </View>

        {/* Rows */}
        {transactions.map((t, i) => (
          <View key={t.id}>
            <ExpandableTransactionRow tx={t} colors={colors} />

            {/* Subtle divider between rows */}
            {i !== transactions.length - 1 && (
              <View
                className="my-1"
                style={{
                  height: 1,
                  backgroundColor: "#EDEDED",
                  opacity: 0.6,
                }}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
