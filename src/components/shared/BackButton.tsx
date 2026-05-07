import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { BuyNowButtonProps } from "@/src/types/buy.type";
import { Pressable } from "react-native";
import CsText from "./CsText";

export default function BackButton({
  onPress,
  title = "Back",
}: BuyNowButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      activeOpacity={0.85}
      className="h-12 rounded-xl items-center justify-center"
      style={{
        backgroundColor: colors.light,
        borderWidth: 1,
        borderColor: colors.secondary,
      }}
    >
      <CsText
        style={[typography.Poppins_m_semibold, { color: colors.secondary }]}
      >
        {title}
      </CsText>
    </Pressable>
  );
}
