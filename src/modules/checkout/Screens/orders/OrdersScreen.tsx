import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { router } from "expo-router";
import {
    CalendarDays,
    ChevronRight,
    Package,
    ShoppingBag,
} from "lucide-react-native";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useUserOrders } from "../../hooks/UseOders";

const ORDER_STATUS = {
  1: { label: "New", bg: "bg-blue-50", text: "text-blue-600" },
  10: { label: "On Hold", bg: "bg-yellow-50", text: "text-yellow-600" },
  20: { label: "Pending Payment", bg: "bg-orange-50", text: "text-orange-600" },
  30: {
    label: "Payment Received",
    bg: "bg-indigo-50",
    text: "text-indigo-600",
  },
  35: { label: "Payment Failed", bg: "bg-red-50", text: "text-red-600" },
  40: { label: "Invoiced", bg: "bg-purple-50", text: "text-purple-600" },
  50: { label: "Shipping", bg: "bg-green-50", text: "text-green-600" },
  60: { label: "Shipped", bg: "bg-amber-50", text: "text-amber-600" },
  70: { label: "Delivered", bg: "bg-green-50", text: "text-green-600" },
  80: { label: "Cancelled", bg: "bg-red-50", text: "text-red-600" },
  90: { label: "Refunded", bg: "bg-purple-50", text: "text-purple-600" },
  100: { label: "Closed", bg: "bg-neutral-100", text: "text-neutral-600" },
};

const OrdersScreen = () => {
  const { data, isLoading } = useUserOrders();
  const orders = data || [];

  const formatDate = (date: string) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatus = (status: number) => {
    return (
      ORDER_STATUS[status] || {
        label: "Unknown",
        bg: "bg-neutral-50",
        text: "text-neutral-500",
      }
    );
  };

  const handleOrderPress = (order: any) => {
    router.push({
      pathname: "/products/checkout/orders/orderDetails",
      params: { orderId: order.id },
    });
  };

  if (isLoading) {
    return (
      <ScreenLayout>
        <BackHeader title="My Orders" desc="Track and manage your orders" />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenLayout>
    );
  }

  if (!orders.length) {
    return (
      <ScreenLayout>
        <BackHeader title="My Orders" desc="Track and manage your orders" />

        <View className="flex-1 items-center justify-center px-8">
          <View className="h-24 w-24 rounded-full bg-neutral-50 items-center justify-center mb-6">
            <Package size={40} color={colors.primary} opacity={0.5} />
          </View>

          <Text
            style={[typography.Poppins_s_bold]}
            className="text-xl text-neutral-900"
          >
            No Orders Yet
          </Text>

          <Text className="text-neutral-500 text-center mt-2 leading-5">
            Looks like you haven't placed any orders. Start shopping to fill
            this up!
          </Text>

          <TouchableOpacity
            onPress={() => router.replace("/")}
            className="mt-6 bg-primary px-8 py-3 rounded-full"
          >
            <Text style={[typography.Poppins_s_bold]} className="text-white">
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
        activeOpacity={0.7}
        onPress={() => handleOrderPress(item)}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        }}
        className="bg-white rounded-[24px] p-4 mb-4 flex-row items-center"
      >
        {/* Product Image */}
        <View className="bg-neutral-50 rounded-2xl p-1">
          <Image
            source={{ uri: firstProduct?.thumbnailImage }}
            className="h-20 w-20 rounded-xl"
            resizeMode="cover"
          />
        </View>

        {/* Order Info */}
        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-center">
            <Text
              style={[typography.Poppins_s_bold]}
              className="text-neutral-900 text-base"
            >
              Order #{item.id}
            </Text>

            <View className="bg-neutral-50 p-1.5 rounded-full">
              <ChevronRight size={16} color="#A3A3A3" strokeWidth={3} />
            </View>
          </View>

          <Text
            numberOfLines={1}
            className="text-neutral-500 font-medium text-xs mt-0.5"
          >
            {firstProduct?.productName || "Multiple Items"}
          </Text>

          {/* Meta Tags */}
          <View className="flex-row items-center mt-3">
            <View className="flex-row items-center bg-neutral-50 px-2 py-1 rounded-md mr-3">
              <CalendarDays size={12} color="#737373" />
              <Text className="text-neutral-500 text-[10px] font-bold ml-1">
                {formatDate(item.createdOn)}
              </Text>
            </View>

            <View className="flex-row items-center bg-neutral-50 px-2 py-1 rounded-md">
              <ShoppingBag size={12} color="#737373" />
              <Text className="text-neutral-500 text-[10px] font-bold ml-1">
                {item.orderItems?.length}{" "}
                {item.orderItems?.length === 1 ? "Item" : "Items"}
              </Text>
            </View>
          </View>

          {/* Price + Status */}
          <View className="flex-row justify-between items-center mt-4">
            <Text
              style={[typography.Poppins_s_bold]}
              className="text-primary text-lg"
            >
              ₹{item.subTotal}
            </Text>

            <View className={`${status.bg} px-3 py-1 rounded-full`}>
              <Text
                className={`${status.text} text-[10px] font-black uppercase tracking-tight`}
              >
                {status.label}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenLayout>
      <BackHeader title="My Orders" desc="Track and manage your orders" />

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

export default OrdersScreen;
