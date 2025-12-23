import { TouchableOpacity, View } from "react-native";
import CsText from "./CsText";
export default function QuantitySelector({ quantity, setQuantity }) {
  return (
    <View className="flex-row items-center rounded-xl border border-dark bg-white">
      <TouchableOpacity
        onPress={() => quantity > 1 && setQuantity(quantity - 1)}
        className="px-4 py-1"
      >
        <CsText className="text-dark text-lg font-bold">-</CsText>
      </TouchableOpacity>

      <CsText className="mx-4 text-xl font-bold text-dark">{quantity}</CsText>

    
      <TouchableOpacity
        onPress={() => setQuantity(quantity + 1)}
        className="px-4 py-1"
      >
        <CsText className="text-dark text-lg font-bold">+</CsText>
      </TouchableOpacity>
    </View>
  );
}
