import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { router, Stack, useLocalSearchParams } from "expo-router";

import { generateInvoicePDF } from "@/src/components/shared/InvoiceGenerator";
import { BackHandler, Pressable, Text, View } from "react-native";

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";

import FormActions from "@/src/components/shared/FormActions";
import { ROUTES } from "@/src/constants/routes";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import { CheckCircle, Download, Eye, Share2 } from "lucide-react-native";

const OrderSuccessScreen = () => {
  const { order: orderParam } = useLocalSearchParams();

  /**
   * Parse Order Data
   */
  const parsedOrder = orderParam ? JSON.parse(orderParam as string) : null;

  /**
   * Actual order object
   */
  const order = parsedOrder?.value?.value;

  console.log(JSON.stringify(order, null, 2), "parsed order data....");

  if (!order) return null;

  const shippingAddress = order.shippingAddress;
  const billingAddress = order.billingAddress;

  /**
   * Total Quantity
   */
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

          {/* DELIVERY ADDRESS */}
          <View className="mt-6 rounded-2xl bg-white p-5">
            <View className="flex-row items-center justify-between pb-3">
              <Text
                style={[typography.Poppins_m_bold]}
                className="text-lg text-neutral-900"
              >
                Delivery Address
              </Text>

              <View className="flex-row gap-3">
                {/* DOWNLOAD PDF */}
                <Pressable
                  onPress={() => generateInvoicePDF(order, "download")}
                  className="rounded-full bg-neutral-100 p-2"
                >
                  <Download size={18} color={colors.primary} />
                </Pressable>

                {/* VIEW PDF */}
                <Pressable
                  onPress={() => generateInvoicePDF(order, "view")}
                  className="rounded-full bg-neutral-100 p-2"
                >
                  <Eye size={18} color={colors.primary} />
                </Pressable>

                {/* SHARE PDF */}
                <Pressable
                  onPress={() => generateInvoicePDF(order, "share")}
                  className="rounded-full bg-neutral-100 p-2"
                >
                  <Share2 size={18} color={colors.primary} />
                </Pressable>
              </View>
            </View>

            <Text className="font-semibold text-neutral-900">
              {shippingAddress?.contactName}
            </Text>

            <Text className="mt-1 text-neutral-700">
              {shippingAddress?.addressLine1}
            </Text>

            {!!shippingAddress?.addressLine2 && (
              <Text className="text-neutral-700">
                {shippingAddress?.addressLine2}
              </Text>
            )}

            <Text className="text-neutral-700">
              {shippingAddress?.city} - {shippingAddress?.zipCode}
            </Text>

            <Text className="text-neutral-700">{shippingAddress?.phone}</Text>
          </View>

          {/* ORDER DETAILS */}
          <View className="mt-4 rounded-2xl bg-white p-5">
            <Text
              style={[typography.Poppins_m_bold]}
              className="mb-4 text-lg text-neutral-900"
            >
              Order Details
            </Text>

            <DetailRow label="Order ID" value={`#${order?.id ?? "-"}`} />

            <DetailRow
              label="Order Total"
              value={`₹${Number(order?.orderTotal || 0).toFixed(2)}`}
            />

            <DetailRow
              label="Payment Method"
              value={order?.paymentMethod || "-"}
            />

            <DetailRow
              label="Shipping Method"
              value={order?.shippingMethod || "-"}
            />

            <DetailRow label="Quantity" value={`${totalQuantity}`} />

            <DetailRow
              label="Tax Amount"
              value={`₹${Number(order?.taxAmount || 0).toFixed(2)}`}
            />

            <DetailRow
              label="Discount"
              value={`₹${Number(order?.discountAmount || 0).toFixed(2)}`}
            />

            <DetailRow
              label="Coupon Applied"
              value={order?.couponCode || "No Coupon"}
            />
          </View>

          {/* ACTION BUTTONS */}
          <View className="mt-auto pt-6">
            <FormActions
              submitLabel="Shop More"
              onSubmit={() => router.replace(ROUTES.TABS.PRODUCTS)}
              cancelLabel="View Orders"
              onCancel={() => router.push(ROUTES.ORDERS.LIST)}
            />
          </View>
        </View>
      </ScreenLayout>
    </>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View className="mb-3 flex-row justify-between">
    <Text className="text-neutral-600">{label}</Text>

    <Text className="font-semibold text-neutral-900">{value}</Text>
  </View>
);

export default OrderSuccessScreen;
