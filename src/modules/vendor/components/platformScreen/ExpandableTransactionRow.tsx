import CsText from "@/src/components/shared/CsText";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function ExpandableTransactionRow({ tx, colors }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setExpanded(!expanded)}
      style={{
        borderRadius: 12,
        paddingVertical: 6,
        paddingHorizontal: 2,
      }}
    >
      {/* Main Row */}
      <View className="flex-row items-center">
        <CsText className="w-[25%] text-[13px] text-black">{tx.id}</CsText>
        <CsText className="w-[20%] text-[13px] text-black">{tx.type}</CsText>
        <CsText className="w-[25%] text-[13px] text-black">{tx.amount}</CsText>

        <View className="w-[30%] flex-row items-center justify-between">
          <CsText className="text-[13px] font-medium text-gray-900">
            {tx.charged}
         </CsText>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={16}
            color="#9CA3AF"
          />
        </View>
      </View>

      {/* Expanded Details */}
      {expanded && (
        <View
          className="rounded-xl p-3 mt-2"
          style={{
            backgroundColor: colors.bg,
            borderColor: colors.border,
            borderWidth: 1,
          }}
        >
          <View className="flex-row justify-between mb-1">
            <CsText className="text-[12px] text-gray-500">Fee Rate</CsText>
            <CsText
              className="text-[12px] font-semibold"
              style={{ color: colors.primaryDark }}
            >
              {tx.feeRate}
           </CsText>
          </View>

          <View className="flex-row justify-between">
            <CsText className="text-[12px] text-gray-500">Date</CsText>
            <CsText className="text-[12px] text-gray-700">{tx.date}</CsText>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}
