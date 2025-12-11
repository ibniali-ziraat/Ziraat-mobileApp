import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function DeliveryHeaderCard({ order, theme }) {
  return (
    <View
      className="rounded-3xl  mb-6"
      
    >
      {/* TOP ACCENT LINE */}
      <View
        style={{
          height: 4,
          width: 60,
          borderRadius: 20,
          backgroundColor: theme.primary,
          marginBottom: 14,
        }}
      />

      {/* ORDER ID */}
      <Text className="text-xl font-extrabold text-black tracking-wide">
        {order.id}
      </Text>

      <Text className="text-gray-500 mt-1 text-[13px]">
        Delivery & Logistics Monitoring • Live Tracking
      </Text>

      {/* STATUS CHIP */}
      <View
        className="flex-row items-center mt-4 px-3 py-[6px] rounded-full self-start"
        
      >
        <Ionicons
          name={
            order.status === "Delivered"
              ? "checkmark-circle-outline"
              : order.status === "Out for Delivery"
              ? "bicycle-outline"
              : order.status === "Pending"
              ? "time-outline"
              : "alert-circle-outline"
          }
          size={22}
          color={theme.secondary}
        />

        <Text
          className="ml-2 text-sm font-semibold"
          style={{ color: theme.secondary }}
        >
          {order.status}
        </Text>
      </View>

      {/* ORDER META */}
      <View className="flex-row justify-between mt-5 border-t pt-3 border-gray-200">
        <View>
          <Text className="text-[12px] text-gray-500">Assigned To</Text>
          <Text className="text-[13px] font-semibold text-gray-800 mt-[2px]">
            {order.agent?.name || "Not Assigned"}
          </Text>
        </View>

        <View className="items-end">
          <Text className="text-[12px] text-gray-500">Status</Text>
          <Text
            className="text-[13px] font-semibold"
            style={{ color: theme.primary }}
          >
            {order.status}
          </Text>
        </View>
      </View>
    </View>
  );
}
