export type CartItemType = {
  id: string;
  quantity: number;
  total: number;
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
