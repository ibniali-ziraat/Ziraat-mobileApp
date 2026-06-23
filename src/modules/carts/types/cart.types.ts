export type CartItemType = {
  id: string;
  quantity: number;
  total: number;
  productPrice: number;
};

export type CouponType = {
  code: string;
  ruleName: string;
  discountAmount: number;
};

export interface CartCalculations {
  subtotalRaw: number;
  discount: number;
  subtotal: number;
}
