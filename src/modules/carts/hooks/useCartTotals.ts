import { CartItemType, CouponType } from "../types/cart.types";

interface UseCartTotalsParams {
  cart: CartItemType[];
  couponData: CouponType[];
  selectedCoupon: string;
}

export function useCartTotals({
  cart,
  couponData,
  selectedCoupon,
}: UseCartTotalsParams) {
  const subtotalRaw =
    cart?.reduce<number>(
      (sum, { total, quantity }) =>
        sum + (Number(total) || 0) * (Number(quantity) || 0),
      0,
    ) || 0;

  const discount =
    couponData.find((c) => c.code === selectedCoupon)?.discountAmount || 0;

  const subtotal = Math.max(subtotalRaw - discount, 0);

  return { subtotalRaw, discount, subtotal };
}
