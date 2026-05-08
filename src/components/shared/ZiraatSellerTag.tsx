import { Store } from "lucide-react-native";
import { View } from "react-native";
import CsText from "./CsText";

export const ZiraatSellerTag = () => (
  <View className="flex-row items-center bg-primary/20 px-3 py-1 rounded-full">
    <Store size={14} color="#2d6b06" />{" "}
    {/* Tailwind can't directly style SVGs, keep color from root */}
    <CsText className="ml-1 text-primary text-xs font-semibold">
      Ziraat Seller
   </CsText>
  </View>
);
