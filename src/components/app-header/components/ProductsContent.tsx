import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { useCart } from "@/src/modules/products/hooks/data/useCart";
import { useWishlist } from "@/src/modules/wishlist/hooks/useWishlist";
import { router } from "expo-router";
import { Heart, ShoppingCart } from "lucide-react-native";
import { Text, View } from "react-native";
import { Pressable } from "@/src/components/shared/Pressable";
import Badge from "./Badge";

const ProductsContent = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const cartCount = cart?.length || 0;
  const wishlistCount = wishlist?.length || 0;

  return (
    <View className="flex-row items-center justify-between h-16">
      <View>
        <Text
          style={[typography.Poppins_m_semibold, { color: colors.dark }]}
          className="text-lg"
        >
          Shop
        </Text>
        <Text
          style={[typography.Poppins_xs_regular, { color: colors.dark }]}
          className="text-neutral"
        >
          Fertilizers, sprays, tools & supplies
        </Text>
      </View>

      <View className="flex-row items-center">
        <Pressable
          onPress={() => router.push(ROUTES.SHOPPING.WISHLIST)}
          className="p-2 relative mr-2"
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <Heart size={24} color={colors.secondary} />
          <Badge count={wishlistCount} />
        </Pressable>

        <Pressable
          onPress={() => router.push(ROUTES.SHOPPING.CART)}
          className="p-2 relative"
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <ShoppingCart size={24} color={colors.secondary} />
          <Badge count={cartCount} />
        </Pressable>
      </View>
    </View>
  );
};

export default ProductsContent;
