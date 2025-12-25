import CsText from "@/src/components/shared/CsText";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

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
      <CsText className="text-xl font-extrabold text-black tracking-wide">
        {order.id}
     </CsText>

      <CsText className="text-gray-500 mt-1 text-[13px]">
        Delivery & Logistics Monitoring • Live Tracking
     </CsText>

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

        <CsText
          className="ml-2 text-sm font-semibold"
          style={{ color: theme.secondary }}
        >
          {order.status}
       </CsText>
      </View>

      {/* ORDER META */}
      <View className="flex-row justify-between mt-5 border-t pt-3 border-gray-200">
        <View>
          <CsText className="text-[12px] text-gray-500">Assigned To</CsText>
          <CsText className="text-[13px] font-semibold text-gray-800 mt-[2px]">
            {order.agent?.name || "Not Assigned"}
         </CsText>
        </View>

        <View className="items-end">
          <CsText className="text-[12px] text-gray-500">Status</CsText>
          <CsText
            className="text-[13px] font-semibold"
            style={{ color: theme.primary }}
          >
            {order.status}
         </CsText>
        </View>
      </View>
    </View>
  );
}
