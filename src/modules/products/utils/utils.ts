import { getCreditPrice, roundPrice } from "@/src/utils/creditPrice";
import { NormalizedProduct, RawProduct } from "../types/productlist.types";

export function normalizeProducts(
  items: RawProduct[] | { products: RawProduct[] },
): NormalizedProduct[] {
  const raw: RawProduct[] = Array.isArray(items)
    ? items
    : (items?.products ?? []);

  return raw
    .filter(Boolean)
    .map((item) => {
      // Buy on Credit is the default payment method, so show its price
      const price = roundPrice(getCreditPrice(item) ?? item.price ?? 0);
      const mrp = item.oldPrice ?? item.discountPrice;

      return {
        id: (item.id ?? item._id) as string,
        title: (item.name ?? item.title ?? "") as string,
        productName: (item.productName ?? item.title ?? "") as string,
        price,
        // only strike through an MRP that is actually higher than the price
        oldPrice: mrp && mrp > price ? mrp : undefined,
        image: item.thumbnailUrl ?? item.photos?.[0],
        rating: item.ratingAverage ?? item.rating,
        vendorId: item.vendorId ?? item.vendor?.id ?? null,
        vendorName: item.vendor?.name ?? item.vendorName ?? "Unknown Vendor",
        vendorProductId: item.vendorProductId ?? null,
      };
    })
    .filter((item) => !!item.id);
}

export function calcDiscount(price: number, oldPrice?: number): number | null {
  if (!oldPrice || !price) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
