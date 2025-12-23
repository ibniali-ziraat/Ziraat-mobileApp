import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { View } from "react-native";

export default function TransactionsList({ transactions }) {
  return (
    <View
      className="rounded-xl p-4 mt-2 shadow-sm border"
      style={{ backgroundColor: colors.light, borderColor: colors.neutral }}
    >
      {transactions.map((tx, index) => (
        <View key={tx.id}>
          <TransactionRow tx={tx} />
          {index < transactions.length - 1 && (
            <View className="border-b my-2" style={{ borderColor: colors.neutral }} />
          )}
        </View>
      ))}
    </View>
  );
}

function TransactionRow({ tx }) {
  const badgeColor =
    tx.status === "Settled"
      ? colors.primary
      : tx.status === "Pending"
      ? colors.secondary
      : colors.error;

  return (
    <View className="flex-row justify-between items-center py-[6px]">
      <View>
        <CsText className="text-[12px] font-semibold text-gray-800">{tx.id}</CsText>
        <CsText className="text-[11px] text-gray-600">{tx.client}</CsText>
      </View>

      <View className="items-end">
        <CsText className="text-[12px] font-semibold text-gray-800">
          ₹{tx.amount.toLocaleString()}
       </CsText>

        <View
          className="px-2 py-[2px] mt-[2px] rounded-full"
          style={{ backgroundColor: badgeColor + "22" }}
        >
          <CsText className="text-[10px]" style={{ color: badgeColor }}>
            {tx.status}
         </CsText>
        </View>
      </View>
    </View>
  );
}
