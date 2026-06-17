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
}) => (
  <View className="mb-2 flex-row justify-between">
    <Text
      className={`text-sm ${
        bold
          ? "font-bold text-neutral-900"
          : highlight
            ? "font-semibold text-orange-600"
            : "text-neutral-700"
      }`}
    >
      {label}
    </Text>
    <Text
      className={`text-sm ${
        bold
          ? "font-bold text-neutral-900"
          : highlight
            ? "font-semibold text-orange-600"
            : "text-neutral-700"
      }`}
    >
      {value}
    </Text>
  </View>
);

const Divider = () => <View className="my-2 border-t border-neutral-100" />;

export const OrderSummary = ({
  summary,
  couponCode,
  isBuyOnCredit = false,
}: Props) => {
  // Pull credit info from first item's vendorAssignment
  const va = summary.items?.[0]?.vendorAssignment;
  const creditAvailable = va?.isAvailableForCreditBuyers === true;
  const showCredit = isBuyOnCredit && creditAvailable;

  const creditSalePrice = va?.creditSalePrice;
  const creditHikeAmount = va?.creditSaleHikeAmount;
  const creditHikePercentage = va?.creditSaleHikePercentage;

  return (
    <View className="mx-4 rounded-2xl bg-white p-4">
      <Text
        style={typography.Poppins_s_bold}
        className="mb-3 text-lg text-neutral-900"
      >
        Order Summary
      </Text>

      {/* MRP — always shown */}
      <SummaryRow label="MRP" value={formatRs(summary.subTotalString)} />

      {showCredit ? (
        <>
          {/* Replace Sale Price with Credit Sale Price */}
          <SummaryRow
            label="Credit Sale Price"
            value={formatRsNum(creditSalePrice!)}
          />

          {summary.discount > 0 && (
            <SummaryRow
              label="Discount"
              value={`- ${formatRs(summary.discountString)}`}
            />
          )}

          {couponCode && (
            <View className="mb-2 flex-row items-center justify-between">
              <Text className="text-sm text-neutral-700">Coupon Applied</Text>
              <Text className="ml-1 text-sm text-neutral-700">
                {couponCode}
              </Text>
            </View>
          )}

          {/* Credit hike fee */}
          <SummaryRow
            label={`Credit Fee (${creditHikePercentage}%)`}
            value={`+ ${formatRsNum(creditHikeAmount!)}`}
            highlight
          />

          <SummaryRow
            label="Included Tax"
            value={formatRs(summary.taxAmountString)}
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

          {/* Order Total uses creditSalePrice as the final total */}
          <SummaryRow
            label="Order Total"
            value={formatRsNum(creditSalePrice!)}
            bold
          />

          {/* Savings replaced by credit notice */}
          <View className="mt-4 flex-row items-center justify-end">
            <Sparkles size={16} color="#e97316" />
            <Text className="ml-2 text-sm font-semibold text-orange-600">
              Credit fee of {formatRsNum(creditHikeAmount!)} applied
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
            <View className="mb-2 flex-row items-center justify-between">
              <Text className="text-sm text-neutral-700">Coupon Applied</Text>
              <Text className="ml-1 text-sm text-neutral-700">
                {couponCode}
              </Text>
            </View>
          )}

          {summary.discount > 0 && (
            <SummaryRow
              label="Discount"
              value={`- ${formatRs(summary.discountString)}`}
            />
          )}

          <SummaryRow
            label="Included Tax"
            value={formatRs(summary.taxAmountString)}
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

          <SummaryRow
            label="Order Total"
            value={formatRs(summary.orderTotalString)}
            bold
          />

          {summary.discount > 0 && (
            <View className="mt-4 flex-row items-center justify-end">
              <Sparkles size={16} color="#2d6b06" />
              <Text className="ml-2 text-sm font-semibold text-[#2d6b06]">
                You saved {formatRs(summary.discountString)}
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};
