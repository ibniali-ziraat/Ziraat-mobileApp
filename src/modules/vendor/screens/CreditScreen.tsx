// CreditScreen.js
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View
} from "react-native";

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

/* RISK / STATUS MAPS */
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
  { id: 1, name: "Client A Corp", code: "CLT-A-102", creditLimit: 5000, validity: "Dec 31, 2024", outstanding: 1800, risk: "green" },
  { id: 2, name: "Client B Retail", code: "CLT-B-204", creditLimit: 3000, validity: "Jun 30, 2024", outstanding: 1280, overdue: true, risk: "yellow" },
  { id: 3, name: "Client C Mart", code: "CLT-C-309", creditLimit: 8000, validity: "Dec 31, 2025", outstanding: 0, risk: "red" },
];

const mockBills = [
  { id: "INV-1024", client: "Client A Corp", period: "Dec 01–07, 2024", amount: 1200, status: "Due in 3 days", statusType: "warning" },
  { id: "INV-1021", client: "Client B Retail", period: "Nov 01–30, 2024", amount: 1280, status: "Overdue", statusType: "danger" },
  { id: "INV-1018", client: "Client C Mart", period: "Oct 01–31, 2024", amount: 0, status: "Settled", statusType: "success" },
];

/* ---------------------------
   SHARED CARD STYLE
   --------------------------- */
const CARD_STYLE = {
  backgroundColor: "#fff",
  borderRadius: 16,
  padding: 16,
  shadowColor: "#000",
  shadowOpacity: Platform.OS === "ios" ? 0.08 : 0.1,
  shadowRadius: 8,
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

  const totalOutstanding = mockClients.reduce((s, c) => s + (c.outstanding || 0), 0);
  const totalLimit = mockClients.reduce((s, c) => s + (c.creditLimit || 0), 0);
  const availableCredit = totalLimit - totalOutstanding;

  const upcomingAmount = 3200;
  const upcomingClients = 3;

  return (
    <ScreenLayout>
      <ScrollView
        contentContainerStyle={{
         
          paddingBottom: 90,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* SUMMARY CARD */}
        <View style={CARD_STYLE} className="mb-5">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-3">
              <CsText className="text-xs text-black opacity-70">
                Total Credit Outstanding
             </CsText>

              <CsText
                className="text-[26px] font-extrabold mt-1"
                style={{ color: colors.primaryDark }}
              >
                ₹{totalOutstanding.toLocaleString()}
             </CsText>

              <CsText className="text-[11px] mt-1 text-black opacity-70">
                Total Limit: ₹{totalLimit.toLocaleString()}
             </CsText>
            </View>

            {/* Available Credit */}
            <View className="items-end">
              <CsText className="text-xs text-black opacity-70 mb-1">
                Available Credit
             </CsText>
              <View
                className="py-[6px] px-3 rounded-full"
                style={{
                  borderColor: colors.primary,
                  borderWidth: 1,
                }}
              >
                <CsText className="text-xs font-bold" style={{ color: colors.primaryDark }}>
                  ₹{availableCredit.toLocaleString()}
               </CsText>
              </View>
            </View>
          </View>

          {/* Upcoming Payments */}
          <View
            className="mt-4 flex-row items-center rounded-xl"
            style={
              
              {
              padding: 12,
              backgroundColor: colors.secondary + "10",
            }}
          >
            <MaterialIcons name="access-time" size={20} color={colors.secondary} />
            <View className="ml-3 flex-1">
              <CsText className="text-[12px] font-semibold" style={{ color: colors.secondaryDark }}>
                Upcoming Payments (7 Days)
             </CsText>
              <CsText className="text-[12px]" style={{ color: colors.secondaryDark }}>
                ₹{upcomingAmount.toLocaleString()} due from {upcomingClients} clients
             </CsText>
            </View>
            <TouchableOpacity
              className="px-3 py-2 rounded-full"
              style={{ backgroundColor: colors.secondary }}
            >
              <CsText className="text-xs text-white font-semibold">View Calendar</CsText>
            </TouchableOpacity>
          </View>
        </View>

        {/* TABS */}
        <View className="flex-row mb-4">
          <TabButton
            label="Credit Client List"
            active={activeTab === "clients"}
            onPress={() => setActiveTab("clients")}
            activeColor={colors.primary}
          />
          <TabButton
            label="Billing & Statements"
            active={activeTab === "billing"}
            onPress={() => setActiveTab("billing")}
            activeColor={colors.secondary}
          />
        </View>

        {activeTab === "clients" ? (
          <>
            <CsText className="text-lg text-gray-800 mb-4">
              {mockClients.length} credit-approved clients
           </CsText>

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
    </ScreenLayout>
  );
}

/* ---------------------------
   TAB BUTTON
   --------------------------- */
function TabButton({ label, active, onPress, activeColor }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 mx-1 py-2 rounded-full"
      style={{
        borderWidth: active ? 1.3 : 1,
        borderColor: active ? activeColor : "#e5e7eb",
        backgroundColor: active ? activeColor + "10" : "#fafafa",
        shadowColor: active ? activeColor : "transparent",
        shadowOpacity: active ? 0.15 : 0,
        shadowRadius: active ? 5 : 0,
        elevation: active ? 2 : 0,
      }}
    >
      <CsText
        className="text-xs font-semibold text-center"
        style={{ color: active ? activeColor : "#666" }}
      >
        {label}
     </CsText>
    </TouchableOpacity>
  );
}


function ClientCard({ client }) {
  const risk = RISK_MAP[client.risk] || RISK_MAP.green;
  const utilization = client.creditLimit > 0 ? Math.min(client.outstanding / client.creditLimit, 1) : 0;

  return (
    <View style={CARD_STYLE} className="mb-4 px-4 py-5">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <CsText
            className="font-semibold text-[15px]"
            style={{ color: colors.secondaryDark,
              
             }}
          >
            {client.name}
         </CsText>

          <CsText className="text-[13px] text-gray-700 mt-[3px]">Code: {client.code}</CsText>
          <CsText className="text-[13px] text-gray-700 mt-[3px]">Credit Limit: ₹{client.creditLimit.toLocaleString()}</CsText>
          <CsText className="text-[13px] text-gray-700 mt-[3px]">Valid Thru: {client.validity}</CsText>
        </View>

        <View
          className="px-2 py-[4px] rounded-full flex-row items-center"
          style={{ backgroundColor: risk.bg }}
        >
          <View style={{ width: 7, height: 7, borderRadius: 99, backgroundColor: risk.text }} />
          <CsText className="ml-2 text-[11px] font-semibold" style={{ color: risk.text }}>
            {client.risk === "green" ? "Low Risk" : client.risk === "yellow" ? "Medium Risk" : "High Risk"}
         </CsText>
        </View>
      </View>

      {/* Utilization Bar */}
      <View className="mt-4">
        <View className="flex-row justify-between mb-[4px]">
          <CsText className="text-lg text-gray-800">Credit Utilisation</CsText>
          <CsText className="text-[11px] text-gray-700 font-medium">
            {Math.round(utilization * 100)}%
         </CsText>
        </View>

        <View className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#e5e7eb" }}>
          <View
            className="h-full rounded-full"
            style={{
              width: `${utilization * 100}%`,
              backgroundColor: client.overdue ? colors.secondaryDark : risk.bar,
            }}
          />
        </View>
      </View>

      {/* Footer */}
      <View className="flex-row justify-between items-center mt-4">
        <View>
          <CsText className="text-[11px] text-gray-700">Outstanding</CsText>
          <CsText
            className="text-sm font-semibold"
            style={{ color: client.overdue ? colors.secondaryDark : colors.primaryDark }}
          >
            ₹{client.outstanding.toLocaleString()}
            {client.overdue ? " (Overdue)" : ""}
         </CsText>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity className="px-3 py-2 rounded-full mr-2">
            <CsText className="text-primary text-[11px] font-semibold">View Bills</CsText>
          </TouchableOpacity>

          <TouchableOpacity className="px-3 py-2 rounded-full border" style={{ borderColor: colors.secondaryDark }}>
            <CsText className="text-[11px] font-semibold" style={{ color: colors.secondaryDark }}>
              Restrict Credit
           </CsText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/* ---------------------------
   Settlement Card
   --------------------------- */
function SettlementCard({ discountPercent, setDiscountPercent, discountValidity, setDiscountValidity }) {
  return (
    <View style={[CARD_STYLE, { paddingVertical: 20 }]} className="mb-5 px-5">
      <CsText className="text-[16px] font-semibold text-gray-800 mb-1">
        Settlement Discount Controls
     </CsText>

      <CsText className="text-[12px] text-gray-500 mb-4 leading-4">
        Automatically apply settlement discounts when customers pay within the configured window.
     </CsText>

      {/* Inputs */}
      <View className="flex-row gap-x-4">
        <View className="flex-1">
          <CsText className="text-[12px] font-medium text-gray-700 mb-1">
            Discount %
         </CsText>

          <View
            className="rounded-xl px-3 py-2"
            style={{
              borderWidth: 1,
              borderColor: "#e5e7eb",
              backgroundColor: "#fafafa",
            }}
          >
            <CsTextInput
              value={discountPercent}
              onChangeText={setDiscountPercent}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#9ca3af"
              className="text-[14px] text-gray-800"
            />
          </View>
        </View>

        <View className="flex-1">
          <CsText className="text-[12px] font-medium text-gray-700 mb-1">
            Validity
         </CsText>

          <View
            className="rounded-xl px-3 py-2"
            style={{
              borderWidth: 1,
              borderColor: "#e5e7eb",
              backgroundColor: "#fafafa",
            }}
          >
            <CsTextInput
              value={discountValidity}
              onChangeText={setDiscountValidity}
              placeholder="e.g. 30 Days"
              placeholderTextColor="#9ca3af"
              className="text-[14px] text-gray-800"
            />
          </View>
        </View>
      </View>

      {/* Info Banner */}
      <View
        className="mt-4 flex-row items-center px-3 py-3 rounded-xl"
        style={{
          backgroundColor: `${colors.secondary}12`,
          borderWidth: 1,
          borderColor: `${colors.secondaryDark}30`,
        }}
      >
        <Ionicons name="information-circle-outline" size={20} color={colors.secondaryDark} />
        <CsText className="ml-2 text-[12px] text-gray-700 leading-4 flex-1">
          The discount will be automatically applied during the settlement workflow.
       </CsText>
      </View>
    </View>
  );
}

/* ---------------------------
   Reminder Card
   --------------------------- */
function ReminderCard({ reminders, setReminders }) {
  const toggleAll = (value) =>
    setReminders({
      dayOfPurchase: value,
      beforeDue: value,
      onDueDate: value,
      overdue: value,
    });

  return (
    <View style={CARD_STYLE} className="mb-6 px-5 py-5">
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <CsText className="text-[15px] font-semibold text-gray-800">
            Payment Reminders
         </CsText>
          <CsText className="text-[12px] text-gray-500">
            Automated notifications for clients
         </CsText>
        </View>

        <Switch
          value={
            reminders.dayOfPurchase ||
            reminders.beforeDue ||
            reminders.onDueDate ||
            reminders.overdue
          }
          onValueChange={toggleAll}
          trackColor={{ false: "#d1d5db", true: colors.primary }}
          thumbColor="#fff"
        />
      </View>

      {/* Rows */}
      <ReminderRow label="Day of Purchase" value={reminders.dayOfPurchase} onChange={(v) => setReminders((r) => ({ ...r, dayOfPurchase: v }))} />
      <ReminderRow label="3 Days Before Due" value={reminders.beforeDue} onChange={(v) => setReminders((r) => ({ ...r, beforeDue: v }))} />
      <ReminderRow label="On Due Date" value={reminders.onDueDate} onChange={(v) => setReminders((r) => ({ ...r, onDueDate: v }))} />
      <ReminderRow label="Overdue + Penalty" value={reminders.overdue} onChange={(v) => setReminders((r) => ({ ...r, overdue: v }))} />

      <View className="mt-4 rounded-xl px-3 py-2" style={{ backgroundColor: `${colors.primary}10` }}>
        <CsText className="text-[11px]" style={{ color: colors.primaryDark }}>
          View all scheduled reminders in the Credit Calendar.
       </CsText>
      </View>
    </View>
  );
}

function ReminderRow({ label, value, onChange }) {
  return (
    <View className="flex-row justify-between items-center mt-3">
      <View className="flex-row items-center">
        <View className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors.primary, opacity: 0.9 }} />
        <CsText className="text-sm text-gray-700">{label}</CsText>
      </View>

      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#d1d5db", true: colors.primary }}
        thumbColor="#fff"
      />
    </View>
  );
}

/* ---------------------------
   Billing Tab
   --------------------------- */
function BillingTab() {
  return (
    <View style={[CARD_STYLE, { paddingVertical: 20 }]} className="mt-2 mb-6 px-5">
      {/* HEADER */}
      <CsText className="text-[18px] font-bold text-gray-800 mb-4">
        Billing & Statements
     </CsText>

      {/* Consolidated Statements */}
      <View className="mb-6">
        <CsText className="text-[14px] font-semibold text-gray-800 mb-3">
          Consolidated Statements
       </CsText>

        <View className="flex-row gap-x-3 mb-3">
          <FilterChip label="Daily" active />
          <FilterChip label="Weekly" />
          <FilterChip label="Monthly" />
        </View>

        <CsText className="text-[12px] text-gray-500 leading-4">
          Generate, download or share summaries for all invoices.
       </CsText>
      </View>

      {/* Individual Bills */}
      <View className="border-t border-gray-100 pt-4">
        <CsText className="text-[14px] font-semibold text-gray-800 mb-4">
          Individual Bills
       </CsText>

        {mockBills.map((bill) => (
          <BillRowEnhanced key={bill.id} bill={bill} />
        ))}
      </View>

      {/* ACTION BUTTONS */}
      <View className="border-t border-gray-100 pt-4 mt-2">
        <CsText className="text-[14px] font-semibold text-gray-800 mb-3">
          Invoice Actions
       </CsText>

        <View className="flex-row flex-wrap gap-3">
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
   Small UI Elements
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
      <CsText
        style={{
          fontSize: 12,
          fontWeight: active ? "700" : "500",
          color: active ? colors.primaryDark : "#555",
        }}
      >
        {label}
     </CsText>
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
      <CsText className="ml-2 text-[12px]" style={{ color: "#374151", fontWeight: "500" }}>
        {label}
     </CsText>
    </TouchableOpacity>
  );
}

/* ---------------------------
   BILL ROW
   --------------------------- */
function BillRowEnhanced({ bill }) {
  const style = STATUS_MAP[bill.statusType];

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <View className="flex-row justify-between items-start">
        {/* LEFT */}
        <View className="flex-1 pr-4">
          <CsText className="text-[14px] font-semibold text-gray-800">
            {bill.client}
         </CsText>

          <CsText className="text-[12px] text-gray-600 mt-[2px]">
            {bill.id} · {bill.period}
         </CsText>

          <CsText className="text-[13px] text-gray-800 mt-2 font-medium">
            Amount: ₹{bill.amount.toLocaleString()}
         </CsText>
        </View>

        {/* STATUS + ACTION */}
        <View className="items-end">
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 4,
              backgroundColor: style.bg,
              borderRadius: 10,
              borderColor: style.text + "30",
              borderWidth: 1,
            }}
          >
            <CsText style={{ fontSize: 11, fontWeight: "700", color: style.text }}>
              {bill.status}
           </CsText>
          </View>

          <TouchableOpacity
            className="mt-3 px-4 py-2 rounded-full"
            style={{ backgroundColor: colors.primary }}
          >
            <CsText className="text-[10px] text-white font-semibold">
              View Bill
           </CsText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/* ---------------------------
   Styles (Shared)
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
