import { colors } from "@/src/constants/colors";
import { ShoppingCart } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
    <TouchableOpacity
      onPress={handlePress}
      disabled={loading}
      activeOpacity={0.8}
      className="w-full border border-neutral  py-3 rounded-lg flex-row justify-center items-center">
     (
        <View className="flex-row justify-center items-center w-full">
          <ShoppingCart size={20} color={colors.dark} />
          <Text
            className="text-dark font-semibold text-lg flex-shrink ml-2"
            numberOfLines={1}
      
          >
            {title}
          </Text>
        </View>
      )
    </TouchableOpacity>
  );
}
