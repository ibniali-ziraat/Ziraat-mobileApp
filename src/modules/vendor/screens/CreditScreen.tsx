// CreditScreen.js
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ---------------------------
   COLORS & THEME
   --------------------------- */
const colors = {
  primary: "#2d6b06",
  primaryDark: "#245805",
  secondary: "#c7611f",
  secondaryDark: "#a64f18",
  neutralText: "#374151",
};

/* RISK / STATUS MAPS (keep the small alpha suffix usage) */
const RISK_MAP = {
  green: {
    bg: `${colors.primary}15`,
    text: colors.primaryDark,
    bar: colors.primary,
  },
  yellow: {
    bg: `${colors.secondary}20`,
    text: colors.secondaryDark,
    bar: colors.secondary,
  },
  red: {
    bg: `${colors.secondaryDark}20`,
    text: colors.secondaryDark,
    bar: colors.secondaryDark,
  },
};

const STATUS_MAP = {
  warning: {
    bg: `${colors.secondary}20`,
    text: colors.secondaryDark,
  },
  danger: {
    bg: `${colors.secondaryDark}20`,
    text: colors.secondaryDark,
  },
  success: {
    bg: `${colors.primary}20`,
    text: colors.primaryDark,
  },
};

/* ---------------------------
   MOCK DATA
   --------------------------- */
const mockClients = [
  {
    id: 1,
    name: "Client A Corp",
    code: "CLT-A-102",
    creditLimit: 5000,
    validity: "Dec 31, 2024",
    outstanding: 1800,
    risk: "green",
  },
  {
    id: 2,
    name: "Client B Retail",
    code: "CLT-B-204",
    creditLimit: 3000,
    validity: "Jun 30, 2024",
    outstanding: 1280,
    overdue: true,
    risk: "yellow",
  },
  {
    id: 3,
    name: "Client C Mart",
    code: "CLT-C-309",
    creditLimit: 8000,
    validity: "Dec 31, 2025",
    outstanding: 0,
    risk: "red",
  },
];

const mockBills = [
  {
    id: "INV-1024",
    client: "Client A Corp",
    period: "Dec 01–07, 2024",
    amount: 1200,
    status: "Due in 3 days",
    statusType: "warning",
  },
  {
    id: "INV-1021",
    client: "Client B Retail",
    period: "Nov 01–30, 2024",
    amount: 1280,
    status: "Overdue",
    statusType: "danger",
  },
  {
    id: "INV-1018",
    client: "Client C Mart",
    period: "Oct 01–31, 2024",
    amount: 0,
    status: "Settled",
    statusType: "success",
  },
];

/* ---------------------------
   CARD STYLE (shared)
   --------------------------- */
const CARD_STYLE = {
  backgroundColor: "#fff",
  borderRadius: 14,
  padding: 16,
  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
  elevation: 3,
};

/* ---------------------------
   MAIN SCREEN
   --------------------------- */
export default function CreditScreen() {
  const [activeTab, setActiveTab] = useState("clients");
  const [discountPercent, setDiscountPercent] = useState("5");
  const [discountValidity, setDiscountValidity] = useState("30 Days");

  const [reminders, setReminders] = useState({
    dayOfPurchase: true,
    beforeDue: true,
    onDueDate: true,
    overdue: true,
  });

  // Summary metrics
  const totalOutstanding = mockClients.reduce((s, c) => s + (c.outstanding || 0), 0);
  const totalLimit = mockClients.reduce((s, c) => s + (c.creditLimit || 0), 0);
  const availableCredit = totalLimit - totalOutstanding;

  const upcomingAmount = 3200;
  const upcomingClients = 3;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4 py-4">
        {/* Header */}
        <View className="mb-3">
          <Text className="text-[22px] font-extrabold" style={{ color: colors.primaryDark }}>
            Credit Overview
          </Text>
          <Text className="text-[12px] mt-1" style={{ color: "#6b7280" }}>
            Cash & Credit Sale Management Dashboard
          </Text>
        </View>

        {/* Summary Card */}
        <View style={CARD_STYLE} className="mb-4">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-3">
              <Text className="text-xs text-black">Total Credit Outstanding</Text>

              <Text className="text-[26px] font-extrabold mt-1" style={{ color: colors.primaryDark }}>
                ₹{totalOutstanding.toLocaleString()}
              </Text>

              <Text className="text-[11px] mt-1 text-black">Total Limit: ₹{totalLimit.toLocaleString()}</Text>
            </View>

            {/* Available Credit */}
            <View className="items-end">
              <Text className="text-xs text-black mb-1">Available Credit</Text>
              <View
                className="px-4 py-[6px] rounded-full"
                style={{
                  
                  borderColor: colors.primary,
                  borderWidth: 1,
                }}
              >
                <Text className="text-xs font-bold" style={{ color: colors.primaryDark }}>
                  ₹{availableCredit.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>

          {/* Upcoming Payments */}
          <View
            className="mt-4 flex-row items-center rounded-xl"
            style={{
             
              padding: 12,
              
             
            }}
          >
            <MaterialIcons name="access-time" size={20} color={colors.secondary} />
            <View className="ml-3 flex-1">
              <Text className="text-[12px] font-semibold" style={{ color: colors.secondary }}>
                Upcoming Payments (7 Days)
              </Text>
              <Text className="text-[12px]" style={{ color: colors.secondary }}>
                ₹{upcomingAmount.toLocaleString()} due from {upcomingClients} clients
              </Text>
            </View>
            <TouchableOpacity
              className="px-3 py-2 rounded-full"
              style={{
                backgroundColor: colors.secondary,
              }}
            >
              <Text className="text-xs text-white font-semibold">View Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row p-1 mb-4">
          <TabButton label="Credit Client List" active={activeTab === "clients"} onPress={() => setActiveTab("clients")} activeColor={colors.primary} />
          <TabButton label="Billing & Statements" active={activeTab === "billing"} onPress={() => setActiveTab("billing")} activeColor={colors.secondary} />
        </View>

        {activeTab === "clients" ? (
          <>
            <Text className="text-lg text-gray-800 mb-4">{mockClients.length} credit-approved clients</Text>

            {mockClients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}

            <SettlementCard
              discountPercent={discountPercent}
              setDiscountPercent={setDiscountPercent}
              discountValidity={discountValidity}
              setDiscountValidity={setDiscountValidity}
            />

            <ReminderCard reminders={reminders} setReminders={setReminders} />
          </>
        ) : (
          <BillingTab />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}


function TabButton({ label, active, onPress, activeColor }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 mx-1 py-2 rounded-full"
      style={{
        // backgroundColor: active ? `${activeColor}20` : "#f8f8f8",
        borderWidth: active ? 1.2 : 1,
        borderColor: active ? activeColor : "#e5e7eb",
        shadowColor: active ? activeColor : "transparent",
        shadowOpacity: active ? 0.18 : 0,
        shadowRadius: active ? 6 : 0,
        elevation: active ? 2 : 0,
      }}
    >
      <Text className="text-xs font-semibold text-center" style={{ color: active ? activeColor : "#666" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}


function ClientCard({ client }) {
  const risk = RISK_MAP[client.risk] || RISK_MAP.green;
  const utilization = client.creditLimit > 0 ? Math.min(client.outstanding / client.creditLimit, 1) : 0;

  return (
    <View style={CARD_STYLE} className="mb-4">
      {/* Header */}
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-3">
          <Text className="font-semibold text-[15px]" style={{ color: colors.secondaryDark }}>
            {client.name}
          </Text>

          <Text className="text-[13px] text-black mt-[3px]">Code: {client.code}</Text>
          <Text className="text-[13px] text-black mt-[3px]">Credit Limit: ₹{client.creditLimit.toLocaleString()}</Text>
          <Text className="text-[13px] text-black mt-[3px]">Valid Thru: {client.validity}</Text>
        </View>

        {/* Risk Tag */}
        <View
          className="px-2 py-[4px] rounded-full flex-row items-center"
          style={{
            
            
          }}
        >
          <View style={{ width: 7, height: 7, borderRadius: 99, backgroundColor: risk.text }} />
          <Text className="ml-2 text-[11px] font-semibold" style={{ color: risk.text }}>
            {client.risk === "green" ? "Low Risk" : client.risk === "yellow" ? "Medium Risk" : "High Risk"}
          </Text>
        </View>
      </View>

      {/* Utilization */}
      <View className="mt-4">
        <View className="flex-row justify-between mb-[4px]">
          <Text className="text-[12px] text-black">Credit Utilisation</Text>
          <Text className="text-[11px] text-gray-700 font-medium">{Math.round(utilization * 100)}%</Text>
        </View>

        <View className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#e5e7eb" }}>
          <View
            className="h-1 rounded-full"
            style={{
              width: `${utilization * 100}%`,
              backgroundColor: client.overdue ? colors.secondaryDark : risk.bar,
              shadowColor: client.overdue ? colors.secondaryDark : risk.bar,
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 1,
            }}
          />
        </View>
      </View>

      {/* Footer */}
      <View className="flex-row justify-between items-center mt-4">
        <View>
          <Text className="text-[11px] text-black">Outstanding</Text>
          <Text
            className="text-sm font-semibold"
            style={{ color: client.overdue ? colors.secondaryDark : colors.primaryDark }}
          >
            ₹{client.outstanding.toLocaleString()}
            {client.overdue ? " (Overdue)" : ""}
          </Text>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity className="px-3 py-2 rounded-full mr-2" >
            <Text className="text-primary text-[11px] font-semibold">View Bills</Text>
          </TouchableOpacity>

          <TouchableOpacity className="px-3 py-2 rounded-full border" style={{ borderColor: colors.secondaryDark }}>
            <Text className="text-[11px] font-semibold" style={{ color: colors.secondaryDark }}>
              Restrict Credit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/* ---------------------------
   Settlement Card (enhanced)
   --------------------------- */
function SettlementCard({ discountPercent, setDiscountPercent, discountValidity, setDiscountValidity }) {
  return (
    <View
      style={[CARD_STYLE, { paddingVertical: 20, paddingHorizontal: 18 }]}
      className="mb-5"
    >
      {/* HEADER */}
      <Text className="text-[16px] font-semibold text-gray-800 mb-1">
        Settlement Discount Controls
      </Text>

      <Text className="text-[12px] text-gray-500 mb-4 leading-4">
        Automatically apply settlement discounts when customers pay within the
        configured window.
      </Text>

      {/* INPUT ROW */}
      <View className="flex-row gap-x-4">
        {/* DISCOUNT % */}
        <View className="flex-1">
          <Text className="text-[12px] font-medium text-gray-700 mb-1">
            Discount %
          </Text>

          <View
            className="rounded-xl px-3 py-2"
            style={{
              borderWidth: 1,
              borderColor: "#e5e7eb",
              backgroundColor: "#fafafa",
            }}
          >
            <TextInput
              value={discountPercent}
              onChangeText={setDiscountPercent}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#9ca3af"
              className="text-[14px] text-gray-800"
            />
          </View>
        </View>

        {/* VALIDITY */}
        <View className="flex-1">
          <Text className="text-[12px] font-medium text-gray-700 mb-1">
            Validity
          </Text>

          <View
            className="rounded-xl px-3 py-2"
            style={{
              borderWidth: 1,
              borderColor: "#e5e7eb",
              backgroundColor: "#fafafa",
            }}
          >
            <TextInput
              value={discountValidity}
              onChangeText={setDiscountValidity}
              placeholder="e.g. 30 Days"
              placeholderTextColor="#9ca3af"
              className="text-[14px] text-gray-800"
            />
          </View>
        </View>
      </View>

      {/* INFO BANNER */}
      <View
        className="mt-4 flex-row items-center px-3 py-3 rounded-xl"
        style={{
          backgroundColor: `${colors.secondary}12`,
          borderWidth: 1,
          borderColor: `${colors.secondaryDark}30`,
        }}
      >
        <Ionicons
          name="information-circle-outline"
          size={20}
          color={colors.secondaryDark}
        />
        <Text className="ml-2 text-[12px] text-gray-700 leading-4 flex-1">
          The discount will be automatically applied during the settlement workflow.
        </Text>
      </View>
    </View>
  );
}


/* ---------------------------
   Reminder Controls (enhanced)
   --------------------------- */
function ReminderCard({ reminders, setReminders }) {
  const toggleAll = (v) =>
    setReminders({
      dayOfPurchase: v,
      beforeDue: v,
      onDueDate: v,
      overdue: v,
    });

  return (
    <View style={CARD_STYLE} className="mb-6">
      <View className="flex-row justify-between items-center mb-3">
        <View>
          <Text className="text-[15px] font-semibold text-gray-800">Payment Reminders</Text>
          <Text className="text-[12px] text-gray-500">Automated notifications for clients</Text>
        </View>

        <Switch
          value={reminders.dayOfPurchase || reminders.beforeDue || reminders.onDueDate || reminders.overdue}
          onValueChange={(val) => toggleAll(val)}
          trackColor={{ false: "#d1d5db", true: colors.primary }}
          thumbColor="#fff"
        />
      </View>

      <ReminderRow label="Day of Purchase" value={reminders.dayOfPurchase} onChange={(v) => setReminders((r) => ({ ...r, dayOfPurchase: v }))} />
      <ReminderRow label="3 Days Before Due" value={reminders.beforeDue} onChange={(v) => setReminders((r) => ({ ...r, beforeDue: v }))} />
      <ReminderRow label="On Due Date" value={reminders.onDueDate} onChange={(v) => setReminders((r) => ({ ...r, onDueDate: v }))} />
      <ReminderRow label="Overdue + Penalty" value={reminders.overdue} onChange={(v) => setReminders((r) => ({ ...r, overdue: v }))} />

      <View className="mt-3 rounded-xl px-3 py-2" style={{ backgroundColor: `${colors.primary}10` }}>
        <Text className="text-[11px]" style={{ color: colors.primaryDark }}>
          View all scheduled reminders in the Credit Calendar.
        </Text>
      </View>
    </View>
  );
}

function ReminderRow({ label, value, onChange }) {
  return (
    <View className="flex-row justify-between items-center mt-3">
      <View className="flex-row items-center">
        <View className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors.primary, opacity: 0.9 }} />
        <Text className="text-sm text-gray-700">{label}</Text>
      </View>

      <Switch value={value} onValueChange={onChange} trackColor={{ false: "#d1d5db", true: colors.primary }} thumbColor="#fff" />
    </View>
  );
}

/* ---------------------------
   Billing Tab (enhanced)
   --------------------------- */
function BillingTab() {
  return (
    <View
      style={[CARD_STYLE, { paddingVertical: 20, paddingHorizontal: 18 }]}
      className="mt-2 mb-6"
    >
      {/* HEADER */}
      <Text className="text-[18px] font-bold text-gray-800 mb-4">
        Billing & Statements
      </Text>

      {/* CONSOLIDATED STATEMENTS */}
      <View className="mb-6">
        <Text className="text-[14px] font-semibold text-gray-800 mb-3">
          Consolidated Statements
        </Text>

        {/* FILTER CHIPS */}
        <View className="flex-row gap-x-3 mb-3">
          <FilterChip label="Daily" active />
          <FilterChip label="Weekly" />
          <FilterChip label="Monthly" />
        </View>

        <Text className="text-[12px] text-gray-500 leading-4">
          Generate, download or share a complete summary of all invoices within
          the selected period.
        </Text>
      </View>

      {/* INDIVIDUAL INVOICES */}
      <View className="border-t border-gray-100 pt-4">
        <Text className="text-[14px] font-semibold text-gray-800 mb-4">
          Individual Bills
        </Text>

        {mockBills.map((bill) => (
          <BillRowEnhanced key={bill.id} bill={bill} />
        ))}
      </View>

      {/* ACTION BUTTONS */}
      <View className="border-t border-gray-100 pt-4 mt-2">
        <Text className="text-[14px] font-semibold text-gray-800 mb-3">
          Invoice Actions
        </Text>

        <View className="flex-row flex-wrap gap-3 mt-1">
          <ActionPillEnhanced icon="print-outline" label="Print / PDF" />
          <ActionPillEnhanced icon="download-outline" label="Download PDF" />
          <ActionPillEnhanced icon="logo-whatsapp" label="Send via WhatsApp" />
          <ActionPillEnhanced icon="chatbox-ellipses-outline" label="Send SMS" />
          <ActionPillEnhanced icon="cloud-done-outline" label="Online Settlement" />
          <ActionPillEnhanced icon="cash-outline" label="Offline Settlement" />
        </View>
      </View>
    </View>
  );
}


/* ---------------------------
   Small UI pieces
   --------------------------- */
function FilterChip({ label, active }) {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: active ? colors.primaryDark : "#d1d5db",
        backgroundColor: active ? `${colors.primary}20` : "#f8f8f8",
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: active ? "700" : "500",
          color: active ? colors.primaryDark : "#555",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}


function ActionPillEnhanced({ icon, label }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
      }}
    >
      <Ionicons name={icon} size={16} color="#444" />
      <Text className="ml-2 text-[12px]" style={{ color: "#374151", fontWeight: "500" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}


/* ---------------------------
   Bill Row
   --------------------------- */
function BillRowEnhanced({ bill }) {
  const style = STATUS_MAP[bill.statusType];

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
    >
      <View className="flex-row justify-between items-start">
        {/* LEFT */}
        <View className="flex-1 pr-3">
          <Text className="text-[14px] font-semibold text-gray-800">
            {bill.client}
          </Text>

          <Text className="text-[12px] text-gray-600 mt-[2px]">
            {bill.id} · {bill.period}
          </Text>

          <Text className="text-[13px] text-gray-800 mt-2 font-medium">
            Amount: ₹{bill.amount.toLocaleString()}
          </Text>
        </View>

        {/* STATUS TAG + BUTTON */}
        <View className="items-end">
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 4,
              
              
              borderColor: style.text + "30",
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: "700", color: style.text }}>
              {bill.status}
            </Text>
          </View>

          <TouchableOpacity
            className="mt-3 px-4 py-2 rounded-full"
            style={{ backgroundColor: colors.primary }}
          >
            <Text className="text-[9px] text-white font-semibold">
              View Bill
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


/* ---------------------------
   STYLESHEET (shared)
   --------------------------- */
const styles = StyleSheet.create({
  billRowContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
});
