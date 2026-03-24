import { colors } from "@/src/constants/colors";
import { BuyNowButtonProps } from "@/src/types/buy.type";
import { Text, TouchableOpacity } from "react-native";

export default function BuyNowButton({
  onPress,
  title = "Buy Now",
}: BuyNowButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="h-12 rounded-xl items-center justify-center"
      style={{
        backgroundColor: colors.secondary,
      }}
    >
      <Text className="text-white font-bold">{title}</Text>
    </TouchableOpacity>
  );
}
