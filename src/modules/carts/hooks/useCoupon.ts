import { toast } from "@backpackapp-io/react-native-toast";
import { useState } from "react";
import {
  useCouponCode,
  useGetCouponCode,
} from "../../checkout/hooks/useCheckout";
import { CouponType } from "../types/cart.types";

const getBackendMessage = (data: any): string | undefined => {
  if (typeof data === "string") return data.trim() || undefined;
  if (!data || typeof data !== "object") return undefined;

  const directMessage = [
    data.errorMessage,
    data.message,
    data.error,
    data.detail,
    data.title,
  ].find((value) => typeof value === "string" && value.trim());

  if (typeof directMessage === "string") return directMessage;

  const validationErrors = data.errors
    ? Object.values(data.errors).flat(Infinity)
    : [];

  return validationErrors.find(
    (value): value is string => typeof value === "string" && !!value.trim(),
  );
};

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

      if (res?.succeeded !== false && res?.success !== false) {
        setSelectedCoupon(coupon.code);
        setCouponCode(coupon.code);
        toast.success("Coupon applied");
        setShowCoupons(false);
      } else {
        toast.error(
          getBackendMessage(res) || "Unable to apply this coupon right now",
        );
        resetCoupon();
      }
    } catch (err: any) {
      toast.error(
        getBackendMessage(err?.response?.data) ||
          "Unable to apply this coupon right now",
      );
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
