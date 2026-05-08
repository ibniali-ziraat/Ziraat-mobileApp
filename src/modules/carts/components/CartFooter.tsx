import BuyNowButton from "@/src/components/shared/BuyNowButton";
import { typography } from "@/src/constants/fonts/typography";
import { Text, View } from "react-native";

type Props = {
  subtotal: number;
  isPending: boolean;
  onCheckout: () => void;
};

const CartFooter = ({
  subtotal,
  isPending,
  onCheckout,
}: Props) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text style={typography.Poppins_m_semibold}>
          Subtotal
        </Text>
        <Text style={typography.Poppins_m_semibold}>
          ₹{subtotal.toFixed(2)}
        </Text>
      </View>

      <BuyNowButton
        title={isPending ? "Processing..." : "Checkout"}
        onPress={onCheckout}
      />
    </>
  );
};

export default CartFooter;