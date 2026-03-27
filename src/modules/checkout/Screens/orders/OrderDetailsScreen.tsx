import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { useLocalSearchParams } from "expo-router";

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";

import { FlatList, Image, Pressable, Text, View } from "react-native";

import {
  CalendarDays,
  CreditCard,
  Download,
  Eye,
  MapPin,
  Package,
  Share2,
  ShoppingCart,
} from "lucide-react-native";

import Loader from "@/src/components/shared/Loader";
import { useOrderDetails } from "../../hooks/UseOders";

import { generateInvoicePDF } from "@/src/components/shared/InvoiceGenerator";

const baseCard = {
  backgroundColor: colors.light,
  borderRadius: 22,
  padding: 16,
  marginBottom: 14,
};

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
        <Loader />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <BackHeader title="Order Details" desc={`Order #${orderData?.id}`} />

      {/* ✅ NEW ICON ACTION ROW */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 16,
          marginTop: 10,
          marginBottom: 6,
          gap: 10,
        }}
      >
        {/* DOWNLOAD */}
        <Pressable
          onPress={() => generateInvoicePDF(orderData, "download")}
          style={{
            flex: 1,
            backgroundColor: colors.primary,
            paddingVertical: 12,
            borderRadius: 14,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Download size={16} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            Download
          </Text>
        </Pressable>

        {/* VIEW */}
        <Pressable
          onPress={() => generateInvoicePDF(orderData, "view")}
          style={{
            flex: 1,
            backgroundColor: colors.bgColor,
            paddingVertical: 12,
            borderRadius: 14,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            borderWidth: 1,
            borderColor: colors.cardBorder,
          }}
        >
          <Eye size={16} color={colors.dark} />
          <Text style={{ color: colors.dark, fontWeight: "600" }}>
            View
          </Text>
        </Pressable>

        {/* SHARE */}
        <Pressable
          onPress={() => generateInvoicePDF(orderData, "share")}
          style={{
            flex: 1,
            backgroundColor: colors.bgColor,
            paddingVertical: 12,
            borderRadius: 14,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            borderWidth: 1,
            borderColor: colors.cardBorder,
          }}
        >
          <Share2 size={16} color={colors.dark} />
          <Text style={{ color: colors.dark, fontWeight: "600" }}>
            Share
          </Text>
        </Pressable>
      </View>

      <FlatList
        scrollEnabled={false}
        data={items}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 40,
        }}
        ListHeaderComponent={() => (
          <View>
            {/* ORDER INFO */}
            <View style={[baseCard, shadows.profile_card]}>
              <View className="flex-row items-center mb-4">
                <Package size={18} color={colors.primary} />
                <Text style={[typography.Poppins_s_bold, { marginLeft: 8 }]}>
                  Order Information
                </Text>
              </View>

              <View className="flex-row items-center mb-3">
                <Package size={16} color={colors.darkHover} />
                <Text style={{ marginLeft: 10, color: colors.neutral }}>
                  Order ID
                </Text>
                <Text style={{ marginLeft: "auto", color: colors.dark }}>
                  #{orderData?.id}
                </Text>
              </View>

              <View className="flex-row items-center mb-3">
                <CalendarDays size={16} color={colors.darkHover} />
                <Text style={{ marginLeft: 10, color: colors.neutral }}>
                  Order Date
                </Text>
                <Text style={{ marginLeft: "auto", color: colors.dark }}>
                  {formatDate(orderData?.createdOn)}
                </Text>
              </View>

              <View className="flex-row items-center">
                <ShoppingCart size={16} color={colors.darkHover} />
                <Text style={{ marginLeft: 10, color: colors.neutral }}>
                  Status
                </Text>

                <View
                  style={{
                    marginLeft: "auto",
                    backgroundColor: colors.cardBorder,
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 12,
                      fontWeight: "700",
                    }}
                  >
                    {orderData?.orderStatusString}
                  </Text>
                </View>
              </View>
            </View>

            {/* SHIPPING */}
            <View style={[baseCard, shadows.profile_card]}>
              <View className="flex-row items-center mb-4">
                <MapPin size={18} color={colors.primary} />
                <Text style={[typography.Poppins_s_bold, { marginLeft: 8 }]}>
                  Shipping Address
                </Text>
              </View>

              <Text style={[typography.Poppins_s_bold]}>
                {orderData?.shippingAddress?.contactName}
              </Text>

              <Text style={{ color: colors.neutral, marginTop: 4 }}>
                {orderData?.shippingAddress?.addressLine1}
              </Text>

              <Text style={{ color: colors.neutral }}>
                {orderData?.shippingAddress?.cityName},{" "}
                {orderData?.shippingAddress?.stateOrProvinceName}
              </Text>

              <Text style={{ color: colors.neutral }}>
                {orderData?.shippingAddress?.zipCode}
              </Text>

              <Text style={{ color: colors.neutral, marginTop: 6 }}>
                {orderData?.shippingAddress?.phone}
              </Text>
            </View>

            {/* PAYMENT */}
            <View style={[baseCard, shadows.profile_card]}>
              <View className="flex-row items-center mb-3">
                <CreditCard size={18} color={colors.primary} />
                <Text style={[typography.Poppins_s_bold, { marginLeft: 8 }]}>
                  Payment Method
                </Text>
              </View>

              <Text style={{ fontWeight: "500", color: colors.dark }}>
                {orderData?.paymentMethod}
              </Text>
            </View>

            {/* ITEMS TITLE */}
            <View
              style={{
                paddingHorizontal: 6,
                marginTop: 7,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 4,
                  height: 18,
                  backgroundColor: colors.primary,
                  borderRadius: 4,
                  marginRight: 8,
                }}
              />
              <Text style={[typography.Poppins_s_bold, { fontSize: 15 }]}>
                Ordered Items
              </Text>
            </View>
          </View>
        )}
        renderItem={({ item }) => (
          <View
            style={[
              baseCard,
              shadows.profile_card,
              {
                flexDirection: "row",
                padding: 12,
                alignItems: "center",
              },
            ]}
          >
            <View
              style={{
                backgroundColor: colors.bgColor,
                padding: 4,
                borderRadius: 14,
              }}
            >
              <Image
                source={{ uri: item.productImage }}
                style={{
                  height: 68,
                  width: 68,
                  borderRadius: 10,
                }}
                resizeMode="cover"
              />
            </View>

            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={[typography.Poppins_s_bold]} numberOfLines={1}>
                {item.productName}
              </Text>

              <View
                style={{
                  marginTop: 6,
                  backgroundColor: colors.bgColor,
                  alignSelf: "flex-start",
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    color: colors.darkHover,
                    fontWeight: "600",
                  }}
                >
                  Qty {item.quantity}
                </Text>
              </View>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "700",
                  fontSize: 15,
                }}
              >
                ₹{item.productPrice}
              </Text>

              <Text
                style={{
                  fontSize: 10,
                  color: colors.darkHover,
                  marginTop: 2,
                }}
              >
                per item
              </Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={[baseCard, shadows.profile_card]}>
            <Text style={[typography.Poppins_s_bold, { marginBottom: 12 }]}>
              Order Summary
            </Text>

            {[
              { label: "Subtotal", value: orderData?.subtotal },
              {
                label: "Discount",
                value: `- ₹${orderData?.discountAmount}`,
                isDiscount: true,
              },
              { label: "Tax", value: orderData?.taxAmount },
              { label: "Shipping", value: orderData?.shippingAmount },
            ].map((row, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: colors.neutral }}>{row.label}</Text>
                <Text
                  style={{
                    color: row.isDiscount ? colors.error : colors.dark,
                    fontWeight: "500",
                  }}
                >
                  {typeof row.value === "string"
                    ? row.value
                    : `₹${row.value}`}
                </Text>
              </View>
            ))}

            <View
              style={{
                height: 1,
                backgroundColor: colors.cardBorder,
                marginVertical: 12,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={[typography.Poppins_s_bold]}>Total</Text>

              <Text
                style={[
                  typography.Poppins_s_bold,
                  { color: colors.primary, fontSize: 20 },
                ]}
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