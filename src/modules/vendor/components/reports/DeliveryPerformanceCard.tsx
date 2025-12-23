import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function DeliveryPerformanceCard({ stats }) {
  return (
    <View
      className="rounded-2xl mb-6"
      style={{
       
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 },
      }}
    >
      {/* TITLE */}
      <CsText className="text-lg font-bold text-gray-900 mb-5">
        Delivery Performance
     </CsText>

      {/* EACH METRIC CARD */}
      {[
        {
          label: "On-Time Deliveries",
          sub: "Successful & punctual drops",
          value: stats.onTime,
          color: colors.primary,
          icon: "checkmark-circle",
          barColor: colors.primary,
        },
        {
          label: "Delayed Deliveries",
          sub: "Overdue or late arrivals",
          value: stats.delayed,
          color: colors.secondary,
          icon: "alert-circle",
          barColor: colors.secondary,
        },
        {
          label: "Avg Delivery Time",
          sub: "Calculated per completed trip",
          value: stats.avgTime,
          color: colors.dark,
          icon: "time",
          barColor: colors.dark,
        },
      ].map((item, i) => (
        <View
          key={i}
          className="p-4 rounded-2xl mb-4"
          style={{
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#e8e8e8",
            shadowColor: "#000",
            shadowOpacity: 0.04,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 2 },
          }}
        >
          <View className="flex-row items-center justify-between">
            {/* LEFT SIDE */}
            <View className="flex-row items-center flex-1">
              {/* Accent strip */}
              <View
                style={{
                  width: 6,
                  height: "90%",
                  backgroundColor: item.color,
                  borderRadius: 6,
                  marginRight: 14,
                }}
              />

              {/* Icon bubble */}
              <View
                className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                
              >
                <Ionicons name={item.icon} size={22} color={item.color} />
              </View>

              {/* Text */}
              <View>
                <CsText className="text-gray-900 font-semibold text-sm">
                  {item.label}
               </CsText>
                <CsText className="text-xs text-gray-500 mt-1">{item.sub}</CsText>
              </View>
            </View>

            {/* VALUE */}
            <CsText
              className="text-xl font-bold"
              style={{ color: item.color }}
            >
              {item.value}
           </CsText>
          </View>

          {/* MINI PROGRESS BAR */}
          <View className="mt-4">
            <View
              className="h-1 rounded-full bg-gray-200"
              style={{ overflow: "hidden" }}
            >
              <View
                className="h-1 rounded-full"
                style={{
                  width: `${
                    item.value > 100
                      ? 100
                      : Math.max(10, (item.value / 120) * 100)
                  }%`,
                  backgroundColor: item.barColor,
                }}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
