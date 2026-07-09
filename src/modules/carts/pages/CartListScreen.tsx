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
import { useCartSelection } from "../hooks/useCartSelection";
import { useCartTotals } from "../hooks/useCartTotals";
import { useCoupon } from "../hooks/useCoupon";
import { CartItemType } from "../types/cart.types";

const CartListScreen = () => {
  const router = useRouter();

  const { cart, isCartBusy, updateCartItem, removeFromCart } = useCart();

  const coupon = useCoupon();

  // --- select-wise checkout ---
  const {
    selectedIds,
    selectedItems,
    selectedCount,
    toggleSelect,
    selectAll,
    clearSelection,
    isSelected,
    conflict,
  } = useCartSelection(cart);

  // Subtotal is computed from SELECTED items only, not the whole cart
  const { subtotal } = useCartTotals({
    cart: selectedItems,
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
    if (conflict.hasConflict) {
      toast.error(conflict.message ?? "Resolve item conflicts to continue");
      return;
    }
    if (selectedCount === 0) {
      toast.error("Select at least one item to checkout");
      return;
    }
    handlePlaceOrder(Array.from(selectedIds));
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
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            <CartListItem
              item={item}
              quantity={item.quantity}
              onQtyChange={(qty: number) => handleQtyChange(item.id, qty)}
              handleRemoveItem={() => handleRemoveItem(item.id)}
              selected={isSelected(item.id)}
              onToggleSelect={toggleSelect}
              hasConflict={conflict.conflictItemIds.has(item.id)}
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
          selectedCount={selectedCount}
          totalCount={cart.length}
          hasConflict={conflict.hasConflict}
          conflictMessage={conflict.message}
          onSelectAll={selectAll}
          onClearSelection={clearSelection}
        />
      </View>
    </ScreenLayout>
  );
};

export default CartListScreen;
