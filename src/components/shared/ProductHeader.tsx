import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useRouter } from "expo-router";
import { Heart, ShoppingCart } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import CsText from "./CsText";

const ProductHeader = () => {
  const router = useRouter();

  // static counts (replace with real values later)
  const wishlistCount = 3;
  const cartCount = 5;

  return (
    <View className="flex-row items-center justify-between h-16 bg-light px-4">
      <View>
        <CsText
          style={[typography.Poppins_m_semibold, { color: colors.dark }]}
          className="text-lg"
        >
          Products
        </CsText>

        <CsText
          style={[typography.Poppins_xs_regular, { color: colors.dark }]}
          className="text-neutral"
        >
          Shop fertilizers, Tools & Supplies
        </CsText>
      </View>

      <View className="flex-row items-center space-x-3">
        {/* Wishlist */}
        <TouchableOpacity
          onPress={() => router.push("/products/wishlist")}
          className="p-2 relative mr-2"
        >
          <Heart size={24} color={colors.secondary} />

          {wishlistCount > 0 && (
            <View className="absolute -top-1 -right-1 bg-secondary rounded-full h-5 w-5 items-center justify-center">
              <CsText
                style={[typography.Poppins_s_regular, { color: colors.light }]}
              >
                {wishlistCount}
              </CsText>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/products/cartlist")}
          className="p-2 relative"
        >
          <ShoppingCart size={24} color={colors.primary} />

          {cartCount > 0 && (
            <View className="absolute -top-1 -right-1 bg-primary h-5 w-5 rounded-full items-center justify-center">
              <CsText
                style={[typography.Poppins_s_regular, { color: colors.light }]}
              >
                {cartCount}
              </CsText>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(ProductHeader);
