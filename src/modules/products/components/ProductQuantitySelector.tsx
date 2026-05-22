import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { Minus, Plus } from "lucide-react-native";
import { Pressable, View } from "react-native";

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
    if (!max || quantity < max) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const isMax = max && quantity >= max;

  return (
    <View className="">
      <View className="flex-row items-center justify-between">
        {/* Label */}
        <CsText style={[typography.Poppins_m_semibold, { color: colors.dark }]}>
          Quantity
        </CsText>

        {/* Controls */}
        <View
          className="flex-row items-center border rounded-xl"
          style={{ borderColor: colors.dark + "20" }}
        >
          <Pressable
            onPress={decrement}
            disabled={quantity === 1}
            className="p-3"
            style={{ opacity: quantity === 1 ? 0.3 : 1 }}
          >
            <Minus size={18} color={colors.dark} />
          </Pressable>

          <View className="px-4">
            <CsText
              style={[typography.Poppins_m_semibold, { color: colors.dark }]}
            >
              {quantity}
            </CsText>
          </View>

          <Pressable
            onPress={increment}
            disabled={!!isMax}
            className="p-3"
            style={{ opacity: isMax ? 0.3 : 1 }}
          >
            <Plus size={18} color={colors.primary} />
          </Pressable>
        </View>
      </View>

      {isMax && (
        <CsText
          style={{ color: colors.dark, opacity: 0.5 }}
          className="text-xs mt-1"
        >
          Max quantity reached
        </CsText>
      )}
    </View>
  );
}
