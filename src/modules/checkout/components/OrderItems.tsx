import { cardTokens } from "@/src/constants/dashboardTheme";
import { menuArt } from "@/src/constants/iconArt";
import CheckoutSectionTitle from "./CheckoutSectionTitle";
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

// The API formats money with .NET's invariant culture, which prints the
// generic currency sign "¤" (older payloads used "$"). Show rupees either way.
const formatRs = (value: string) => value?.replace(/[$¤]/g, "₹");

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
        borderColor: cardTokens.hairline,
        padding: 16,
      },
    ]}
  >
    <CheckoutSectionTitle title="Items" art={menuArt.orders} />

    {items.map((item, index) => (
      <View
        key={item.id}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: index === items.length - 1 ? 0 : 14,
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 14,
            marginRight: 12,
            borderWidth: 1,
            borderColor: cardTokens.hairline,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: cardTokens.surface,
          }}
        >
          <Image
            source={{ uri: item.productImage }}
            resizeMode="contain"
            style={{ width: 50, height: 50 }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={[
              typography.Poppins_s_medium,
              { color: cardTokens.inkPrimary, fontSize: 16 },
            ]}
          >
            {item.productName}
          </Text>

          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, fontSize: 15, marginTop: 2 },
            ]}
          >
            Qty: {item.quantity}
          </Text>
        </View>

        <Text
          style={[
            typography.Poppins_s_semibold,
            { color: cardTokens.inkPrimary, fontSize: 16 },
          ]}
        >
          {getLineTotal(item, isBuyOnCredit)}
        </Text>
      </View>
    ))}
  </View>
);
