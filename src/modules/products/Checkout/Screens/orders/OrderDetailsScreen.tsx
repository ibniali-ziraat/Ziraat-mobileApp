import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { useLocalSearchParams } from "expo-router";

import { typography } from "@/src/constants/fonts/typography";

import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

import {
    CalendarDays,
    CreditCard,
    MapPin,
    Package,
    ShoppingCart,
} from "lucide-react-native";

import { useOrderDetails } from "../../hooks/UseOders";

const OrderDetailsScreen = () => {
  const { orderId } = useLocalSearchParams();
  const numericOrderId = Number(orderId);

  const { data: orderData, isLoading } = useOrderDetails(numericOrderId);
  const items = orderData?.orderItems || [];

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <ScreenLayout>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <BackHeader title="Order Details" desc={`Order #${orderData?.id}`} />

      <FlatList
        scrollEnabled={false}
        data={items}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        ListHeaderComponent={() => (
          <View>
            {/* Order Info */}
            <View className="bg-white rounded-xl p-5 shadow-md mb-5">
              <Text
                style={[typography.Poppins_s_bold]}
                className="text-neutral-900 mb-5 text-base"
              >
                Order Information
              </Text>

              <View className="flex-row items-center mb-4">
                <Package size={18} color="#9CA3AF" />
                <Text className="text-neutral-500 ml-3">Order ID</Text>

                <Text className="ml-auto text-neutral-900 font-semibold">
                  #{orderData?.id}
                </Text>
              </View>

              <View className="flex-row items-center mb-4">
                <CalendarDays size={18} color="#9CA3AF" />
                <Text className="text-neutral-500 ml-3">Order Date</Text>

                <Text className="ml-auto text-neutral-900">
                  {formatDate(orderData?.createdOn)}
                </Text>
              </View>

              <View className="flex-row items-center">
                <ShoppingCart size={18} color="#9CA3AF" />
                <Text className="text-neutral-500 ml-3">Status</Text>

                <View className="ml-auto bg-primary/10 px-3 py-1 rounded-full">
                  <Text className="text-primary text-xs font-semibold">
                    {orderData?.orderStatusString}
                  </Text>
                </View>
              </View>
            </View>

            {/* Shipping Address */}
            <View className="bg-white rounded-xl p-5 shadow-md mb-5">
              <Text
                style={[typography.Poppins_s_bold]}
                className="text-neutral-900 mb-4 text-base"
              >
                Shipping Address
              </Text>

              <View className="flex-row items-start">
                <MapPin size={20} color="#9CA3AF" />

                <View className="flex-1 ml-3">
                  <Text
                    style={[typography.Poppins_s_bold]}
                    className="text-neutral-900"
                  >
                    {orderData?.shippingAddress?.contactName}
                  </Text>

                  <Text className="text-neutral-500 mt-1">
                    {orderData?.shippingAddress?.addressLine1}
                  </Text>

                  <Text className="text-neutral-500">
                    {orderData?.shippingAddress?.cityName},{" "}
                    {orderData?.shippingAddress?.stateOrProvinceName}
                  </Text>

                  <Text className="text-neutral-500">
                    {orderData?.shippingAddress?.zipCode}
                  </Text>

                  <Text className="text-neutral-500 mt-2">
                    {orderData?.shippingAddress?.phone}
                  </Text>
                </View>
              </View>
            </View>

            {/* Payment */}
            <View className="bg-white rounded-xl p-5 shadow-md mb-5">
              <Text
                style={[typography.Poppins_s_bold]}
                className="text-neutral-900 mb-4 text-base"
              >
                Payment Method
              </Text>

              <View className="flex-row items-center">
                <CreditCard size={18} color="#9CA3AF" />

                <Text className="text-neutral-700 ml-3 font-medium">
                  {orderData?.paymentMethod}
                </Text>
              </View>
            </View>

            {/* Items Title */}
            <Text
              style={[typography.Poppins_s_bold]}
              className="text-neutral-900 text-base mb-3"
            >
              Ordered Items
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="bg-white rounded-xl p-4 mb-4 shadow-md flex-row">
            <Image
              source={{ uri: item.productImage }}
              className="h-18 w-18 rounded-xl"
              resizeMode="cover"
            />

            <View className="flex-1 ml-4 justify-center">
              <Text
                style={[typography.Poppins_s_bold]}
                className="text-neutral-900"
              >
                {item.productName}
              </Text>

              <Text className="text-neutral-500 text-sm mt-1">
                Quantity: {item.quantity}
              </Text>

              <Text className="text-primary mt-2 font-semibold">
                ₹{item.productPrice}
              </Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View className="bg-white rounded-xl p-5 shadow-md mt-4">
            <Text
              style={[typography.Poppins_s_bold]}
              className="text-neutral-900 mb-5 text-base"
            >
              Order Summary
            </Text>

            <View className="flex-row justify-between mb-3">
              <Text className="text-neutral-500">Subtotal</Text>
              <Text className="text-neutral-900 font-medium">
                ₹{orderData?.subtotal}
              </Text>
            </View>

            <View className="flex-row justify-between mb-3">
              <Text className="text-neutral-500">Discount</Text>
              <Text className="text-red-500 font-medium">
                - ₹{orderData?.discountAmount}
              </Text>
            </View>

            <View className="flex-row justify-between mb-3">
              <Text className="text-neutral-500">Tax</Text>
              <Text className="text-neutral-900 font-medium">
                ₹{orderData?.taxAmount}
              </Text>
            </View>

            <View className="flex-row justify-between mb-3">
              <Text className="text-neutral-500">Shipping</Text>
              <Text className="text-neutral-900 font-medium">
                ₹{orderData?.shippingAmount}
              </Text>
            </View>

            <View className="h-[1px] bg-neutral-200 my-3" />

            <View className="flex-row justify-between mt-2">
              <Text
                style={[typography.Poppins_s_bold]}
                className="text-neutral-900"
              >
                Total
              </Text>

              <Text
                style={[typography.Poppins_s_bold]}
                className="text-primary text-xl"
              >
                ₹{orderData?.orderTotal}
              </Text>
            </View>
          </View>
        )}
      />
    </ScreenLayout>
  );
};

export default OrderDetailsScreen;
