
import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from "react-native";

/* ---------------------------------------------------
   MAIN COMPONENT — Vendor Financial Summary Card
--------------------------------------------------- */
export default function VendorFinancialSummary({ data }) {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const metrics = [
    {
      label: "Total Sales",
      value: data.totalSales,
      icon: "cash-outline",
      trend: +12,
      color: colors.primary,
    },
    {
      label: "Payable to Vendor",
      value: data.payableToVendor,
      icon: "wallet-outline",
      trend: +6,
      color: colors.secondary,
    },
    {
      label: "Platform Fees",
      value: data.platformFees,
      icon: "receipt-outline",
      trend: -2,
      color: colors.error,
    },
    {
      label: "Discounts Provided",
      value: data.discounts,
      icon: "pricetag-outline",
      trend: -1,
      color: colors.secondaryHover,
    },
    {
      label: "Outstanding Receivables",
      value: data.outstanding,
      icon: "alert-circle-outline",
      trend: +8,
      color: colors.primaryHover,
    },
    {
      label: "Settlement History",
      value: `${data.settlementsCount} Settlements`,
      icon: "document-text-outline",
      isText: true,
      trend: null,
      color: colors.dark,
    },
  ];

  const openSheet = (metric) => {
    setSelectedMetric(metric);
    setSheetVisible(true);
  };

  return (
    <View
      style={{
       
        padding: 6,
       
        
       
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
      }}
    >
      {/* HEADER */}
      <View className="flex-row items-center mb-4">
        <Ionicons name="stats-chart-outline" size={22} color={colors.secondary} />
        <Text className="ml-2 text-[18px] font-bold text-black">
          Vendor Financial Overview
        </Text>
      </View>

      {/* GRID OF CARDS */}
      <View className="flex-row flex-wrap justify-between">
        {metrics.map((metric, i) => (
          <MetricCard key={i} metric={metric} onPress={openSheet} />
        ))}
      </View>

      {/* GRADIENT ACCENT BAR */}
      <View
        style={{
          height: 7,
          borderRadius: 10,
          marginTop: 14,
          backgroundColor: colors.primary,
          opacity: 0.9,
        }}
      />

      {/* DETAIL SHEET */}
      <DetailSheet
        visible={sheetVisible}
        metric={selectedMetric}
        onClose={() => setSheetVisible(false)}
      />
    </View>
  );
}

/* ---------------------------------------------------
   MetricCard — item inside the summary grid
--------------------------------------------------- */
function MetricCard({ metric, onPress }) {
  const isPositive = metric.trend > 0;
  const isNegative = metric.trend < 0;
  const trendColor = isPositive
    ? colors.primary
    : isNegative
    ? colors.error
    : colors.neutral;

  const trendIcon = isPositive ? "arrow-up" : "arrow-down";

  return (
    <TouchableOpacity
      onPress={() => onPress(metric)}
      activeOpacity={0.8}
      className="w-[48%] mb-5"
      style={{
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#e7e7e7",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
      }}
    >
      {/* LABEL */}
      <View className="flex-row items-center mb-1">
        {/* <Ionicons name={metric.icon} size={22} color={metric.color} /> */}
        <Text className="text-[14px]  font-semibold text-gray-700">
          {metric.label}
        </Text>
      </View>

      {/* VALUE */}
      <Text
        className="text-[14px] font-extrabold"
        style={{ color: metric.color }}
      >
        {metric.isText ? metric.value : `₹${metric.value.toLocaleString()}`}
      </Text>

      {/* TREND */}
      {metric.trend !== null && (
        <View className="flex-row items-center mt-1">
          <Text className="text-[11px] font-semibold" style={{ color: trendColor }}>
            {isPositive ? "+" : ""}
            {metric.trend}%
          </Text>
          <Ionicons name={trendIcon} size={12} color={trendColor} style={{ marginLeft: 3 }} />
          <Text className="ml-1 text-[11px] text-gray-500">vs last month</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

/* ---------------------------------------------------
   DetailSheet — bottom modal with animation
--------------------------------------------------- */
function DetailSheet({ visible, metric, onClose }) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 15,
          bounciness: 6,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 120, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 120, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  if (!metric) return null;

  const sheetTranslate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  return (
    <Modal transparent visible={visible}>
      {/* BACKDROP */}
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.45)",
          opacity: fadeAnim,
        }}
      >
        <Pressable onPress={onClose} style={{ flex: 1 }} />
      </Animated.View>

      {/* SHEET */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          transform: [{ translateY: sheetTranslate }],
          backgroundColor: "#fff",
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          padding: 20,
          elevation: 15,
        }}
      >
        {/* HANDLE */}
        <View className="items-center mb-3">
          <View style={{ width: 42, height: 5, borderRadius: 5, backgroundColor: "#d5d5d5" }} />
        </View>

        {/* TITLE */}
        <View className="flex-row items-center mb-1">
          <Ionicons name={metric.icon} size={22} color={metric.color} />
          <Text className="ml-2 text-[18px] font-bold text-gray-900">
            {metric.label}
          </Text>
        </View>

        {/* VALUE */}
        <Text className="text-[30px] font-extrabold mt-1" style={{ color: metric.color }}>
          {metric.isText ? metric.value : `₹${metric.value.toLocaleString()}`}
        </Text>

        {/* TREND */}
        {metric.trend !== null && (
          <Text className="text-[12px] mt-1" style={{ color: metric.color }}>
            {metric.trend > 0 ? "+" : ""}
            {metric.trend}% vs last month
          </Text>
        )}

        {/* DIVIDER */}
        <View style={{ height: 1, backgroundColor: "#eaeaea", marginVertical: 18 }} />

        {/* BREAKDOWN SECTION */}
        <Text className="text-[15px] font-bold mb-2">Breakdown</Text>

        <EnhancedBreakdownRow label="This Week" amount="₹12,540" progress={75} />
        <EnhancedBreakdownRow label="Last Week" amount="₹10,320" progress={48} />
        <EnhancedBreakdownRow label="This Month" amount="₹48,900" progress={92} />

        {/* CLOSE BUTTON */}
        <TouchableOpacity
          onPress={onClose}
          style={{
            backgroundColor: colors.secondary,
            paddingVertical: 12,
            borderRadius: 12,
            marginTop: 24,
          }}
        >
          <Text className="text-center text-white font-semibold text-[15px]">
            Close
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
}

/* ---------------------------------------------------
   Enhanced Breakdown Row — with progress bar
--------------------------------------------------- */
function EnhancedBreakdownRow({ label, amount }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text className="text-[12px] text-gray-500">{label}</Text>
      <Text className="text-[16px] font-semibold mt-1">{amount}</Text>

     
    </View>
  );
}
