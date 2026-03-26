import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";

import { router } from "expo-router";
import {
  CalendarDays,
  ChevronRight,
  Package,
  ShoppingBag,
} from "lucide-react-native";

import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import Loader from "@/src/components/shared/Loader";
import { ROUTES } from "@/src/constants/routes";
import { useUserOrders } from "../../hooks/UseOders";

const ORDER_STATUS = {
  1: { label: "New", bg: colors.primary + "12", text: colors.primary },
  10: { label: "On Hold", bg: colors.warning + "12", text: colors.warning },
  20: { label: "Pending", bg: colors.secondary + "12", text: colors.secondary },
  30: { label: "Paid", bg: colors.primary + "15", text: colors.primary },
  35: { label: "Failed", bg: colors.error + "12", text: colors.error },
  40: {
    label: "Invoiced",
    bg: colors.secondary + "10",
    text: colors.secondary,
  },
  50: { label: "Shipping", bg: colors.primary + "10", text: colors.primary },
  60: { label: "Shipped", bg: colors.primary + "12", text: colors.primary },
  70: { label: "Delivered", bg: colors.primary + "20", text: colors.primary },
  80: { label: "Cancelled", bg: colors.error + "12", text: colors.error },
  90: {
    label: "Refunded",
    bg: colors.secondary + "10",
    text: colors.secondary,
  },
  100: { label: "Closed", bg: "#E5E5E5", text: colors.neutral },
};

const baseCard = {
  backgroundColor: colors.light,
  borderRadius: 20,
  padding: 14,
  marginBottom: 14,
};

const OrdersListScreen = () => {
  const { data, isLoading } = useUserOrders();
  const orders = data || [];

  const formatDate = (date: string) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  const getStatus = (status: number) => {
    return (
      ORDER_STATUS[status] || {
        label: "Unknown",
        bg: "#F3F4F6",
        text: colors.neutral,
      }
    );
  };

  const handleOrderPress = (order: any) => {
    router.push({
      pathname: ROUTES.ORDERS.DETAILS,
      params: { orderId: order.id },
    });
  };

  if (isLoading) {
    return (
      <ScreenLayout>
        <Loader />
      </ScreenLayout>
    );
  }

  if (!orders.length) {
    return (
      <ScreenLayout>
        <BackHeader
          title="My Orders"
          desc="Track and manage your orders"
          // onPress={() => router.replace(ROUTES.TABS.MORE)}
        />

        <View className="flex-1 items-center justify-center px-8">
          <View
            style={{
              height: 90,
              width: 90,
              borderRadius: 45,
              backgroundColor: colors.primary + "10",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Package size={36} color={colors.primary} />
          </View>

          <Text style={[typography.Poppins_s_bold, { fontSize: 18 }]}>
            No Orders Yet
          </Text>

          <Text
            style={{
              color: colors.neutral,
              textAlign: "center",
              marginTop: 6,
            }}
          >
            Start shopping to see your orders here
          </Text>

          <TouchableOpacity
            onPress={() => router.replace("/")}
            style={{
              marginTop: 16,
              backgroundColor: colors.primary,
              paddingHorizontal: 24,
              paddingVertical: 10,
              borderRadius: 30,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Start Shopping
            </Text>
          </TouchableOpacity>
        </View>
      </ScreenLayout>
    );
  }

  const renderOrder = ({ item }) => {
    const firstProduct = item.orderItems?.[0];
    const status = getStatus(item.orderStatus);

    return (
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={() => handleOrderPress(item)}
        style={[baseCard, shadows.profile_card]}
      >
        <View className="flex-row">
          {/* IMAGE */}
          <Image
            source={{ uri: firstProduct?.thumbnailImage }}
            style={{
              height: 78,
              width: 78,
              borderRadius: 14,
              backgroundColor: colors.bgColor,
            }}
            resizeMode="cover"
          />

          {/* CONTENT */}
          <View className="flex-1 ml-3 ">
            {/* HEADER */}
            <View className="flex-row justify-between items-center">
              <Text style={[typography.Poppins_s_bold, { color: colors.dark }]}>
                Order #{item.id}
              </Text>

              <ChevronRight size={16} color={colors.neutral} />
            </View>

            {/* PRODUCT */}
            <Text
              numberOfLines={1}
              style={{
                color: colors.neutral,
                marginTop: 4,
                fontSize: 13,
              }}
            >
              {firstProduct?.productName || "Multiple Items"}
            </Text>

            {/* META */}
            <View className="flex-row items-center mt-3 gap-6">
              <View className="flex-row items-center mr-12">
                <CalendarDays size={13} color={colors.secondary} />
                <Text
                  style={{
                    marginLeft: 4,
                    color: colors.neutral,
                    fontSize: 12,
                  }}
                >
                  {formatDate(item.createdOn)}
                </Text>
              </View>

              <View className="flex-row items-center">
                <ShoppingBag size={13} color={colors.secondary} />
                <Text
                  style={{
                    marginLeft: 4,
                    color: colors.neutral,
                    fontSize: 12,
                  }}
                >
                  {item.orderItems?.length} Items
                </Text>
              </View>
            </View>

            {/* PRICE + STATUS */}
            <View className="flex-row justify-between items-center mt-4">
              <Text
                style={[
                  typography.Poppins_s_bold,
                  { color: colors.primary, fontSize: 16 },
                ]}
              >
                ₹{item.subTotal}
              </Text>

              <View
                style={{
                  backgroundColor: status.bg,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: status.text,
                    fontSize: 10,
                    fontWeight: "700",
                  }}
                >
                  {status.label}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="My Orders"
        desc="Track and manage your orders"
        onPress={() => router.replace(ROUTES.TABS.MORE)}
      />

      <FlatList
        scrollEnabled={false}
        data={orders}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderOrder}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 60,
        }}
      />
    </ScreenLayout>
  );
};

export default OrdersListScreen;
