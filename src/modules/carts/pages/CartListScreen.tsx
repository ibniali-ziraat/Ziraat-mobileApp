import BackHeader from "@/src/components/shared/BackHeader";
import Loader from "@/src/components/shared/Loader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { toast } from "@backpackapp-io/react-native-toast";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";

import CartFooter from "../components/CartFooter";
import CartListItem from "../components/CartListItem";
import CouponSection from "../components/CouponSection";
import EmptyCartView from "../components/EmptyCartView";
import { useCart } from "../hooks/useCart";
import { useCartCheckout } from "../hooks/useCartCheckout";
import { useCartTotals } from "../hooks/useCartTotals";
import { useCoupon } from "../hooks/useCoupon";
import { CartItemType } from "../types/cart.types";

const MULTI_VENDOR_MESSAGE =
  "You can only order items from one vendor at a time. Please remove items from other vendors to continue.";

const CartListScreen = () => {
  const router = useRouter();

  const { cart, isCartBusy, updateCartItem, removeFromCart } = useCart();

  const coupon = useCoupon(cart?.[0]?.vendorId);

  // --- multi-vendor guard: the whole cart must belong to a single vendor ---
  const cartVendorIds = new Set(
    (cart ?? [])
      .map((item: any) => item.vendorId)
      .filter((v: any) => v !== undefined && v !== null),
  );
  const hasVendorConflict = cartVendorIds.size > 1;

  // Subtotal is computed from the whole cart
  const { subtotal } = useCartTotals({
    cart,
    couponData: coupon.couponData,
    selectedCoupon: coupon.selectedCoupon,
  });

  const { handlePlaceOrder, isPending } = useCartCheckout({
    selectedCoupon: coupon.selectedCoupon,
    resetCoupon: coupon.resetCoupon,
  });

  const handleRemoveItem = async (id: string) => {
    await removeFromCart({ id: Number(id) });
    toast.success("Removed from cart");
  };

  const handleQtyChange = (cartItemId: string, quantity: number) =>
    updateCartItem({ cartItemId, quantity });

  const handleCheckoutPress = () => {
    if (hasVendorConflict) {
      toast.error(MULTI_VENDOR_MESSAGE);
      return;
    }
    handlePlaceOrder(cart.map((item: CartItemType) => item.id));
  };

  if (isCartBusy)
    return (
      <ScreenLayout>
        <Loader />
      </ScreenLayout>
    );

  if (!cart?.length)
    return (
      <ScreenLayout>
        <BackHeader title="My Cart" desc="Your selected items" />
        <EmptyCartView
          onStartShopping={() => router.push(ROUTES.TABS.PRODUCTS)}
        />
      </ScreenLayout>
    );

  return (
    <ScreenLayout scrollable={false}>
      <BackHeader title="My Cart" desc={`${cart.length} items`} />

      <FlatList<CartItemType>
        data={cart}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 260 }}
        // ListHeaderComponent={
        //   hasVendorConflict ? (
        //     <View
        //       style={{
        //         backgroundColor: "#fdecea",
        //         borderRadius: 12,
        //         padding: 12,
        //         marginBottom: 12,
        //       }}
        //     >
        //       <Text
        //         style={{
        //           color: "#c62828",
        //           fontSize: 13,
        //           fontWeight: "600",
        //           textAlign: "center",
        //         }}
        //       >
        //         {MULTI_VENDOR_MESSAGE}
        //       </Text>
        //     </View>
        //   ) : null
        // }
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            <CartListItem
              item={item}
              quantity={item.quantity}
              onQtyChange={(qty: number) => handleQtyChange(item.id, qty)}
              handleRemoveItem={() => handleRemoveItem(item.id)}
            />
          </View>
        )}
      />

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingTop: 12,
          paddingHorizontal: 16,
          paddingBottom: 24,
          backgroundColor: colors.light,
          elevation: 12,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <CouponSection
          showCoupons={coupon.showCoupons}
          setShowCoupons={coupon.setShowCoupons}
          couponData={coupon.couponData}
          isCheckingCoupon={coupon.isCheckingCoupon}
          selectedCoupon={coupon.selectedCoupon}
          onApplyCoupon={coupon.handleApplyCoupon}
          onResetCoupon={coupon.resetCoupon}
        />

        <CartFooter
          subtotal={subtotal}
          isPending={isPending}
          onCheckout={handleCheckoutPress}
          hasConflict={hasVendorConflict}
        />
      </View>
    </ScreenLayout>
  );
};

export default CartListScreen;