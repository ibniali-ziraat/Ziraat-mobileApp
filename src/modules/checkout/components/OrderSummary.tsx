import {
  cardShadow,
  cardTokens,
  chartTokens,
} from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { Sparkles } from "lucide-react-native";
import { Text, View } from "react-native";

interface VendorAssignment {
  creditSaleHikePercentage?: number;
  creditSaleHikeAmount?: number;
  creditSalePrice?: number;
  isAvailableForCreditBuyers?: boolean;
}

interface OrderItem {
  vendorAssignment?: VendorAssignment;
  quantity?: number;
  productName?: string;
  variationName?: string | null;
}

interface Summary {
  subTotalString: string;
  discount: number;
  discountString: string;
  taxAmountString: string;
  shippingAmount: number;
  shippingAmountString: string;
  orderTotalString: string;
  orderTotal: number;
  items?: OrderItem[];
}

interface Props {
  summary: Summary;
  couponCode?: string;
  isBuyOnCredit?: boolean;
  // name of the selected non-credit method (e.g. "Cash On Delivery"); when set,
  // shows how much the farmer saves compared to Buy on Credit
  savingsPaymentMethodLabel?: string;
}

const formatRs = (value: string) => value?.replace("$", "₹");
const formatRsNum = (value: number) =>
  `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// ✅ "ALANTO ® - 1KG" -> "1KG"
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

  // payloads without productName -> take the part after the last separator
  const parts = variation.split(/\s[-–—|/]\s/);
  return parts.length > 1 ? parts[parts.length - 1].trim() : variation;
};

const SummaryRow = ({
  label,
  value,
  bold,
  highlight,
}: {
  label: string;
  value: string;
  bold?: boolean;
  highlight?: boolean;
}) => {
  const textStyle = [
    bold ? typography.Poppins_s_bold : typography.Poppins_s_regular,
    {
      fontSize: bold ? 15 : 13.5,
      color: highlight
        ? chartTokens.accent
        : bold
          ? cardTokens.inkPrimary
          : cardTokens.inkSecondary,
    },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
      }}
    >
      <Text style={textStyle}>{label}</Text>
      <Text style={textStyle}>{value}</Text>
    </View>
  );
};

const Divider = () => (
  <View
    style={{
      height: 1,
      backgroundColor: cardTokens.hairline,
      marginVertical: 8,
    }}
  />
);

export const OrderSummary = ({
  summary,
  couponCode,
  isBuyOnCredit = false,
  savingsPaymentMethodLabel,
}: Props) => {
  const items = summary.items ?? [];

  const showCredit = isBuyOnCredit;

  // Aggregate credit values across ALL items (respecting quantity)
  const totalCreditSalePrice = items.reduce((sum, item) => {
    const qty = item.quantity ?? 1;
    const price = item.vendorAssignment?.creditSalePrice ?? 0;

    return sum + price * qty;
  }, 0);

  const totalCreditHikeAmount = items.reduce((sum, item) => {
    const qty = Number(item.quantity ?? 1);
    const hike = Number(item.vendorAssignment?.creditSaleHikeAmount ?? 0);

    return sum + hike * qty;
  }, 0);

  // Buy on Credit total minus what this method charges
  const creditSavings =
    savingsPaymentMethodLabel && totalCreditSalePrice > summary.orderTotal
      ? totalCreditSalePrice - summary.orderTotal
      : 0;

  // Use a representative hike percentage (from first item, for display label)
  const creditHikePercentage =
    items[0]?.vendorAssignment?.creditSaleHikePercentage ?? 0;

  return (
    <View
      style={[
        {
          marginHorizontal: 16,
          marginTop: 16,
          backgroundColor: cardTokens.surface,
          borderRadius: cardTokens.radius,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: cardTokens.border,
          padding: 16,
        },
        cardShadow,
      ]}
    >
      <Text
        style={[
          typography.Poppins_s_bold,
          { color: cardTokens.inkPrimary, fontSize: 17, marginBottom: 12 },
        ]}
      >
        Order Summary
      </Text>

      {/* ITEMS — product name + variation chip */}
      {items.length > 0 && (
        <View>
          {items.map((item, index) => {
            const variationLabel = getVariationLabel(item);

            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                  gap: 6,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    typography.Poppins_s_regular,
                    {
                      flexShrink: 1,
                      fontSize: 13.5,
                      color: cardTokens.inkSecondary,
                    },
                  ]}
                >
                  {item.productName}
                </Text>

                {variationLabel ? (
                  <View
                    style={{
                      backgroundColor: cardTokens.hairline,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={[
                        typography.Poppins_xs_semibold,
                        { fontSize: 11, color: cardTokens.inkPrimary },
                      ]}
                    >
                      {variationLabel}
                    </Text>
                  </View>
                ) : null}

                <Text
                  style={[
                    typography.Poppins_s_regular,
                    {
                      marginLeft: "auto",
                      fontSize: 13.5,
                      color: cardTokens.inkSecondary,
                    },
                  ]}
                >
                  × {item.quantity ?? 1}
                </Text>
              </View>
            );
          })}

          <Divider />
        </View>
      )}

      {/* MRP — always shown */}
      <SummaryRow label="MRP" value={formatRs(summary.subTotalString)} />

      <SummaryRow
        label="Included Tax"
        value={formatRs(summary.taxAmountString)}
      />

      {summary.discount > 0 && (
        <SummaryRow
          label="Discount"
          value={`- ${formatRs(summary.discountString)}`}
        />
      )}

      {showCredit ? (
        <>
          <SummaryRow
            label="Sale Price"
            value={formatRs(summary.orderTotalString)}
          />

          {/* Coupons aren't applicable on Buy on Credit — no "Coupon
              Applied" row here, see the notice on the review screen. */}

          {/* Credit hike fee — summed across all items */}
          <SummaryRow
            label={`Credit Fee (${creditHikePercentage}%)`}
            value={`+ ${formatRsNum(totalCreditHikeAmount)}`}
            highlight
          />

          <SummaryRow
            label="Shipping"
            value={
              summary.shippingAmount === 0
                ? "Free"
                : formatRs(summary.shippingAmountString)
            }
          />

          <Divider />

          {/* Order Total = sum of all items' creditSalePrice */}
          <SummaryRow
            label="Order Total"
            value={formatRsNum(totalCreditSalePrice)}
            bold
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: 12,
            }}
          >
            <Text
              style={[
                typography.Poppins_xs_semibold,
                { color: chartTokens.accent, fontSize: 13 },
              ]}
            >
              Credit fee of {formatRsNum(totalCreditHikeAmount)} applied
            </Text>
          </View>
        </>
      ) : (
        <>
          <SummaryRow
            label="Sale Price"
            value={formatRs(summary.orderTotalString)}
          />

          {couponCode && (
            <SummaryRow label="Coupon Applied" value={couponCode} />
          )}

          <SummaryRow
            label="Shipping"
            value={
              summary.shippingAmount === 0
                ? "Free"
                : formatRs(summary.shippingAmountString)
            }
          />

          <Divider />

          <SummaryRow
            label="Order Total"
            value={formatRs(summary.orderTotalString)}
            bold
          />

          {summary.discount > 0 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                marginTop: 12,
                gap: 6,
              }}
            >
              <Sparkles size={15} color={chartTokens.current} />
              <Text
                style={[
                  typography.Poppins_xs_semibold,
                  { color: chartTokens.current, fontSize: 13 },
                ]}
              >
                You saved {formatRs(summary.discountString)}
              </Text>
            </View>
          )}

          {creditSavings > 0 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginTop: 12,
                padding: 12,
                gap: 8,
                borderRadius: 12,
                backgroundColor: chartTokens.tint,
              }}
            >
              <Sparkles size={16} color={chartTokens.current} />
              <Text
                style={[
                  typography.Poppins_xs_semibold,
                  {
                    flex: 1,
                    color: chartTokens.current,
                    fontSize: 13,
                    lineHeight: 19,
                  },
                ]}
              >
                You saved {formatRsNum(creditSavings)} by paying with{" "}
                {savingsPaymentMethodLabel} instead of Buy on Credit
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};
