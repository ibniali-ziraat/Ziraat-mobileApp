import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { BuyNowButtonProps } from "@/src/types/buy.type";
import { TouchableOpacity } from "react-native";
import CsText from "./CsText";

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
      <CsText style={[typography.Poppins_m_semibold, { color: colors.light }]}>
        {title}
      </CsText>
    </TouchableOpacity>
  );
}
