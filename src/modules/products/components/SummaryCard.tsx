import QuantitySelector from "@/src/components/shared/QuantitySelector";
import { colors } from "@/src/constants/colors";
import { IndianRupee } from "lucide-react-native";
import { Text, View } from "react-native";

export default function SummaryCard({
  quantity,
  setQuantity,
  total, 
  selectedShipping, 
}) {
  const shippingPrice = Number(selectedShipping?.price) || 0;
  const productTotal = total * quantity;
  const finalAmount = productTotal + shippingPrice;

  return (
    <View className="bg-white p-4 rounded-2xl border border-neutral  mb-4">

  
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-dark">
         Selected items: {quantity}{quantity > 1 ? " items" : ""}
        </Text>
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      </View>
      <View className="mt-4 space-y-2">
      <View className="flex-row justify-between items-center">
          <Text className="text-base text-dark">
            Product price: ({quantity} × <IndianRupee size={12} color={colors.dark} /> {total})
          </Text>
          <Text className="text-base text-dark font-semibold">
            <IndianRupee size={12} color={colors.dark} /> {productTotal}
          </Text>
        </View>

        {selectedShipping && (
          <View className="flex-row justify-between items-center">
            <Text className="text-base text-dark">
              Shipping price:{selectedShipping.name}
            </Text>
            <Text className="text-base text-dark font-semibold">
              <IndianRupee size={12} color={colors.dark} /> {shippingPrice}
            </Text>
          </View>
        )}
      </View>
      <View className="flex-row items-center justify-between mt-5 border-t pt-3">
        <Text className="text-lg text-dark font-semibold">Final Amount:</Text>
        <View className="flex-row items-center">
          <IndianRupee size={20} color={colors.dark} />
          <Text className="text-2xl font-bold text-dark ml-1">{finalAmount}</Text>
        </View>
      </View>
    </View>
  );
}
