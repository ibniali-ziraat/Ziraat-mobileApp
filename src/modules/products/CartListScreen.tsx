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
  TouchableOpacity,
  View,
} from "react-native";

import { X } from "lucide-react-native";

import { ROUTES } from "@/src/constants/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useCheckout,
  useCouponCode,
  useGetCouponCode,
} from "../checkout/hooks/useCheckout";
import { useCart } from "./hooks/data/useCart";

const CartListScreen = () => {
  const router = useRouter();

  const { cart, isLoading, updateCartItem, removeFromCart } = useCart();

  const { mutate: applyCoupon } = useCouponCode();
  const { mutate: handleCheckout, isPending } = useCheckout();

  const [couponCode, setCouponCode] = useState("");
  const [showCoupons, setShowCoupons] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("");

  const {
    data: couponData = [],
    isLoading: isCheckingCoupon,
  } = useGetCouponCode(couponCode);

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

  const handleStartShopping = () => {
    router.push(ROUTES.TABS.PRODUCTS);
  };

  // ✅ UPDATED CHECKOUT (IMPORTANT CHANGE HERE)
  const handlePlaceOrder = () => {
    handleCheckout(
      { couponCode: selectedCoupon || "" },
      {
        onSuccess: async (data) => {
          const checkoutId = data?.checkoutId;

          if (checkoutId) {
            await AsyncStorage.setItem("checkoutId", checkoutId);
          }

          // ✅ SAVE APPLIED COUPON
          await AsyncStorage.setItem(
            "appliedCoupon",
            selectedCoupon || ""
          );

          router.push(ROUTES.SHOPPING.CHECKOUT.SELECT_ADDRESS);
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message ||
              "Checkout failed due to coupon"
          );

          setSelectedCoupon("");
          setCouponCode("");
        },
      }
    );
  };

  const subtotalRaw = cart?.reduce((sum, item) => {
    return sum + (Number(item.total) || 0) * (Number(item.quantity) || 0);
  }, 0);

  const appliedCoupon = couponData.find(
    (c) => c.code === selectedCoupon
  );

  const discount = appliedCoupon?.discountAmount || 0;

  const subtotal = Math.max((subtotalRaw || 0) - discount, 0);

  if (isLoading) {
    return (
      <ScreenLayout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenLayout>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <ScreenLayout>
        <BackHeader title="My Cart" desc="Your selected items" />

        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={require("@/assets/images/empty-wishlist.png")}
            style={{ width: 90, height: 90 }}
          />

          <CsText style={typography.Poppins_m_semibold}>
            Your cart is empty
          </CsText>

          <CsText
            style={[typography.Poppins_s_regular, { opacity: 0.6 }]}
          >
            Add items to continue shopping
          </CsText>

          <TouchableOpacity
            onPress={handleStartShopping}
            className="bg-primary py-3 px-6 rounded-full mt-4"
          >
            <CsText className="text-light">
              Browse Products
            </CsText>
          </TouchableOpacity>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout scrollable={false}>
      <BackHeader title="My Cart" desc={`${cart.length} items`} />

      <FlatList
        data={cart}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 260,
        }}
        renderItem={({ item }) => (
          <View className="mb-2">
            <CartListItem
              item={item}
              quantity={item.quantity}
              onQtyChange={(qty) =>
                handleQtyChange(item.id, qty)
              }
              handleRemoveItem={() =>
                handleRemoveItem(item.id)
              }
            />
          </View>
        )}
      />

      <View
        className="absolute bottom-0 left-0 right-0 pt-3 px-4 pb-6"
        style={{
          backgroundColor: colors.light,
          elevation: 12,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View className="mb-4">
          <View className="flex-row mb-3 justify-between items-center">
            <CsText style={typography.Poppins_m_semibold}>
              Apply Coupon
            </CsText>

            <TouchableOpacity
              onPress={() => setShowCoupons(!showCoupons)}
            >
              <CsText style={typography.Poppins_s_regular}>
                {showCoupons ? "Hide" : "View"}
              </CsText>
            </TouchableOpacity>
          </View>

          {showCoupons && (
            <View className="mt-3 rounded-2xl p-2 border border-gray-200 bg-gray-50">
              {isCheckingCoupon ? (
                <ActivityIndicator color={colors.primary} />
              ) : couponData.length > 0 ? (
                couponData.map((coupon) => (
                  <TouchableOpacity
                    key={coupon.code}
                    onPress={() => {
                      applyCoupon(
                        { couponCode: coupon.code },
                        {
                          onSuccess: (res) => {
                            if (res?.success !== false) {
                              setSelectedCoupon(coupon.code);
                              setCouponCode(coupon.code);

                              toast.success("Coupon applied");
                              setShowCoupons(false);
                            } else {
                              toast.error(
                                res?.message ||
                                  "Coupon not valid"
                              );
                              setSelectedCoupon("");
                              setCouponCode("");
                            }
                          },
                          onError: (err) => {
                            toast.error(
                              err?.response?.data?.message ||
                                "Invalid coupon"
                            );

                            setSelectedCoupon("");
                            setCouponCode("");
                          },
                        }
                      );
                    }}
                    className="flex-row justify-between items-center p-3 mb-2 rounded-xl border"
                    style={{
                      backgroundColor:
                        selectedCoupon === coupon.code
                          ? "#EFF6FF"
                          : "#fff",
                      borderColor:
                        selectedCoupon === coupon.code
                          ? colors.primary
                          : "#E5E7EB",
                    }}
                  >
                    <View className="flex-row items-center gap-3">
                      <View
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 9,
                          borderWidth: 2,
                          borderColor: colors.primary,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {selectedCoupon === coupon.code && (
                          <View
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: 5,
                              backgroundColor: colors.primary,
                            }}
                          />
                        )}
                      </View>

                      <View>
                        <CsText
                          style={typography.Poppins_m_semibold}
                        >
                          {coupon.code}
                        </CsText>
                        <CsText
                          style={typography.Poppins_s_regular}
                        >
                          {coupon.ruleName}
                        </CsText>
                        <CsText
                          style={typography.Poppins_s_regular}
                        >
                          {coupon.endDate
                            ? `Valid until ${new Date(
                                coupon.endDate
                              ).toLocaleDateString()}`
                            : "No expiry"}
                        </CsText>
                        <CsText style={{ opacity: 0.6 }}>
                          Save ₹{coupon.discountAmount}
                        </CsText>
                      </View>
                    </View>

                    <CsText className="text-green-600 text-xs">
                      Apply
                    </CsText>
                  </TouchableOpacity>
                ))
              ) : (
                <CsText className="text-center text-gray-400">
                  No coupons available
                </CsText>
              )}
            </View>
          )}

          {selectedCoupon !== "" && (
            <View className="mt-3 p-3 rounded-xl bg-green-50 border border-green-200 flex-row items-center justify-between">
              <CsText className="text-green-700">
                🎉 {selectedCoupon} applied
              </CsText>

              <TouchableOpacity
                onPress={() => {
                  setSelectedCoupon("");
                  setCouponCode("");
                }}
                className="p-1 rounded-full bg-green-100"
              >
                <X size={16} color={colors.secondary} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View className="flex-row justify-between mb-3">
          <CsText style={typography.Poppins_m_semibold}>
            Subtotal
          </CsText>
          <CsText style={typography.Poppins_m_semibold}>
            ₹{subtotal?.toFixed(2)}
          </CsText>
        </View>

        <BuyNowButton
          title={isPending ? "Processing..." : "Checkout"}
          onPress={handlePlaceOrder}
        />
      </View>
    </ScreenLayout>
  );
};

export default CartListScreen;