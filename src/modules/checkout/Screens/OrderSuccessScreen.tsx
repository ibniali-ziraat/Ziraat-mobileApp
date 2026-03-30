import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { router, Stack, useLocalSearchParams } from "expo-router";

import { generateInvoicePDF } from "@/src/components/shared/InvoiceGenerator";
import { BackHandler, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";

import FormActions from "@/src/components/shared/FormActions";
import { ROUTES } from "@/src/constants/routes";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import { CheckCircle, Download, Eye, Share2 } from "lucide-react-native";

const OrderSuccessScreen = () => {
  const { order: orderParam } = useLocalSearchParams();

  const orderData = orderParam ? JSON.parse(orderParam as string) : null;
  const order = orderData?.value;

  if (!order) return null;

  const shippingAddress = order.shippingAddress;
  const billingAddress = order.billingAddress;

  const totalQuantity =
    order.orderItems?.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0,
    ) || 0;

  /**
   * Disable Android Back Button
   */
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true,
      );

      return () => backHandler.remove();
    }, []),
  );

  return (
    <>
      <Stack.Screen
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />

      <ScreenLayout>
        <View className="flex-1 px-6 py-6">
          {/* SUCCESS ICON */}
          <View className="items-center">
            <CheckCircle size={70} color={colors.primary} />

            <Text
              style={[typography.Poppins_s_bold]}
              className="mt-6 text-2xl text-center text-neutral-900"
            >
              Order Placed Successfully
            </Text>

            <Text className="mt-2 text-center text-neutral-600">
              Your order has been placed successfully.
            </Text>
          </View>

          {/* SHIPPING ADDRESS */}
          <View className=" mt-4 rounded-2xl bg-white p-5">
        
            <View className="flex-row justify-between items-center pb-1 ">
              <Text
                style={[typography.Poppins_m_bold]}
                className="text-lg"
              >
                Delivery Address
              </Text>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={() => generateInvoicePDF(order, "download")}
                  className="bg-neutral-100 p-2 rounded-full"
                >
                  <Download size={18} color={colors.primary} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => generateInvoicePDF(order, "view")}
                  className="bg-neutral-100 p-2 rounded-full"
                >
                  <Eye size={18} color={colors.primary} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => generateInvoicePDF(order, "share")}
                  className="bg-neutral-100 p-2 rounded-full"
                >
                  <Share2 size={18} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <Text className="font-semibold  text-neutral-1000">
              {shippingAddress.contactName}
            </Text>

            <Text className="text-neutral-700">
              {shippingAddress.addressLine1}
            </Text>

            <Text className="text-neutral-700">
              {shippingAddress.city} - {shippingAddress.zipCode}
            </Text>

            <Text className="text-neutral-700">
              {shippingAddress.phone}
            </Text>
          </View>

          {/* ORDER DETAILS */}
          <View className="rounded-2xl bg-white p-5">
            <Text
              style={[typography.Poppins_m_bold]}
              className="mb-2 text-lg"
            >
              Order Details
            </Text>

            <DetailRow label="Order ID" value={`#${order.id}`} />

            <DetailRow
              label="Order Total"
              value={`₹${Number(order.orderTotal).toFixed(2)}`}
            />

            <DetailRow
              label="Payment Method"
              value={order.paymentMethod}
            />

            <DetailRow
              label="Shipping Method"
              value={order.shippingMethod}
            />

            <DetailRow
              label="Quantity"
              value={`${totalQuantity}`}
            />

            <DetailRow
              label="Tax Amount"
              value={`₹${Number(order.taxAmount).toFixed(2)}`}
            />

            <DetailRow
              label="Discount"
              value={`₹${Number(order.discountAmount).toFixed(2)}`}
            />

            <DetailRow
              label="Coupon Applied"
              value={order.couponCode || "No Coupon"}
            />
          </View>

          <FormActions
            submitLabel="Shop More"
            onSubmit={() => router.replace(ROUTES.TABS.PRODUCTS)}
            cancelLabel="View Order"
            onCancel={() => router.push(ROUTES.ORDERS.LIST)}
          />
        </View>
      </ScreenLayout>
    </>
  );
};

const DetailRow = ({ label, value }: any) => (
  <View className="mb-3 flex-row justify-between">
    <Text className="text-neutral-600">{label}</Text>
    <Text className="font-semibold text-neutral-900">{value}</Text>
  </View>
);

export default OrderSuccessScreen;