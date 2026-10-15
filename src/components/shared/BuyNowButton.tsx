import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { BuyNowButtonProps } from "@/src/types/buy.type";
import { Pressable, Text } from "react-native";

export default function BuyNowButton({
  onPress,
  title = "Buy Now",
}: BuyNowButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      activeOpacity={0.85}
      className="h-12 rounded-xl items-center justify-center"
      style={{
        backgroundColor: colors.secondary,
      }}
    >
      <Text style={[typography.Poppins_m_semibold, { color: colors.light }]}>
        {title}
      </Text>
    </Pressable>
  );
}
