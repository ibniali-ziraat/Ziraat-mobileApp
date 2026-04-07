import BackHeader from "@/src/components/shared/BackHeader";
import Loader from "@/src/components/shared/Loader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { toast } from "@backpackapp-io/react-native-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";

import {
  useCheckout,
  useCouponCode,
  useGetCouponCode,
} from "../../checkout/hooks/useCheckout";
import CartListItem from "../components/CartListItem";
import { useCart } from "../hooks/useCart";

import CartFooter from "../components/CartFooter";
import CouponSection from "../components/CouponSection";
import EmptyCartView from "../components/EmptyCartView";

type CartItemType = {
  id: string;
  quantity: number;
  total: number;
};

type CouponType = {
  code: string;
  ruleName: string;
  discountAmount: number;
};

const CartListScreen = () => {
  const router = useRouter();

  const {
    cart,
    isLoading,
    updateCartItem,
    removeFromCart,
  } = useCart() as {
    cart: CartItemType[];
    isLoading: boolean;
    updateCartItem: (data: {
      cartItemId: string;
      quantity: number;
    }) => void;
    removeFromCart: (data: { id: string }) => Promise<void>;
  };

  const { mutateAsync: applyCoupon } = useCouponCode();
  const { mutateAsync: handleCheckout, isPending } = useCheckout();

  const [couponCode, setCouponCode] = useState<string>("");
  const [showCoupons, setShowCoupons] = useState<boolean>(false);
  const [selectedCoupon, setSelectedCoupon] = useState<string>("");

  const {
    data: couponData = [],
    isLoading: isCheckingCoupon,
  } = useGetCouponCode(couponCode) as {
    data: CouponType[];
    isLoading: boolean;
  };

 
  const handleRemoveItem = async (id: string) => {
    await removeFromCart({ id });
    toast.success("Removed from cart");
  };

  const handleQtyChange = (
    cartItemId: string,
    quantity: number
  ) => updateCartItem({ cartItemId, quantity });

  const handleStartShopping = () =>
    router.push(ROUTES.TABS.PRODUCTS);

  const resetCoupon = () => {
    setSelectedCoupon("");
    setCouponCode("");
  };

  const handlePlaceOrder = async () => {
    try {
      const data = await handleCheckout({
        couponCode: selectedCoupon || "",
      });

      const checkoutId = data?.checkoutId;

      if (checkoutId) {
        await AsyncStorage.setItem("checkoutId", checkoutId);
      }

      await AsyncStorage.setItem(
        "appliedCoupon",
        selectedCoupon || ""
      );

      router.push(
        ROUTES.SHOPPING.CHECKOUT.SELECT_ADDRESS
      );
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          "Checkout failed due to coupon"
      );
      resetCoupon();
    }
  };

  const handleApplyCoupon = async (coupon: CouponType) => {
    try {
      const res = await applyCoupon({
        couponCode: coupon.code,
      });

      if (res?.success !== false) {
        setSelectedCoupon(coupon.code);
        setCouponCode(coupon.code);

        toast.success("Coupon applied");
        setShowCoupons(false);
      } else {
        toast.error(res?.message || "Coupon not valid");
        resetCoupon();
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Invalid coupon"
      );
      resetCoupon();
    }
  };

  const createQtyChangeHandler =
    (itemId: string) => (qty: number) =>
      handleQtyChange(itemId, qty);

  const createRemoveHandler =
    (itemId: string) => () =>
      handleRemoveItem(itemId);

  // ✅ CALCULATIONS
  const subtotalRaw =
    cart?.reduce<number>(
      (sum, { total, quantity }) =>
        sum +
        (Number(total) || 0) *
          (Number(quantity) || 0),
      0
    ) || 0;

  const discount =
    couponData.find(
      (c: CouponType) =>
        c.code === selectedCoupon
    )?.discountAmount || 0;

  const subtotal = Math.max(
    subtotalRaw - discount,
    0
  );


  if (isLoading)
    return (
      <ScreenLayout>
        <Loader />
      </ScreenLayout>
    );

  // ✅ EMPTY CART
  if (!cart?.length)
    return (
      <ScreenLayout>
        <BackHeader
          title="My Cart"
          desc="Your selected items"
        />
        <EmptyCartView
          onStartShopping={handleStartShopping}
        />
      </ScreenLayout>
    );


  return (
    <ScreenLayout scrollable={false}>
      <BackHeader
        title="My Cart"
        desc={`${cart.length} items`}
      />

      <FlatList<CartItemType>
        data={cart}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 260,
        }}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            <CartListItem
              item={item}
              quantity={item.quantity}
              onQtyChange={createQtyChangeHandler(
                item.id
              )}
              handleRemoveItem={createRemoveHandler(
                item.id
              )}
            />
          </View>
        )}
      />

      {/* ✅ BOTTOM SECTION */}
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
          showCoupons={showCoupons}
          setShowCoupons={setShowCoupons}
          couponData={couponData}
          isCheckingCoupon={isCheckingCoupon}
          selectedCoupon={selectedCoupon}
          onApplyCoupon={handleApplyCoupon}
          onResetCoupon={resetCoupon}
        />

        {/* ✅ Footer */}
        <CartFooter
          subtotal={subtotal}
          isPending={isPending}
          onCheckout={handlePlaceOrder}
        />
      </View>
    </ScreenLayout>
  );
};

export default CartListScreen;