import { CartItemType, CouponType } from "../types/cart.types";

interface UseCartTotalsParams {
  cart: CartItemType[];
  couponData: CouponType[];
  selectedCoupon: string;
}

// export function useCartTotals({
//   cart,
//   couponData,
//   selectedCoupon,
// }: UseCartTotalsParams) {
//   const subtotalRaw =
//     cart?.reduce<number>(
//       (sum, { total, quantity }) =>

//         sum + (Number(total) || 0) * (Number(quantity) || 0),
//       0,
//     ) || 0;

//   console.log(subtotalRaw, "subtotalraw");

//   const discount =
//     couponData.find((c) => c.code === selectedCoupon)?.discountAmount || 0;

//   console.log(discount, "discount");

//   const subtotal = Math.max(subtotalRaw - discount, 0);

//   console.log(subtotal, "subtotaldfdfd");

//   return { subtotalRaw, discount, subtotal };
// }

export function useCartTotals({
  cart,
  couponData,
  selectedCoupon,
}: UseCartTotalsParams) {
  const subtotalRaw =
    cart?.reduce<number>((sum, { productPrice, quantity }) => {
      console.log(productPrice, "productPrice");
      console.log(quantity, "quantity");

      return sum + (Number(productPrice) || 0) * (Number(quantity) || 0);
    }, 0) || 0;

  // console.log(subtotalRaw, "subtotalraw");

  const discount =
    couponData.find((c) => c.code === selectedCoupon)?.discountAmount || 0;

  // console.log(discount, "discount");

  const subtotal = Math.max(subtotalRaw - discount, 0);

  // console.log(subtotal, "subtotaldfdfd");

  return { subtotalRaw, discount, subtotal };
}
