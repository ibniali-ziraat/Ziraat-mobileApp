import { toast } from "@backpackapp-io/react-native-toast";
import { useState } from "react";
import {
  useCouponCode,
  useGetCouponCode,
} from "../../checkout/hooks/useCheckout";
import { CouponType } from "../types/cart.types";

export function useCoupon(vendorId?: number) {
  const [couponCode, setCouponCode] = useState<string>("");
  const [showCoupons, setShowCoupons] = useState<boolean>(false);
  const [selectedCoupon, setSelectedCoupon] = useState<string>("");

  const { mutateAsync: applyCoupon } = useCouponCode();

  const { data: couponData = [], isLoading: isCheckingCoupon } =
    useGetCouponCode(couponCode, vendorId) as {
      data: CouponType[];
      isLoading: boolean;
    };

  const resetCoupon = () => {
    setSelectedCoupon("");
    setCouponCode("");
  };

  const handleApplyCoupon = async (coupon: CouponType) => {
    try {
      const res = await applyCoupon({ couponCode: coupon.code });

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
      toast.error(err?.response?.data?.message || "Invalid coupon");
      resetCoupon();
    }
  };

  return {
    couponCode,
    showCoupons,
    setShowCoupons,
    selectedCoupon,
    couponData,
    isCheckingCoupon,
    resetCoupon,
    handleApplyCoupon,
  };
}
