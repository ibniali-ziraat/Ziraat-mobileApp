import BuyNowButton from "@/src/components/shared/BuyNowButton";
import { typography } from "@/src/constants/fonts/typography";
import { Text, View } from "react-native";

type Props = {
  subtotal: number;
  isPending: boolean;
  onCheckout: () => void;
  // --- select-wise checkout ---
  selectedCount: number;
  totalCount: number;
  hasConflict: boolean;
  conflictMessage?: string | null;
  onSelectAll?: () => void;
  onClearSelection?: () => void;
};

const CartFooter = ({
  subtotal,
  isPending,
  onCheckout,
  selectedCount,
  totalCount,
  hasConflict,
  conflictMessage,
  onSelectAll,
  onClearSelection,
}: Props) => {
  const nothingSelected = selectedCount === 0;
  const disableCheckout = isPending || nothingSelected || hasConflict;

  return (
    <>
      {/* SELECT ALL / CLEAR */}
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text style={typography.Poppins_m_semibold}>
          {selectedCount} of {totalCount} selected
        </Text>

        <Pressable
          onPress={
            selectedCount === totalCount ? onClearSelection : onSelectAll
          }
        >
          <Text style={[typography.Poppins_m_semibold, { color: "#2563eb" }]}>
            {selectedCount === totalCount ? "Clear" : "Select all"}
          </Text>
        </Pressable>
      </View> */}

      {/* CONFLICT WARNING */}
      {hasConflict && conflictMessage && (
        <Text
          style={[
            typography.Poppins_m_semibold,
            { color: "#dc2626", marginBottom: 8, fontSize: 12 },
          ]}
        >
          {conflictMessage}
        </Text>
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text style={typography.Poppins_m_semibold}>Subtotal</Text>
        <Text style={typography.Poppins_m_semibold}>
          ₹{subtotal.toFixed(2)}
        </Text>
      </View>

      <BuyNowButton
        title={
          isPending
            ? "Processing..."
            : nothingSelected
              ? "Select items to checkout"
              : "Checkout"
        }
        onPress={onCheckout}
        disabled={disableCheckout}
      />
    </>
  );
};

export default CartFooter;
