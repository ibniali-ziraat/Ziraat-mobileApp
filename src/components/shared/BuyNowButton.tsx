import { BuyNowButtonProps } from "@/src/types/buy.type";
import { TouchableOpacity } from "react-native";
import CsText from "./CsText";

export default function BuyNowButton({ onPress, title = "Buy Now" }: BuyNowButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 py-3 rounded-lg items-center bg-secondary shadow"
    >
      <CsText className="font-bold text-light text-lg text-center">
        {title?.toString() || "Buy Now"}
     </CsText>
    </TouchableOpacity>
  );
}
