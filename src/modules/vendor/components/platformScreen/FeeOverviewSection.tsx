import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function FeeOverviewSection({ colors, data }) {
  const rows = [
    {
      icon: "trending-up-outline",
      label: "Total Fee Accumulated",
      value: data.totalFee,
      note: "Fee Settled This Week",
      tint: colors.primaryLight,
      border: colors.primary,
      textColor: colors.primaryDark,
    },
    {
      icon: "hourglass-outline",
      label: "Pending Settlement",
      value: data.pending,
      note: "Not Settled This Week",
      tint: colors.secondaryLight,
      border: colors.secondaryDark,
      textColor: colors.secondaryDark,
    },
  ];

  return (
    <View className="mb-6">
      {/* Section Title */}
      <Text className="text-[17px] font-semibold text-black mb-3">
        Fee Overview
      </Text>

      {rows.map((item, index) => (
        <View
          key={index}
          className="flex-row items-center p-4 rounded-2xl mb-3"
          style={{
            backgroundColor: colors.light,
            borderColor: colors.border,
            borderWidth: 1,
            
          }}
        >
          {/* ICON BADGE */}
          <View
            className="w-12 h-12 rounded-xl items-center justify-center mr-4"
           
          >
            <Ionicons name={item.icon} size={22} color={item.textColor} />
          </View>

          {/* TEXT CONTENT */}
          <View className="flex-1">
            <Text className="text-[13px] font-medium text-black">
              {item.label}
            </Text>

            <Text
              className="text-[20px] font-semibold mt-1"
              style={{ color: item.textColor }}
            >
              {item.value}
            </Text>

            <Text className="text-[11px] text-black mt-1">
              {item.note}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
