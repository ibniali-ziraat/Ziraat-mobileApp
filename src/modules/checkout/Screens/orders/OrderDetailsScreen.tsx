import BackHeader from "@/src/components/shared/BackHeader";
import { generateInvoicePDF } from "@/src/components/shared/InvoiceGenerator";
import Loader from "@/src/components/shared/Loader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import {
  exploreArt,
  getOrderStatusArt,
  paymentArt,
  productArt,
  profileArt,
} from "@/src/constants/iconArt";
import { useLocalSearchParams } from "expo-router";
import { Download, Eye, Share2, type LucideIcon } from "lucide-react-native";
import type { ReactNode } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useOrderDetails } from "../../hooks/UseOders";

/** White panel with a faint outline, no shadow; matches the Menu screen. */
const panel = {
  backgroundColor: cardTokens.surface,
  borderWidth: 1,
  borderColor: colors.cardBorder,
  borderRadius: cardTokens.radius,
  borderCurve: "continuous" as const,
  padding: 16,
  marginBottom: 12,
};

// ✅ "ALANTO ® - 10KG" + productName "ALANTO ®"  ->  "10KG"
const getVariationLabel = (item: any) => {
  const variation = item?.variationName?.trim();
  if (!variation) return null;

  const product = item?.productName?.trim() ?? "";
  if (product && variation.toLowerCase().startsWith(product.toLowerCase())) {
    const rest = variation
      .slice(product.length)
      .replace(/^[\s\-–—:|/]+/, "")
      .trim();
    return rest || null;
  }
  return variation;
};

/** Server money comes as numbers or as "¤12.00" (.NET invariant culture). */
const formatRs = (value: unknown) => {
  if (value === null || value === undefined || value === "") return "₹0";
  const text = String(value).replace(/[$¤₹]/g, "").trim();
  return `₹${text}`;
};

/** "BuyOnCredit" -> "Buy On Credit" */
const humanize = (value?: string) =>
  value ? value.replace(/([a-z])([A-Z])/g, "$1 $2") : "—";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function Section({
  title,
  art,
  children,
}: {
  title: string;
  art: string;
  children: ReactNode;
}) {
  return (
    <View style={panel}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: cardTokens.mutedSurface,
          }}
        >
          <SvgXml xml={art} width={22} height={22} />
        </View>
        <Text
          style={[
            typography.Poppins_s_semibold,
            { color: cardTokens.inkPrimary, marginLeft: 10 },
          ]}
        >
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}

function InvoiceAction({
  label,
  Icon,
  onPress,
}: {
  label: string;
  Icon: LucideIcon;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label} invoice`}
      style={({ pressed }) => ({
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: cardTokens.surface,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Icon size={16} strokeWidth={2} color={chartTokens.current} />
      <Text
        style={[typography.Poppins_xs_semibold, { color: chartTokens.current }]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const OrderDetailsScreen = () => {
  const { orderId } = useLocalSearchParams();
  const numericOrderId = Number(orderId);

  const { data: orderData, isLoading } = useOrderDetails(numericOrderId);
  const items = orderData?.orderItems || [];

  if (isLoading) {
    return (
      <ScreenLayout>
        <Loader />
      </ScreenLayout>
    );
  }

  const status = orderData?.orderStatusString;
  const statusArt = getOrderStatusArt(status);
  const address = orderData?.shippingAddress;
  const method = orderData?.paymentMethod;

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
            {/* STATUS HERO */}
            <View
              style={[
                panel,
                {
                  backgroundColor: statusArt.tint,
                  borderWidth: 0,
                  padding: 18,
                },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: cardTokens.surface,
                  }}
                >
                  <SvgXml xml={statusArt.art} width={38} height={38} />
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text
                    style={[
                      typography.Poppins_xs_medium,
                      { color: cardTokens.inkSecondary },
                    ]}
                  >
                    Order status
                  </Text>
                  <Text
                    style={[
                      typography.Poppins_l_semibold,
                      { color: cardTokens.inkPrimary },
                    ]}
                  >
                    {status || "—"}
                  </Text>
                  <Text
                    style={[
                      typography.Poppins_xs_regular,
                      { color: cardTokens.inkSecondary, marginTop: 2 },
                    ]}
                  >
                    #{orderData?.id}
                    {orderData?.createdOn
                      ? `  ·  ${formatDate(orderData.createdOn)}`
                      : ""}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
                <InvoiceAction
                  label="Invoice"
                  Icon={Download}
                  onPress={() => generateInvoicePDF(orderData, "download")}
                />
                <InvoiceAction
                  label="View"
                  Icon={Eye}
                  onPress={() => generateInvoicePDF(orderData, "view")}
                />
                <InvoiceAction
                  label="Share"
                  Icon={Share2}
                  onPress={() => generateInvoicePDF(orderData, "share")}
                />
              </View>
            </View>

            {/* SHIPPING */}
            <Section title="Delivery address" art={profileArt.address}>
              <Text
                style={[
                  typography.Poppins_s_semibold,
                  { color: cardTokens.inkPrimary },
                ]}
              >
                {address?.contactName}
              </Text>
              <Text
                style={[
                  typography.Poppins_s_regular,
                  { color: cardTokens.inkSecondary, marginTop: 4 },
                ]}
              >
                {[
                  address?.addressLine1,
                  [address?.cityName, address?.stateOrProvinceName]
                    .filter(Boolean)
                    .join(", "),
                  address?.zipCode,
                ]
                  .filter(Boolean)
                  .join("\n")}
              </Text>
              {address?.phone ? (
                <Text
                  style={[
                    typography.Poppins_s_medium,
                    { color: cardTokens.inkPrimary, marginTop: 8 },
                  ]}
                >
                  {address.phone}
                </Text>
              ) : null}
            </Section>

            {/* PAYMENT */}
            <Section
              title="Payment method"
              art={(method && paymentArt[method]) || paymentArt.BuyOnCredit}
            >
              <Text
                style={[
                  typography.Poppins_s_medium,
                  { color: cardTokens.inkPrimary },
                ]}
              >
                {humanize(method)}
              </Text>
            </Section>

            {/* VENDOR */}
            {orderData?.vendor && (
              <Section title="Sold by" art={exploreArt.shop}>
                <Text
                  style={[
                    typography.Poppins_s_semibold,
                    { color: cardTokens.inkPrimary },
                  ]}
                >
                  {orderData.vendor.shopName || orderData.vendor.vendorName}
                </Text>
                {orderData.vendor.address?.formattedAddress ? (
                  <Text
                    style={[
                      typography.Poppins_s_regular,
                      { color: cardTokens.inkSecondary, marginTop: 4 },
                    ]}
                  >
                    {orderData.vendor.address.formattedAddress}
                  </Text>
                ) : null}
              </Section>
            )}

            <Text
              style={[
                typography.Poppins_m_semibold,
                {
                  color: cardTokens.inkPrimary,
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 4,
                },
              ]}
            >
              Ordered items
              <Text style={{ color: cardTokens.inkMuted }}>
                {"  "}
                {items.length}
              </Text>
            </Text>
          </View>
        )}
        renderItem={({ item }) => {
          const variationLabel = getVariationLabel(item);

          return (
            <View
              style={[
                panel,
                { flexDirection: "row", padding: 12, alignItems: "center" },
              ]}
            >
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 14,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: cardTokens.surface,
                }}
              >
                {item.productImage ? (
                  <Image
                    source={{ uri: item.productImage }}
                    style={{ height: 60, width: 60 }}
                    resizeMode="contain"
                  />
                ) : (
                  <SvgXml xml={productArt.other} width={40} height={40} />
                )}
              </View>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text
                  style={[
                    typography.Poppins_s_semibold,
                    { color: cardTokens.inkPrimary },
                  ]}
                  numberOfLines={2}
                >
                  {item.productName}
                </Text>
                <View
                  style={{
                    marginTop: 6,
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 6,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: cardTokens.mutedSurface,
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={[
                        typography.Poppins_xs_medium,
                        { color: cardTokens.inkSecondary },
                      ]}
                    >
                      Qty {item.quantity}
                    </Text>
                  </View>

                  {variationLabel ? (
                    <View
                      style={{
                        backgroundColor: chartTokens.tint,
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={[
                          typography.Poppins_xs_semibold,
                          { color: chartTokens.current },
                        ]}
                      >
                        {variationLabel}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
              <View style={{ alignItems: "flex-end", marginLeft: 8 }}>
                <Text
                  style={[
                    typography.Poppins_m_semibold,
                    { color: chartTokens.current },
                  ]}
                >
                  {formatRs(item.productPrice)}
                </Text>
                <Text
                  style={[
                    typography.Poppins_xs_regular,
                    { color: cardTokens.inkMuted },
                  ]}
                >
                  per item
                </Text>
              </View>
            </View>
          );
        }}
        ListFooterComponent={() => (
          <View style={[panel, { marginTop: 8 }]}>
            <Text
              style={[
                typography.Poppins_m_semibold,
                { color: cardTokens.inkPrimary, marginBottom: 12 },
              ]}
            >
              Order summary
            </Text>

            {[
              { label: "Subtotal", value: formatRs(orderData?.subtotal) },
              {
                label: "Discount",
                value: `- ${formatRs(orderData?.discountAmount)}`,
                isDiscount: true,
              },
              { label: "Tax", value: formatRs(orderData?.taxAmount) },
              { label: "Shipping", value: formatRs(orderData?.shippingAmount) },
              {
                label: "Platform Fee",
                value: formatRs(orderData?.paymentFeeAmount),
              },
            ].map((row) => (
              <View
                key={row.label}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={[
                    typography.Poppins_s_regular,
                    { color: cardTokens.inkSecondary },
                  ]}
                >
                  {row.label}
                </Text>
                <Text
                  style={[
                    typography.Poppins_s_medium,
                    {
                      color: row.isDiscount
                        ? chartTokens.current
                        : cardTokens.inkPrimary,
                    },
                  ]}
                >
                  {row.value}
                </Text>
              </View>
            ))}

            <View
              style={{
                height: 1,
                backgroundColor: "rgba(0, 0, 0, 0.06)",
                marginVertical: 8,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <Text
                style={[
                  typography.Poppins_m_semibold,
                  { color: cardTokens.inkPrimary },
                ]}
              >
                Total
              </Text>
              <Text
                style={[
                  typography.Poppins_l_semibold,
                  { color: colors.primary },
                ]}
              >
                {formatRs(orderData?.orderTotal)}
              </Text>
            </View>
          </View>
        )}
      />
    </ScreenLayout>
  );
};

export default OrderDetailsScreen;
