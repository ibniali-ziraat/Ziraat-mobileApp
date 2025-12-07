import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

export default function SalesCard({ activeFilter }) {
  const ranges = ["Today", "Weekly", "Monthly", "Yearly"];
  const [selectedRange, setSelectedRange] = useState("Monthly");

  const salesData = {
    Today: 12500,
    Weekly: 87500,
    Monthly: 294500,
    Yearly: 3250000,
  };

  const previousData = {
    Today: 11000,
    Weekly: 82000,
    Monthly: 260000,
    Yearly: 2900000,
  };

  const breakdownData = {
    Today: [
      { title: "Online Payments", amount: 8000, color: colors.primary, icon: "card-outline" },
      { title: "Cash on Delivery", amount: 3500, color: colors.secondary, icon: "cash-outline" },
      { title: "Refunds", amount: 1000, color: "red", icon: "refresh-outline" },
    ],
    Weekly: [
      { title: "Online Payments", amount: 52000, color: colors.primary, icon: "card-outline" },
      { title: "Cash on Delivery", amount: 29000, color: colors.secondary, icon: "cash-outline" },
      { title: "Refunds", amount: 6500, color: "red", icon: "refresh-outline" },
    ],
    Monthly: [
      { title: "Online Payments", amount: 180000, color: colors.primary, icon: "card-outline" },
      { title: "Cash on Delivery", amount: 90000, color: colors.secondary, icon: "cash-outline" },
      { title: "Refunds", amount: 24500, color: "red", icon: "refresh-outline" },
    ],
    Yearly: [
      { title: "Online Payments", amount: 1900000, color: colors.primary, icon: "card-outline" },
      { title: "Cash on Delivery", amount: 1100000, color: colors.secondary, icon: "cash-outline" },
      { title: "Refunds", amount: 250000, color: "red", icon: "refresh-outline" },
    ],
  };

  const sparkData = {
    Today: [4, 6, 3, 8, 6, 9, 7],
    Weekly: [5, 9, 7, 12, 10, 14, 11],
    Monthly: [6, 13, 10, 17, 12, 18, 15],
    Yearly: [10, 20, 16, 28, 22, 34, 30],
  };

  const formatAmount = (a) => "₹" + a.toLocaleString("en-IN");

  const total = salesData[selectedRange];
  const prev = previousData[selectedRange];
  const diff = total - prev;
  const diffPercent = Math.round((diff / prev) * 100);
  const isGrowth = diff >= 0;

  const breakdown = breakdownData[selectedRange];

  return (
    <Pressable
      android_ripple={{ color: "#e9e9e9" }}
      className="p-6 rounded-2xl mb-4"
      style={{
      
        
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      {/* TOP ROW */}
      <View className="flex-row items-center justify-between mb-5">
        <View
          className="w-12 h-12 rounded-2xl items-center justify-center"
          style={{
            backgroundColor: colors.primary + "15",
            borderWidth: 1,
            borderColor: colors.primary + "30",
          }}
        >
          <Ionicons name="trending-up" size={26} color={colors.primary} />
        </View>

        <View
          className="px-3 py-1 rounded-full"
          style={{ backgroundColor: "#f3f3f3", borderWidth: 1, borderColor: "#e1e1e1" }}
        >
          <Text className="text-[11px] text-gray-700 font-semibold">
            {activeFilter ? `Filter: ${activeFilter}` : "No Filter"}
          </Text>
        </View>
      </View>

      {/* RANGE SELECTOR */}
      <View className="flex-row bg-gray-100 rounded-full p-1 mb-4">
        {ranges.map((r) => {
          const active = selectedRange === r;
          return (
            <TouchableOpacity
              key={r}
              onPress={() => setSelectedRange(r)}
              className="flex-1 items-center py-2 rounded-full"
              style={{ backgroundColor: active ? colors.primary : "transparent" }}
            >
              <Text
                className="text-xs font-semibold"
                style={{ color: active ? "#fff" : "#666" }}
              >
                {r}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* MAIN AMOUNT */}
      <Text className="text-gray-900 font-extrabold" style={{ fontSize: 38 }}>
        {formatAmount(total)}
      </Text>

      {/* COMPARISON */}
      <View className="flex-row items-center mt-1 mb-4">
        <Ionicons
          name={isGrowth ? "arrow-up" : "arrow-down"}
          size={18}
          color={isGrowth ? colors.primary : "red"}
        />
        <Text
          className="ml-1 text-sm font-bold"
          style={{ color: isGrowth ? colors.primary : "red" }}
        >
          {isGrowth ? `+${formatAmount(diff)}` : `-${formatAmount(Math.abs(diff))}`}
        </Text>

        <Text
          className="ml-1 text-xs font-semibold"
          style={{ color: isGrowth ? colors.primary : "red" }}
        >
          ({isGrowth ? `+${diffPercent}%` : `${diffPercent}%`})
        </Text>

        <Text className="text-gray-500 text-xs ml-2">
          vs previous {selectedRange.toLowerCase()}
        </Text>
      </View>

      {/* MINI CHART */}
      <View className="mb-5">
        <Text className="text-xs text-gray-500 mb-2">Sales Trend</Text>
        <View className="flex-row items-end justify-between h-16">
          {sparkData[selectedRange].map((v, i) => (
            <View
              key={i}
              style={{
                width: 7,
                height: v * 4,
                backgroundColor: colors.primary,
                opacity: 0.35,
                borderRadius: 20,
              }}
            />
          ))}
        </View>
      </View>

      {/* BREAKDOWN */}
      {breakdown.map((item, index) => {
        const pct = Math.round((item.amount / total) * 100);

        return (
          <View key={index} className="mb-5">
            <View className="flex-row justify-between items-center mb-1">
              <View className="flex-row items-center">
                <View
                  className="w-9 h-9 rounded-xl items-center justify-center"
                 
                >
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </View>

                <Text className="ml-2 text-sm font-semibold text-gray-900">{item.title}</Text>
              </View>

              <Text className="text-sm font-bold text-gray-800">
                {formatAmount(item.amount)} ({pct}%)
              </Text>
            </View>

            {/* Percentage Bar */}
            <View
              className="h-1 rounded-full"
              style={{ backgroundColor: item.color + "30" }}
            >
              <View
                className="h-1 rounded-full"
                style={{
                  width: `${pct}%`,
                  backgroundColor: item.color,
                }}
              />
            </View>
          </View>
        );
      })}

     
    </Pressable>
  );
}
