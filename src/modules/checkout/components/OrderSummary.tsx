import { cardShadow, cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
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
}

const formatRs = (value: string) => value?.replace("$", "₹");
const formatRsNum = (value: number) =>
  `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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

          {couponCode && (
            <SummaryRow label="Coupon Applied" value={couponCode} />
          )}

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
        </>
      )}
    </View>
  );
};
