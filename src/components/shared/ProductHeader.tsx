import { colors } from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { Heart, ShoppingCart } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import CsText from "./CsText";

const ProductHeader = () => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between h-16 bg-white px-4">
      {/* Title */}
      <View>
        <CsText className="text-lg font-bold text-dark">Products</CsText>

        <CsText className="text-sm text-neutral">
          Shop fertilizers, Tools & Supplies
       </CsText>
      </View>

      <View className="flex-row items-center space-x-3">
        <TouchableOpacity
          onPress={() => router.push("/products/wishlist")}
          className="p-2 me-2 rounded-full bg-white border"
          style={{ borderColor: colors.neutral }}
        >
          <Heart size={20} color={colors.secondary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/products/cartlist")}
          className="p-2 rounded-full bg-white border"
          style={{ borderColor: colors.neutral }}
        >
          <ShoppingCart size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(ProductHeader);
