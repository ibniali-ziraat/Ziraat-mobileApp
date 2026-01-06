import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ShoppingCart } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import CsText from "./CsText";
import ZiraatCard from "./ZiraatProfileCard";

export default function AddToCartButton({ title = "Add to Cart", onPress }) {
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onPress?.();
    }, 300);
  };


  return (
    <ZiraatCard width="100%">
      <TouchableOpacity
        onPress={handlePress}
        disabled={loading}
        activeOpacity={0.8}
        className=" py-3 rounded-lg flex-row justify-center items-center  "
      >

        <View className="flex-row justify-center items-center w-full">
          <ShoppingCart size={20} color={colors.secondary} />
          <CsText
            className="text-dark  flex-shrink ml-2" style={[typography.Poppins_s_medium]}
            numberOfLines={1}
          >
            {title}
          </CsText>
        </View>
      </TouchableOpacity>
    </ZiraatCard>

  );
}