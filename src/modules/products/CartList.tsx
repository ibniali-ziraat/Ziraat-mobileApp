import BackHeader from "@/src/components/shared/BackHeader";
import BuyNowButton from "@/src/components/shared/BuyNowButton";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import CartListItem from "./components/CartListItem";

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { toast } from "@backpackapp-io/react-native-toast";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "./hooks/data/useCart";

const CartList = () => {
  const router = useRouter();
  const { cart, isLoading, updateCartItem, removeFromCart } = useCart();

  const handleRemoveItem = async (id) => {
    await removeFromCart({ id });
    toast.success("Removed from cart");
  };

  const handleQtyChange = (cartItemId, qty) => {
    updateCartItem({
      cartItemId,
      quantity: qty,
    });
  };

  const handleBuyNow = () => {
    router.push("/products/address");
  };

  const handleStartShopping = () => {
    router.push("/Product");
  };

  const subtotal = cart?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ============== LOADING ============== */
  if (isLoading) {
    return (
      <ScreenLayout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenLayout>
    );
  }

  /* ============== EMPTY ============== */
  if (!cart || cart.length === 0) {
    return (
      <ScreenLayout>
        <BackHeader title="My Cart" desc="Your selected items" />

        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={require("@/assets/images/empty-wishlist.png")}
            className="w-48 h-48 mb-6"
            resizeMode="contain"
          />

          <CsText style={typography.Poppins_m_semibold} className="text-dark mb-1">
            Your cart is empty
          </CsText>

          <CsText
            style={[typography.Poppins_s_regular, { opacity: 0.6 }]}
            className="text-dark mb-4 text-center"
          >
            Add items to continue shopping
          </CsText>

          <TouchableOpacity
            onPress={handleStartShopping}
            className="bg-primary py-3 px-6 rounded-full"
          >
            <CsText className="text-light">Browse Products</CsText>
          </TouchableOpacity>
        </View>
      </ScreenLayout>
    );
  }

  /* ============== LIST ============== */
  return (
    <ScreenLayout scrollable={false}>
      <BackHeader
        title="My Cart"
        desc={`${cart.length} items`}
      />

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 220 }}
        renderItem={({ item }) => (
          <View
            className="mb-2 rounded-2xl "
            style={{
              
            }}
          >
            <CartListItem
              item={item}
              quantity={item.quantity}
              onQtyChange={(qty) => handleQtyChange(item.id, qty)}
              handleRemoveItem={() => handleRemoveItem(item.id)}
            />
          </View>
        )}
      />

      {/* Sticky Summary */}
      <View
        className="absolute bottom-0 left-0 right-0 pt-3 px-4 pb-6"
        style={{
          backgroundColor: colors.light,
          shadowColor: colors.dark,
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 12,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        {/* Subtotal */}
        <View className="flex-row justify-between mb-3">
          <CsText style={typography.Poppins_m_semibold}>
            Subtotal
          </CsText>

          <CsText style={typography.Poppins_m_semibold}>
            ₹{subtotal?.toFixed(2)}
          </CsText>
        </View>

        <BuyNowButton title="Place Order" onPress={handleBuyNow} />
      </View>
    </ScreenLayout>
  );
};

export default CartList;
  