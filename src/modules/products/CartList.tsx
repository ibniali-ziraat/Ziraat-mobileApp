import BackHeader from "@/src/components/shared/BackHeader";
import BuyNowButton from "@/src/components/shared/BuyNowButton";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import CartListItem from "./components/CartListItem";

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { toast } from "@backpackapp-io/react-native-toast";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from "./hooks/data/useCart";
import { useCheckout, useCouponCode } from "./hooks/data/useCheckout";

const CartList = () => {
  const router = useRouter();
  const { cart, isLoading, updateCartItem, removeFromCart } = useCart();

  const { mutate: applyCoupon, isPending: isApplyingCoupon } = useCouponCode();
  const { mutate: handleCheckout, isPending } = useCheckout();

  const [couponCode, setCouponCode] = useState("");

  /* ================= REMOVE ITEM ================= */
  const handleRemoveItem = async (id) => {
    await removeFromCart({ id });
    toast.success("Removed from cart");
  };

  /* ================= QTY CHANGE ================= */
  const handleQtyChange = (cartItemId, qty) => {
    updateCartItem({
      cartItemId,
      quantity: qty,
    });
  };

  /* ================= APPLY COUPON ================= */
  const handleApplyCoupon = () => {
    const trimmedCode = couponCode.trim();

    if (!trimmedCode) {
      toast.error("Please enter coupon code");
      return;
    }

    const payload = {
      couponCode: trimmedCode,
    };

    applyCoupon(payload, {
      onSuccess: (data) => {
        if (data?.succeeded) {
          toast.success("Coupon applied successfully");

          console.log("Discount:", data.discountAmount);
        } else {
          toast.error(data?.errorMessage || "Invalid coupon code");

          console.log("Coupon failed:", data?.errorMessage);
        }
      },

      onError: (error) => {
        toast.error("Something went wrong");
        console.log("Network error:", error);
      },
    });
  };

  /* ================= START SHOPPING ================= */
  const handleStartShopping = () => {
    router.push("/Product");
  };

  const handlePlaceOrder = () => {
    const payload = {
      couponCode: couponCode.trim() || "",
    };

    handleCheckout(payload, {
      onSuccess: async (data) => {
        try {
          const checkoutId = data?.checkoutId;

          if (checkoutId) {
            await AsyncStorage.setItem("checkoutId", checkoutId);
            console.log("Checkout ID saved:", checkoutId);
          }

          // toast.success("Order placed successfullyghjkl");
          router.push("/products/address");
        } catch (error) {
          console.log("AsyncStorage error:", error);
        }
      },

      onError: (error) => {
        toast.error("Checkout failed");
        console.log("Checkout error:", error);
      },
    });
  };

  /* ================= SUBTOTAL ================= */
  const subtotal = cart?.reduce((sum, item) => {
    const price = Number(item.total) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <ScreenLayout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenLayout>
    );
  }

  /* ================= EMPTY CART ================= */
  if (!cart || cart.length === 0) {
    return (
      <ScreenLayout>
        <BackHeader title="My Cart" desc="Your selected items" />

        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={require("@/assets/images/empty-wishlist.png")}
            style={{ width: 90, height: 90 }}
            resizeMode="contain"
          />

          <CsText
            style={typography.Poppins_m_semibold}
            className="text-dark mb-1"
          >
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

  /* ================= CART LIST ================= */
  return (
    <ScreenLayout scrollable={false}>
      <BackHeader title="My Cart" desc={`${cart.length} items`} />

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 260 }}
        renderItem={({ item }) => (
          <View className="mb-2 rounded-2xl">
            <CartListItem
              item={item}
              quantity={item.quantity}
              onQtyChange={(qty) => handleQtyChange(item.id, qty)}
              handleRemoveItem={() => handleRemoveItem(item.id)}
            />
          </View>
        )}
      />

      {/* ================= STICKY SUMMARY ================= */}
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
        {/* ===== Coupon Section ===== */}
        <View className="mb-3">
          <CsText
            style={typography.Poppins_s_regular}
            className="text-dark mb-1"
          >
            Apply Coupon
          </CsText>

          <View className="flex-row">
            <TextInput
              value={couponCode}
              onChangeText={setCouponCode}
              placeholder="Enter coupon code"
              placeholderTextColor="#999"
              className="flex-1 h-12 px-4 rounded-xl border mr-2"
              style={{
                borderColor: "#E5E5E5",
                backgroundColor: "#FFF",
              }}
            />

            <TouchableOpacity
              onPress={handleApplyCoupon}
              disabled={isApplyingCoupon}
              className="px-4 rounded-xl items-center justify-center"
              style={{
                backgroundColor: colors.primary,
                opacity: isApplyingCoupon ? 0.6 : 1,
              }}
            >
              <CsText className="text-light">
                {isApplyingCoupon ? "Applying..." : "Apply"}
              </CsText>
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== Subtotal ===== */}
        <View className="flex-row justify-between mb-3">
          <CsText style={typography.Poppins_m_semibold}>Subtotal</CsText>

          <CsText style={typography.Poppins_m_semibold}>
            ₹{Number(subtotal || 0).toFixed(2)}
          </CsText>
        </View>

        {/* ===== Place Order Button (no API call) ===== */}
        <BuyNowButton
          title={isPending ? "Processing..." : "Place Order"}
          onPress={handlePlaceOrder}
        />
      </View>
    </ScreenLayout>
  );
};

export default CartList;
