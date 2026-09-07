export type CartItemType = {
  id: string;
  quantity: number;
  total: number;
  productPrice: number;
  // Added for select-wise checkout / vendor-conflict detection
  productId?: number;
  vendorId?: number;
  vendorProductId?: number; // same underlying product listed by different vendors shares this
  variationName?: string;
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
