import CsText from "@/src/components/shared/CsText";
import { typography } from "@/src/constants/fonts/typography";
import { Pressable, View } from "react-native";

type Props = {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
};

const QuantitySelector = ({
  value,
  onIncrease,
  onDecrease,
  min = 1,
  max,
}: Props) => {
  return (
    <View className="flex-row items-center">
      <Pressable
        onPress={onDecrease}
        disabled={value <= min}
        className={`px-3 py-1 rounded ${
          value <= min ? "bg-gray-100" : "bg-gray-200"
        }`}
      >
        <CsText style={typography.Poppins_m_medium}>-</CsText>
      </Pressable>

      <CsText
        className="mx-4 min-w-[24px] text-center"
        style={typography.Poppins_m_medium}
      >
        {value}
      </CsText>

      <Pressable
        onPress={onIncrease}
        disabled={max ? value >= max : false}
        className={`px-3 py-1 rounded ${
          max && value >= max ? "bg-gray-100" : "bg-gray-200"
        }`}
      >
        <CsText style={typography.Poppins_m_medium}>+</CsText>
      </Pressable>
    </View>
  );
};

export default QuantitySelector;
