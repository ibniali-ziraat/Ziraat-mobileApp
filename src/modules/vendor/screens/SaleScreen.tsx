import ScreenLayout from "@/src/components/shared/ScreenLayout";
import SalesSummaryCard from "@/src/modules/vendor/components/SalesSummaryCard";
import SalesTabs from "@/src/modules/vendor/components/SalesTabs";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const colors = {
  primary: "#2d6b06",
  primaryHover: "#245805",
  secondary: "#c7611f",
  secondaryHover: "#a64f18",
  dark: "#222222",
  light: "#ffffff",
  neutral: "#D9D9D980",
  error: "#f44336",
};

export default function SalesScreen() {
  const summaryData = {
    daily: { cash: 12000, credit: 9500, fee: 900, discount: 600 },
    weekly: { cash: 78000, credit: 64000, fee: 5200, discount: 4100 },
    monthly: { cash: 310000, credit: 285000, fee: 21000, discount: 16800 },
  };

  const transactions = [
    { id: "INV-20341", client: "Client A Corp", amount: 12500, status: "Settled" },
    { id: "INV-20342", client: "Client B Retail", amount: 9800, status: "Pending" },
    { id: "INV-20343", client: "Client C Mart", amount: 15200, status: "Overdue" },
  ];

  const [tab, setTab] = useState("daily");
  const data = summaryData[tab];
  const net = data.cash + data.credit - data.fee - data.discount;

  return (
    <ScreenLayout >
      <ScrollView
        className="px-4 pt-4"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* SALES SUMMARY */}
        <Animated.View entering={FadeInUp.delay(80)}>
          <PageTitle title="Sales Summary" />
          <SalesTabs tab={tab} setTab={setTab} />
          <SalesSummaryCard data={data} net={net} />
        </Animated.View>

        {/* CASH SALES */}
        <Animated.View entering={FadeInUp.delay(150)}>
          <SectionHeader title="Cash Sales" icon="cash-outline" />

          <Card>
            <IconRow
              label="Create Cash Invoice"
              value="Start"
              icon="receipt-outline"
              color={colors.primary}
              highlight
            />

            <Divider />

            <IconRow
              label="Cash-only Discounts"
              value="Auto-applied"
              icon="pricetags-outline"
              color={colors.secondary}
            />

            <Divider />

            <IconRow
              label="Platform Fee"
              value="Auto-calculated"
              icon="settings-outline"
              color={colors.primary}
            />
          </Card>
        </Animated.View>

        {/* TRANSACTIONS */}
        <Animated.View entering={FadeInUp.delay(250)}>
          <SectionHeader title="Recent Transactions" icon="reader-outline" />

          <Card>
            <View className="mt-1">
              {transactions.map((item) => (
                <TransactionRow
                  key={item.id}
                  id={item.id}
                  client={item.client}
                  amount={item.amount}
                  status={item.status}
                />
              ))}
            </View>
          </Card>
        </Animated.View>
      </ScrollView>
    </ScreenLayout>
  );
}

/* ------------------------
   SMALL COMPONENTS
   ------------------------ */
function PageTitle({ title }) {
  return (
    <Text className="text-[18px] font-semibold text-gray-900 mb-3">
      {title}
    </Text>
  );
}

function Card({ children }) {
  return (
    <View
      className="rounded-2xl bg-white p-4 mb-6"
      style={{
        borderColor: "#E5E7EB",
        borderWidth: 1,
        shadowColor: "#000",
       
        shadowRadius: 6,
        
        elevation: 3,
      }}
    >
      {children}
    </View>
  );
}

function SectionHeader({ title, icon }) {
  return (
    <View className="flex-row items-center mt-8 mb-4">
      <View
        className="w-10 h-10 rounded-xl items-center justify-center mr-3"
        style={{ backgroundColor: "#EFEFEF" }}
      >
        <Ionicons name={icon} size={18} color="#444" />
      </View>

      <Text className="text-[16px] font-semibold text-gray-900">{title}</Text>
    </View>
  );
}

function Divider() {
  return <View className="border-b my-3" style={{ borderColor: "#E5E7EB" }} />;
}

function IconRow({ label, value, icon, color, highlight }) {
  return (
    <View
      className={`flex-row justify-between items-center py-3 px-1 rounded-xl ${
        highlight ? "bg-gray-100" : ""
      }`}
      style={{
        borderRadius: 14,
      }}
    >
      <View className="flex-row items-center">
        <View
          className="w-9 h-9 rounded-xl items-center justify-center mr-3"
          style={{ backgroundColor: `${color}22` }}
        >
          <Ionicons name={icon} size={18} color={color} />
        </View>

        <Text className="text-[14px] font-medium text-gray-800">{label}</Text>
      </View>

      <Text className="text-[13px] font-semibold" style={{ color }}>
        {value}
      </Text>
    </View>
  );
}

function TransactionRow({ id, client, amount, status }) {
  const statusColor = {
    Settled: colors.primary,
    Pending: colors.secondary,
    Overdue: colors.error,
  }[status];

  const statusIcon = {
    Settled: "checkmark-circle-outline",
    Pending: "time-outline",
    Overdue: "alert-circle-outline",
  }[status];

  return (
    <View
      className="p-4 mb-3 rounded-2xl"
      style={{
        backgroundColor: "#FAFAFA",
        borderColor: "#E6E6E6",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOpacity: Platform.OS === "ios" ? 0.05 : 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
    >
      {/* TOP ROW */}
      <View className="flex-row justify-between items-center">
        <Text className="text-[15px] font-semibold text-gray-900">{id}</Text>

        <Text className="text-[15px] font-bold" style={{ color: statusColor }}>
          ₹{amount.toLocaleString()}
        </Text>
      </View>

      {/* BOTTOM ROW */}
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-[12px] text-gray-600">{client}</Text>

        <View
          className="flex-row items-center px-3 py-[4px] rounded-full"
          style={{ backgroundColor: `${statusColor}20` }}
        >
          <Ionicons name={statusIcon} size={14} color={statusColor} style={{ marginRight: 4 }} />

          <Text className="text-[11px] font-semibold" style={{ color: statusColor }}>
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
}
