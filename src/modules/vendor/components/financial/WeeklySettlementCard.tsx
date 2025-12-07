// import { colors } from "@/src/constants/colors";
// import { Text, TouchableOpacity, View } from "react-native";

// export default function WeeklySettlementCard({ item }) {
//   const statusColor =
//     item.status === "Paid"
//       ? colors.primary
//       : item.status === "Processing"
//       ? colors.secondary
//       : colors.error;

//   return (
//     <View
//       className="rounded-xl p-4 mb-3"
//       style={{
//         backgroundColor: colors.light,
//         borderColor: colors.neutral,
//         borderWidth: 1,
//       }}
//     >
//       <View className="flex-row justify-between items-center">
//         <Text className="font-semibold text-[15px]" style={{ color: colors.dark }}>
//           {item.week}
//         </Text>

//         <View
//           className="px-2 py-[3px] rounded-full"
//           style={{ backgroundColor: `${statusColor}33` }}
//         >
//           <Text className="text-[10px] font-semibold" style={{ color: statusColor }}>
//             {item.status}
//           </Text>
//         </View>
//       </View>

//       <View className="flex-row justify-between mt-3">
//         <SetDetail label="Cash Payout" value={item.cash} />
//         <SetDetail label="Credit Payout" value={item.credit} />
//       </View>

//       <View className="flex-row justify-between mt-1">
//         <SetDetail label="Fee Deduction" value={item.fee} />
//         <SetDetail label="Discount Adj." value={item.discount} />
//       </View>

//       <TouchableOpacity
//         className="mt-3 py-2 rounded-lg"
//         style={{ backgroundColor: colors.primaryLight }}
//       >
//         <Text className="text-center text-sm font-semibold" style={{ color: colors.primaryHover }}>
//           Download PDF
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// function SetDetail({ label, value }) {
//   return (
//     <View>
//       <Text className="text-[11px]" style={{ color: colors.dark }}>
//         {label}
//       </Text>
//       <Text className="text-[15px] font-semibold" style={{ color: colors.dark }}>
//         ₹{value.toLocaleString()}
//       </Text>
//     </View>
//   );
// }

import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function WeeklySettlementCard({ weekly }) {
  return (
    <View className="mt-5">
      <Text className="font-extrabold text-[20px] text-gray-900 mb-4">
        Weekly Settlements
      </Text>

      {weekly.map((item, i) => (
        <View
          key={i}
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 18,
            marginBottom: 14,
            borderWidth: 1,
            borderColor: "#f0f0f0",
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 3,
          }}
        >
          {/* TOP SECTION */}
          <View className="flex-row justify-between items-center">
            {/* LEFT: Week + icon */}
            <View className="flex-row items-center">
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <Ionicons
                  name="calendar-outline"
                  size={22}
                  color={colors.secondary}
                />
              </View>

              <Text className="text-[15px] font-semibold text-gray-900">
                {item.week}
              </Text>
            </View>

            {/* STATUS BADGE */}
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 50,
                backgroundColor:
                  item.status === "Settled"
                    ? `${colors.primary}20`
                    : `${colors.error}20`,
                borderWidth: 1,
                borderColor:
                  item.status === "Settled"
                    ? `${colors.primary}50`
                    : `${colors.error}35`,
              }}
            >
              <Text
                className="text-[11px] font-bold"
                style={{
                  color:
                    item.status === "Settled"
                      ? colors.primary
                      : colors.error,
                }}
              >
                {item.status}
              </Text>
            </View>
          </View>

          {/* AMOUNT */}
          <View className="mt-4">
            <Text
              className="text-[26px] font-extrabold"
              style={{ color: colors.primary }}
            >
              ₹{item.amount.toLocaleString()}
            </Text>
            <Text className="text-[11px] text-gray-500 mt-1">
              Amount transferred to your bank
            </Text>
          </View>

          {/* ACTION BUTTON */}
          <TouchableOpacity
            className="mt-5 flex-row items-center justify-center py-3 rounded-xl"
            style={{
              
              shadowColor: colors.primary,
              shadowOpacity: 0.25,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            <Ionicons name="download-outline" size={22} color="#2d6b06" />
            <Text className="text-primary ml-2 font-semibold text-[13px]">
              Download PDF
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
