/**
 * Buy on Credit is the default payment method, so its price is the one shown
 * by default across the app (product list, details, wishlist, cart).
 *
 * The api sends it under different names depending on the endpoint:
 *  - product list / product detail / variations: salePriceForCreditor
 *  - cart / wishlist / checkout items: vendorAssignment.creditSalePrice
 * The plain price (CoD / RazorPay) is netSalePriceForZiraat / netSalePrice.
 */

type PriceSource = Record<string, any> | null | undefined;

const toNumber = (value: unknown): number | undefined => {
  const n = Number(value);
  return value !== null && value !== undefined && Number.isFinite(n) && n > 0
    ? n
    : undefined;
};

export const roundPrice = (value: number) => Math.round(value * 100) / 100;

export const getCreditPrice = (source: PriceSource): number | undefined =>
  toNumber(source?.salePriceForCreditor) ??
  toNumber(source?.creditSalePrice) ??
  toNumber(source?.vendorAssignment?.creditSalePrice) ??
  toNumber(source?.vendorAssignment?.salePriceForCreditor);

/** What the farmer pays with CoD / RazorPay: the credit price minus the credit fee. */
export const getNonCreditPrice = (source: PriceSource): number | undefined =>
  toNumber(source?.netSalePriceForZiraat) ??
  toNumber(source?.netSalePrice) ??
  toNumber(source?.vendorAssignment?.netSalePrice) ??
  toNumber(source?.vendorAssignment?.netSalePriceForZiraat);

/** "220.32", "216" — no trailing zeros, at most 2 decimals */
export const formatPrice = (value: number) =>
  roundPrice(value).toLocaleString("en-IN", { maximumFractionDigits: 2 });
