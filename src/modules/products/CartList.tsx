import BackHeader from "@/src/components/shared/BackHeader";
import BuyNowButton from "@/src/components/shared/BuyNowButton";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import CartListItem from "./components/CartListItem";

import { typography } from "@/src/constants/fonts/typography";
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

  const handleRemoveItem = async (id: number) => {
    await removeFromCart({ id });
  };

  const handleQtyChange = (cartItemId: number, qty: number) => {
    updateCartItem({
      id: cartItemId,
      quantity: qty,
    });
  };

  const handleBuyNow = () => {
    router.push("/products/address");
  };

  const handleStartShopping = () => {
    router.push("/Product");
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <ScreenLayout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      </ScreenLayout>
    );
  }

  /* ================= EMPTY ================= */
  if (!cart || cart.length === 0) {
    return (
      <ScreenLayout>
        <BackHeader title="My Cart" desc="Your selected items" />

        <View className="flex-1 justify-center items-center">
          <Image
            source={require("@/assets/images/empty-wishlist.png")}
            className="w-48 h-48 mb-6"
            resizeMode="contain"
          />

          <CsText
            style={typography.Poppins_m_medium}
            className="text-dark mb-2"
          >
            Your cart is empty
          </CsText>

          <TouchableOpacity
            onPress={handleStartShopping}
            className="bg-primary py-4 px-5 rounded-full"
          >
            <CsText className="text-light">Browse Products</CsText>
          </TouchableOpacity>
        </View>
      </ScreenLayout>
    );
  }

  /* ================= LIST ================= */
  return (
    <ScreenLayout scrollable={false}>
      <BackHeader
        title="My Cart"
        desc={`${cart.length} ${cart.length === 1 ? "item" : "items"} in your cart`}
      />

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ZiraatCard width="100%" marginBottom={1.2}>
            <CartListItem
              item={item}
              quantity={item.quantity}
              onQtyChange={(qty) => handleQtyChange(item.id, qty)}
              handleRemoveItem={() => handleRemoveItem(item.id)}
            />
          </ZiraatCard>
        )}
      />

      <View className="absolute bottom-0 left-0 right-0 bg-light px-4 pt-4 pb-8">
        <BuyNowButton title="Place Order" onPress={handleBuyNow} />
      </View>
    </ScreenLayout>
  );
};

export default CartList;
