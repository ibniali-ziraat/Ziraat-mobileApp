import { cardShadow, cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import {
  formatPrice,
  getCreditPrice,
  getNonCreditPrice,
} from "@/src/utils/creditPrice";
import { Image, Text, View } from "react-native";

interface OrderItem {
  id: string;
  productImage: string;
  productName: string;
  quantity: number;
  totalString: string;
  vendorAssignment?: Record<string, any>;
}

interface Props {
  items: OrderItem[];
  // the price depends on the payment method: Buy on Credit adds the credit fee
  isBuyOnCredit?: boolean;
}

const formatRs = (value: string) => value?.replace("$", "₹");

const getLineTotal = (item: OrderItem, isBuyOnCredit: boolean) => {
  const unitPrice = isBuyOnCredit
    ? getCreditPrice(item)
    : getNonCreditPrice(item);
  return unitPrice
    ? `₹${formatPrice(unitPrice * (item.quantity || 1))}`
    : formatRs(item.totalString);
};

export const OrderItems = ({ items, isBuyOnCredit = false }: Props) => (
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
      Items
    </Text>

    {items.map((item, index) => (
      <View
        key={item.id}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: index === items.length - 1 ? 0 : 14,
        }}
      >
        <Image
          source={{ uri: item.productImage }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 14,
            marginRight: 12,
            backgroundColor: cardTokens.mutedSurface,
          }}
        />

        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={[
              typography.Poppins_s_medium,
              { color: cardTokens.inkPrimary, fontSize: 15 },
            ]}
          >
            {item.productName}
          </Text>

          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, fontSize: 13, marginTop: 2 },
            ]}
          >
            Qty: {item.quantity}
          </Text>
        </View>

        <Text
          style={[
            typography.Poppins_s_semibold,
            { color: cardTokens.inkPrimary, fontSize: 15 },
          ]}
        >
          {getLineTotal(item, isBuyOnCredit)}
        </Text>
      </View>
    ))}
  </View>
);
