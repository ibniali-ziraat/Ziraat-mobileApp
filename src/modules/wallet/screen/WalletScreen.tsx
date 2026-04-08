import BackHeader from "@/src/components/shared/BackHeader";
import { colors } from "@/src/constants/colors";
import {
    ArrowDownCircle, ArrowUpCircle,
    Building2,
    CircleCheck, CreditCard, Plus, ReceiptText,
    Smartphone, TrendingDown, TrendingUp, Wallet, X, Zap
} from "lucide-react-native";
import { useRef, useState } from "react";
import {
    Alert, Animated, Modal, Pressable, ScrollView, Text, TextInput,
    View
} from "react-native";

// ── HELPERS ──────────────────────────────────────────────────
const fmt = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

// ── TYPES ────────────────────────────────────────────────────
type TxType = "credit" | "debit";
type AddPayMethod = "card" | "upi" | "bank";

type Transaction = {
  id: string;
  type: TxType;
  label: string;
  sub: string;
  amount: number;
  date: string;
};

// ── DATA ─────────────────────────────────────────────────────
const INITIAL_BALANCE = 3200;

const INITIAL_TXS: Transaction[] = [
  { id: "1", type: "credit", label: "Added via UPI",   sub: "PhonePe · Auto top-up", amount: 2000, date: "Mar 28" },
  { id: "2", type: "debit",  label: "Order #ORD-8821", sub: "Wireless Headphones",   amount: 1500, date: "Mar 22" },
  { id: "3", type: "credit", label: "Cashback Reward", sub: "5% on last order",      amount: 120,  date: "Mar 22" },
  { id: "4", type: "credit", label: "Added via Card",  sub: "Visa •••• 4242",        amount: 1000, date: "Mar 10" },
  { id: "5", type: "debit",  label: "Order #ORD-7714", sub: "GaN Charger 65W",       amount: 420,  date: "Feb 28" },
  { id: "6", type: "debit",  label: "Order #ORD-7201", sub: "Smart Fitness Watch",   amount: 980,  date: "Feb 14" },
];

const QUICK_AMOUNTS = [
  { value: 500,   tag: "Popular"      },
  { value: 1000,  tag: "+₹10 bonus"  },
  { value: 2000,  tag: "+₹30 bonus"  },
  { value: 5000,  tag: "+₹100 bonus" },
  { value: 10000, tag: "+₹250 bonus" },
];


export default function WalletComponent() {
  const [balance, setBalance]             = useState(INITIAL_BALANCE);
  const [txs, setTxs]                     = useState<Transaction[]>(INITIAL_TXS);
  const [modalVisible, setModalVisible]   = useState(false);
  const [selectedQuick, setSelectedQuick] = useState(500);
  const [customAmt, setCustomAmt]         = useState("500");
  const [payMethod, setPayMethod]         = useState<AddPayMethod>("card");
  const [toastVisible, setToastVisible]   = useState(false);
  const [toastMsg, setToastMsg]           = useState({ title: "", sub: "" });
  const toastAnim                         = useRef(new Animated.Value(0)).current;

  
  const totalAdded = txs.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0);
  const totalUsed  = txs.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0);
 

  
  const handleConfirm = () => {
    const amt = parseInt(customAmt, 10);
    if (!amt || amt < 1) { Alert.alert("Invalid Amount", "Please enter a valid amount."); return; }
    const newBal = balance + amt;
    setBalance(newBal);
    setTxs((prev) => [{
      id: Date.now().toString(), type: "credit", label: "Added to Wallet",
      sub: payMethod === "card" ? "Debit/Credit Card" : payMethod === "upi" ? "UPI Payment" : "Net Banking",
      amount: amt, date: "Today",
    }, ...prev]);
    setModalVisible(false);
    showToast(`${fmt(amt)} Added!`, `New balance: ${fmt(newBal)}`);
  };

  // ── TOAST ────────────────────────────────────────────────
  const showToast = (title: string, sub: string) => {
    setToastMsg({ title, sub });
    setToastVisible(true);
    Animated.sequence([
      Animated.timing(toastAnim, { toValue: 1, duration: 320, useNativeDriver: true }),
      Animated.delay(2600),
      Animated.timing(toastAnim, { toValue: 0, duration: 280, useNativeDriver: true }),
    ]).start(() => setToastVisible(false));
  };

  // ─────────────────────────────────────────────────────────
  return (
    <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
      <BackHeader title="Wallet" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 48, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
      >

       
        <View
          style={{
            backgroundColor: colors.primary,
            borderRadius: 22,
            padding: 22,
            marginBottom: 20,
           
          }}
        >
          {/* Top row */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <View
              style={{
                width: 38, height: 38, borderRadius: 12,
            backgroundColor: colors.cardBorder,
                alignItems: "center", justifyContent: "center",
              }}
            >
              <Wallet size={18} color={colors.light} strokeWidth={2.2} />
            </View>

            <Pressable
              onPress={() => setModalVisible(true)}
             
              style={{
                flexDirection: "row", alignItems: "center", gap: 5,
                backgroundColor: colors.cardBorder,
                borderRadius: 10, paddingVertical: 8, paddingHorizontal: 14,
              }}
            >
              <Plus size={13} color={colors.light} strokeWidth={2.5} />
              <Text style={{ fontSize: 13, fontWeight: "600", color: colors.light }}>Add Money</Text>
            </Pressable>
          </View>

          {/* Label */}
          <Text
            style={{
              fontSize: 10, fontWeight: "600", letterSpacing: 1.8,
          color: colors.light, textTransform: "uppercase", marginBottom: 4,
            }}
          >
            Available Balance
          </Text>

          {/* Amount */}
          <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 2 }}>
            <Text style={{ fontSize: 20, fontWeight: "700", color: colors.light, marginBottom: 5 }}>₹</Text>
            <Text style={{ fontSize: 44, fontWeight: "700", color: colors.light, lineHeight: 50 }}>
              {balance.toLocaleString("en-IN")}
            </Text>
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: colors.cardBorder, marginVertical: 16 }} />

          {/* Mini stats */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <TrendingUp size={13} color={colors.light} strokeWidth={2} />
              <Text style={{ fontSize: 12,color: colors.light, fontWeight: "500" }}>
                Added {fmt(totalAdded)}
              </Text>
            </View>
            <View style={{ width: 3, height: 3, borderRadius: 2, backgroundColor: colors.light }} />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <TrendingDown size={13} color={colors.light} strokeWidth={2} />
              <Text style={{ fontSize: 12, color: colors.light,fontWeight: "500" }}>
                Spent {fmt(totalUsed)}
              </Text>
            </View>
          </View>
        </View>

    
        <View
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  }}
>
  {/* LEFT SECTION */}
  <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
    
    {/* Icon badge */}
    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: 12,
      
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ReceiptText size={20} color={colors.secondary} strokeWidth={2} />
    </View>

    {/* Title + subtitle */}
    <View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "800",
          color: colors.neutral,
          marginTop:6,
        }}
      >
        Wallet Statement
      </Text>

      <Text
        style={{
          fontSize: 12,
         color: colors.neutral,
          marginTop: 2,
        }}
      >
        Recent activity
      </Text>
    </View>
  </View>

  
</View>

        <View
          style={{
            backgroundColor: colors.light,
            borderRadius: 18,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: colors.cardBorder,
           
          }}
        >
          {txs.map((tx, idx) => (
            <TxRow key={tx.id} tx={tx} last={idx === txs.length - 1} />
          ))}
        </View>

      </ScrollView>

   
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: colors.overlay, justifyContent: "flex-end" }}>
          <View
            style={{
              backgroundColor: colors.light,
              borderTopLeftRadius: 26, borderTopRightRadius: 26,
              padding: 24, paddingBottom: 40,
            }}
          >
            {/* Handle */}
            <View style={{ width: 38, height: 4, borderRadius: 2, backgroundColor: colors.overlay, alignSelf: "center", marginBottom: 22 }} />

            {/* Header */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: "700", color: colors.neutral }}>Add Money</Text>
                <Text style={{ fontSize: 13,  marginTop: 3 }}>Top up your wallet instantly</Text>
              </View>
             <Pressable
  onPress={() => setModalVisible(false)}
  style={{
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.bgColor, 
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <X size={16} color={colors.neutral} strokeWidth={2.5} />
</Pressable>
            </View>

            {/* Quick Select */}
            <Text style={{ fontSize: 10, fontWeight: "700", letterSpacing: 1.4, textTransform: "uppercase",  marginBottom: 10 }}>
              Quick Select
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {QUICK_AMOUNTS.map((q) => {
                const active = selectedQuick === q.value;
                return (
                  <Pressable
                    key={q.value}
                    onPress={() => { setSelectedQuick(q.value); setCustomAmt(String(q.value)); }}
                    style={{
                      flex: 1, minWidth: "28%", alignItems: "center",
                      paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12,
                      backgroundColor: active ? "#edfae6" : "#f5f5f5",
                      borderWidth: 1, borderColor: active ? colors.primary : colors.cardBorder,
                    }}
                  >
                    <Text style={{ fontSize: 14, fontWeight: "700", color: active ? colors.primary : colors.neutral }}>
                      {fmt(q.value)}
                    </Text>
                    <Text style={{ fontSize: 10, color: colors.overlay, marginTop: 3 }}>{q.tag}</Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Custom Amount */}
            <Text style={{ fontSize: 10, fontWeight: "700", letterSpacing: 1.4, textTransform: "uppercase",  marginBottom: 10 }}>
              Custom Amount
            </Text>
            <View
              style={{
                flexDirection: "row", alignItems: "center",
                backgroundColor: "#f7f7f7", borderRadius: 14,
                borderWidth: 1, borderColor: colors.cardBorder,
                paddingHorizontal: 16, marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: "700", color: colors.primary, marginRight: 4 }}>₹</Text>
              <TextInput
                value={customAmt}
                onChangeText={(v) => { setCustomAmt(v.replace(/[^0-9]/g, "")); setSelectedQuick(0); }}
                keyboardType="numeric"
                placeholder="Enter amount"
              
                style={{ flex: 1, fontSize: 24, fontWeight: "700", color: colors.neutral, paddingVertical: 13 }}
              />
            </View>

            {/* Pay Via */}
            <Text style={{ fontSize: 10, fontWeight: "700", letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 10 }}>
              Pay Via
            </Text>
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 22 }}>
              {(
                [
                  { key: "card" as AddPayMethod, Icon: CreditCard, label: "Card" },
                  { key: "upi"  as AddPayMethod, Icon: Smartphone, label: "UPI"  },
                  { key: "bank" as AddPayMethod, Icon: Building2,  label: "Bank" },
                ]
              ).map(({ key, Icon, label }) => {
                const active = payMethod === key;
                return (
                  <Pressable
                    key={key}
                    onPress={() => setPayMethod(key)}
                    style={{
                      flex: 1, alignItems: "center", justifyContent: "center", gap: 6,
                      paddingVertical: 12, borderRadius: 14,
                      backgroundColor: active ? "#edfae6" : "#f5f5f5",
                      borderWidth: 1, borderColor: active ? colors.primary : colors.cardBorder,
                    }}
                  >
                    <Icon size={18} color={active ? colors.primary : colors.overlay} strokeWidth={2} />
                    <Text style={{ fontSize: 12, fontWeight: "600", color: active ? colors.primary : colors.overlay}}>
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Confirm Button */}
            <Pressable
              onPress={handleConfirm}
            
              style={{
                flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
                backgroundColor: colors.primary, borderRadius: 16, paddingVertical: 16,
                shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.28, shadowRadius: 10, elevation: 4,
              }}
            >
              <Zap size={16} color={colors.light} strokeWidth={2.2} />
              <Text style={{ fontSize: 16, fontWeight: "700", color: colors.light }}>
                Add {customAmt ? fmt(parseInt(customAmt, 10) || 0) : "₹0"} to Wallet
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* ── TOAST ────────────────────────────────────────── */}
      {toastVisible && (
        <Animated.View
          style={{
            position: "absolute", bottom: 32, left: 20, right: 20,
            backgroundColor: colors.light,
            borderRadius: 16, padding: 16,
            flexDirection: "row", alignItems: "center", gap: 12,
           
            borderWidth: 1, borderColor: colors.cardBorder,
            opacity: toastAnim,
            transform: [{
              translateY: toastAnim.interpolate({ inputRange: [0, 1], outputRange: [80, 0] }),
            }],
          }}
        >
          <CircleCheck size={22} color={colors.primary} strokeWidth={2} />
          <View>
            <Text style={{ fontSize: 14, fontWeight: "700", color: colors.primary }}>{toastMsg.title}</Text>
            <Text style={{ fontSize: 12,  marginTop: 2 }}>{toastMsg.sub}</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

// ════════════════════════════════════════════════════════════
//  SUB-COMPONENTS
// ════════════════════════════════════════════════════════════
function TxRow({ tx, last }: { tx: Transaction; last: boolean }) {
  const isCredit = tx.type === "credit";
  return (
   <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 16,

    borderBottomWidth: last ? 0 : 0.6,
    borderBottomColor:colors.cardBorder,
  }}
>
  {/* ICON */}
  <View
    style={{
      width: 42,
      height: 42,
      borderRadius: 14,

      backgroundColor: isCredit
        ? "rgba(34,197,94,0.12)"
        : "rgba(239,68,68,0.12)",

      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {isCredit ? (
      <ArrowDownCircle size={20} color={colors.primary} strokeWidth={2} />
    ) : (
      <ArrowUpCircle size={20} color={colors.error} strokeWidth={2} />
    )}
  </View>

  {/* TEXT */}
  <View style={{ flex: 1, minWidth: 0 }}>
    <Text
      numberOfLines={1}
      style={{
        fontSize: 14.5,
        fontWeight: "700",
        color: colors.neutral,
      }}
    >
      {tx.label}
    </Text>

    <Text
      numberOfLines={1}
      style={{
        fontSize: 12.5,
      color:colors.overlay,
        marginTop: 3,
      }}
    >
      {tx.sub}
    </Text>
  </View>

  {/* RIGHT */}
  <View style={{ alignItems: "flex-end" }}>
    <Text
      style={{
        fontSize: 15,
        fontWeight: "800",
        color: isCredit ? colors.primary : colors.error,
      }}
    >
      {isCredit ? "+" : "−"}{fmt(tx.amount)}
    </Text>

    <Text
      style={{
        fontSize: 11.5,
        color:colors.overlay,
        marginTop: 4,
      }}
    >
      {tx.date}
    </Text>
  </View>
</View>
  );
}

