import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const colors = {
  primary: "#2d6b06",
  primaryDark: "#245805",
  secondary: "#c7611f",
  secondaryLight: "#f7e9df",
};

const mockNotifications = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "Order #ORD-9821 has been placed.",
    time: "2 min ago",
    icon: "cart-outline",
    color: colors.primary,
    read: false,
    section: "Today",
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Received",
    message: "₹12,000 credited to wallet.",
    time: "10 min ago",
    icon: "cash-outline",
    color: "#047857",
    read: false,
    section: "Today",
  },
  {
    id: 3,
    type: "credit",
    title: "Overdue Credit Alert",
    message: "Client B Retail missed payment deadline.",
    time: "1 hour ago",
    icon: "alert-circle-outline",
    color: "#b91c1c",
    read: true,
    section: "Yesterday",
  },
  {
    id: 4,
    type: "stock",
    title: "Low Stock Alert",
    message: "Sourdough Bread is below minimum quantity.",
    time: "3 hours ago",
    icon: "trending-down-outline",
    color: "#c2410c",
    read: true,
    section: "Yesterday",
  },
  {
    id: 5,
    type: "settlement",
    title: "Weekly Settlement Ready",
    message: "This week's settlement is ready.",
    time: "2 days ago",
    icon: "wallet-outline",
    color: colors.secondary,
    read: true,
    section: "Earlier",
  },
];

export default function NotificationScreen() {
  const [activeTab, setActiveTab] = useState("all");
  const [items] = useState(mockNotifications);

  const tabs = [
    { key: "all", label: "All" },
    { key: "order", label: "Orders" },
    { key: "payment", label: "Payments" },
    { key: "credit", label: "Credit Alerts" },
    { key: "stock", label: "Stock Alerts" },
    { key: "settlement", label: "Settlements" },
    { key: "platform", label: "Announcements" },
  ];

  const filtered =
    activeTab === "all" ? items : items.filter((n) => n.type === activeTab);

  const sections = ["Today", "Yesterday", "Earlier"];

  return (
    <SafeAreaView className="flex-1 bg-white">
     <ScrollView className="px-2 pt-2">
        
        
        <View className="mb-4 mt-1">
          <Text className="text-[22px] font-extrabold text-gray-900">
            Notification
          </Text>
          <Text className="text-[12px] text-black mt-1">
            Sales, settlements & payout insights
          </Text>
        </View>
      <View className="mt-3 px-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 7,
                marginRight: 10,
                borderRadius: 30,
                backgroundColor:
                  activeTab === tab.key ? colors.secondaryLight : "#e5e7eb",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: activeTab === tab.key ? colors.secondary : "#4b5563",
                }}
              >
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* NOTIFICATION LIST */}
      <ScrollView className="px-4 mt-3 pb-20">
        {sections.map((sec) => {
          const secItems = filtered.filter((n) => n.section === sec);
          if (!secItems.length) return null;

          return (
            <View key={sec} className="mb-4">
              <Text className="text-black text-lg font-bold mb-2">{sec}</Text>

              {secItems.map((n) => (
                <View
                  key={n.id}
                  className="bg-white rounded-2xl p-4 mb-3 flex-row items-center border"
                  style={{
                    borderColor: n.read ? "#e5e7eb" : "#cbd5e1",
                  
                  }}
                >
                  {/* ICON */}
                  <View
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                     
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons name={n.icon} size={22} color={n.color} />
                  </View>

                  {/* TEXT */}
                  <View className="ml-3 flex-1">
                    <Text
                      className={`text-lg font-semibold ${
                        n.read ? "text-black" : "text-black"
                      }`}
                    >
                      {n.title}
                    </Text>

                    <Text className="text-sm text-black mt-[2px]">
                      {n.message}
                    </Text>

                    <Text className="text-[10px] text-black mt-1">
                      {n.time}
                    </Text>
                  </View>

                  {/* UNREAD DOT */}
                  {!n.read && (
                    <View className="w-3 h-3 rounded-full bg-green-600" />
                  )}
                </View>
              ))}
            </View>
          );
        })}
      </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
