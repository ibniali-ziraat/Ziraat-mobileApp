import QuantitySelector from "@/src/components/shared/QuantitySelector";
import { colors } from "@/src/constants/colors";
import { IndianRupee } from "lucide-react-native";
import { View } from "react-native";
import CsText from "./CsText";

export default function SummaryCard({
  quantity,
  setQuantity,
  total, 
  selectedShipping, 
  hideQuantitySelector = false,   // 👈 this will control visibility
}) {
  const numericTotal = Number(total);
  const shippingPrice = Number(selectedShipping?.price) || 0;
  const finalAmount = numericTotal + shippingPrice;

  return (
    <View className="bg-white p-4 rounded-2xl border border-neutral mb-4">
      <View className="flex-row items-center justify-between">
        <CsText className="text-lg font-semibold text-dark">
          Selected items: {quantity}{quantity > 1 ? " items" : ""}
       </CsText>

        {!hideQuantitySelector && (
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        )}
      </View>

      <View className="mt-4 space-y-2">
        <View className="flex-row justify-between items-center">
          <CsText className="text-base text-dark">Product price</CsText>
          <CsText className="text-base text-dark font-semibold">
            <IndianRupee size={12} color={colors.dark} /> {numericTotal}
         </CsText>
        </View>

        {selectedShipping && (
          <View className="flex-row justify-between items-center">
            <CsText className="text-base text-dark">
              Shipping: {selectedShipping.name}
           </CsText>
            <CsText className="text-base text-dark font-semibold">
              <IndianRupee size={12} color={colors.dark} /> {shippingPrice}
           </CsText>
          </View>
        )}
      </View>

      <View className="flex-row items-center justify-between mt-5 border-t pt-3">
        <CsText className="text-lg text-dark font-semibold">Final Amount:</CsText>
        <View className="flex-row items-center">
          <IndianRupee size={20} color={colors.dark} />
          <CsText className="text-2xl font-bold text-dark ml-1">{finalAmount}</CsText>
        </View>
      </View>
    </View>
  );
}
