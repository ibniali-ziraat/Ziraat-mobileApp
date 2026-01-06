import { typography } from "@/src/constants/fonts/typography";
import { BuyNowButtonProps } from "@/src/types/buy.type";
import { TouchableOpacity } from "react-native";
import CsText from "./CsText";

export default function BuyNowButton({ onPress, title = "Buy Now" }: BuyNowButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className=" flex-1 py-3 rounded-lg items-center bg-secondary "
    >
      <CsText style={typography.Poppins_m_semibold}
        className=" text-light text-center">
        {title?.toString() || "Buy Now"}
      </CsText>
    </TouchableOpacity>
  );
}
