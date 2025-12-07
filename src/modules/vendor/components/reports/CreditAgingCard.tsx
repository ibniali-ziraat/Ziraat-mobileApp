import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

// Enable Android animations
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CreditAgingCard({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const getStatus = (days) => {
    if (days <= 30)
      return {
        label: "On Track",
        color: colors.primary,
        bg: colors.primary + "22",
        icon: "checkmark-done-outline",
        progress: 25,
      };

    if (days <= 60)
      return {
        label: "Warning",
        color: colors.secondary,
        bg: colors.secondary + "22",
        icon: "alert-outline",
        progress: 55,
      };

    if (days <= 90)
      return {
        label: "Critical",
        color: "#eab308",
        bg: "#eab30822",
        icon: "warning-outline",
        progress: 80,
      };

    return {
      label: "Overdue",
      color: "red",
      bg: "red" + "22",
      icon: "alert-circle-sharp",
      progress: 100,
    };
  };

  const toggle = (i) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <View
      className="p-5 rounded-2xl mb-2"
      style={{
       
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      }}
    >
      <Text className="text-lg font-bold text-black mb-4">
        Credit Aging Summary
      </Text>

      {items.map((item, i) => {
        const status = getStatus(item.days);
        const expanded = openIndex === i;

        return (
          <View key={i} className="mb-4">
            {/* HEADER */}
            <TouchableOpacity activeOpacity={0.9} onPress={() => toggle(i)}>
              <View
                className="flex-row items-center p-4 rounded-2xl"
                style={{
                  backgroundColor: "#fafafa",
                  borderWidth: 1,
                  borderColor: "#e8e8e8",
                  shadowColor: "#000",
                  shadowOpacity: 0.03,
                  shadowRadius: 6,
                  shadowOffset: { width: 0, height: 2 },
                }}
              >
                

                {/* Status Icon */}
                <View
                  className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: status.bg }}
                >
                  <Ionicons name={status.icon} size={20} color={status.color} />
                </View>

                {/* LABELS */}
                <View className="flex-1">
                  <Text className="text-sm font-bold text-gray-900">
                    {item.label}
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    {item.days} days outstanding
                  </Text>

                </View>

                {/* Amount + Rotating Arrow */}
                <View className="items-end">
                  <Text
                    className="text-xl font-bold"
                    style={{ color: colors.primary }}
                  >
                    {item.value}
                  </Text>

                  <Ionicons
                    name={expanded ? "chevron-up" : "chevron-down"}
                    size={22}
                    color="#777"
                    style={{
                      marginTop: 4,
                      transform: [{ rotate: expanded ? "180deg" : "0deg" }],
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>

            {/* EXPANDED SECTION */}
            {expanded && (
              <View
                className="pl-6 pr-4 pt-4 pb-5 mt-2 rounded-xl"
                style={{
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  borderColor: "#eee",
                  shadowColor: "#000",
                  shadowOpacity: 0.02,
                  shadowRadius: 4,
                }}
              >
                {/* Credit Details */}
                <View className="mb-3">
                  <Text className="text-xs text-black">Invoices Count</Text>
                  <Text className="text-[15px] font-semibold text-gray-900 mt-1">
                    {item.invoices} invoices
                  </Text>
                </View>

                <View className="my-1 h-[1px] bg-gray-200" />

                <View className="mb-3 mt-3">
                  <Text className="text-xs text-black">Last Payment</Text>
                  <Text className="text-[15px] font-semibold text-gray-900 mt-1">
                    {item.lastPayment}
                  </Text>
                </View>

                <View className="my-1 h-[1px] bg-gray-200" />

                <View className="mb-3 mt-3">
                  <Text className="text-xs text-black">Customer Notes</Text>
                  <Text className="text-gray-700 mt-1">{item.notes}</Text>
                </View>

                {/* ACTION BUTTONS */}
                <View className="flex-row justify-between mt-4">

                  {/* CALL */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="flex-row items-center px-4 py-2 rounded-full"
                    style={{
                      backgroundColor: colors.primary + "15",
                      shadowColor: "#000",
                      shadowOpacity: 0.05,
                      shadowRadius: 4,
                      shadowOffset: { width: 0, height: 2 },
                    }}
                  >
                    <Ionicons name="call" size={16} color={colors.primary} />
                    <Text
                      className="ml-2 text-xs font-semibold"
                      style={{ color: colors.primary }}
                    >
                      Call
                    </Text>
                  </TouchableOpacity>

                  {/* REMIND */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="flex-row items-center px-4 py-2 rounded-full"
                    style={{
                      backgroundColor: colors.secondary + "15",
                      shadowColor: "#000",
                      shadowOpacity: 0.05,
                      shadowRadius: 4,
                      shadowOffset: { width: 0, height: 2 },
                    }}
                  >
                    <Ionicons
                      name="notifications"
                      size={16}
                      color={colors.secondary}
                    />
                    <Text
                      className="ml-2 text-xs font-semibold"
                      style={{ color: colors.secondary }}
                    >
                      Remind
                    </Text>
                  </TouchableOpacity>

                  {/* WHATSAPP */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="flex-row items-center px-4 py-2 rounded-full"
                    style={{
                      backgroundColor: "#22c55e22",
                      shadowColor: "#000",
                      shadowOpacity: 0.05,
                      shadowRadius: 4,
                      shadowOffset: { width: 0, height: 2 },
                    }}
                  >
                    <Ionicons
                      name="logo-whatsapp"
                      size={16}
                      color="#22c55e"
                    />
                    <Text
                      className="ml-2 text-xs font-semibold"
                      style={{ color: "#22c55e" }}
                    >
                      WhatsApp
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
