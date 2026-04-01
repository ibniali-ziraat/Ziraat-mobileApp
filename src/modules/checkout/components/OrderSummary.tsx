import { typography } from "@/src/constants/fonts/typography";
import { Sparkles } from "lucide-react-native";
import { Text, View } from "react-native";

interface Summary {
  subTotalString: string;
  discount: number;
  discountString: string;
  taxAmountString: string;
  shippingAmount: number;
  shippingAmountString: string;
  orderTotalString: string;
}

interface Props {
  summary: Summary;
}

const formatRs = (value: string) => value?.replace("$", "₹");

const SummaryRow = ({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) => (
  <View className="mb-2 flex-row justify-between">
    <Text
      className={`text-sm ${bold ? "font-bold text-neutral-900" : "text-neutral-700"}`}
    >
      {label}
    </Text>
    <Text
      className={`text-sm ${bold ? "font-bold text-neutral-900" : "text-neutral-700"}`}
    >
      {value}
    </Text>
  </View>
);

const Divider = () => <View className="my-2 border-t border-neutral-100" />;

export const OrderSummary = ({ summary }: Props) => (
  <View className="mx-4 rounded-2xl bg-white p-4">
    <Text
      style={typography.Poppins_s_bold}
      className="mb-3 text-lg text-neutral-900"
    >
      Order Summary
    </Text>

    <SummaryRow label="Subtotal" value={formatRs(summary.subTotalString)} />

    {summary.discount > 0 && (
      <SummaryRow
        label="Discount"
        value={`- ${formatRs(summary.discountString)}`}
      />
    )}

    <SummaryRow label="Tax" value={formatRs(summary.taxAmountString)} />

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
  </View>
);
