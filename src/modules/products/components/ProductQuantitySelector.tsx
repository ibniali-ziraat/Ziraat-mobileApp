import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { Minus, Plus } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

type Props = {
  quantity: number;
  setQuantity: (qty: number) => void;
  max?: number;
};

export default function ProductQuantitySelector({
  quantity,
  setQuantity,
  max,
}: Props) {
  const increment = () => {
    if (!max || quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View className="flex-row items-center mt-4 px-4">
      <CsText style={typography.Poppins_m_semibold} className="mr-4">
        Quantity
      </CsText>

      <View className="flex-row items-center bg-white rounded-full shadow-sm">
        <TouchableOpacity
          onPress={decrement}
          disabled={quantity === 1}
          className={`p-3 ${quantity === 1 ? "opacity-40" : ""}`}
        >
          <Minus size={18} color={colors.dark} />
        </TouchableOpacity>

        <CsText style={typography.Poppins_m_semibold} className="px-4">
          {quantity}
        </CsText>

        <TouchableOpacity
          onPress={increment}
          disabled={!!max && quantity >= max}
          className={`p-3 ${max && quantity >= max ? "opacity-40" : ""}`}
        >
          <Plus size={18} color={colors.dark} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
