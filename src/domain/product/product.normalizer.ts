import { NormalizedProduct } from "./product.types";

export const normalizeProduct = (p: any): NormalizedProduct => ({
  _id: String(p.id ?? p._id),
  title: p.name ?? p.title,
  price: p.price,
  discountPrice: p.oldPrice ?? p.discountPrice ?? null,
  rating: p.ratingAverage ?? p.rating ?? 0,
  photos: p.thumbnailUrl ? [p.thumbnailUrl] : (p.photos ?? []),
  inStock: (p.stockQuantity ?? 0) > 0,
  label: p.oldPrice ? "SALE" : (p.label ?? null),

  category: p.category ?? null,
  description: p.description ?? null,
  dosage: p.dosage ?? null,
  packaging: p.packaging ?? null,
  tag: p.tag ?? null,
});

export const normalizeSingleProduct = (p: any) => ({
  _id: String(p.id),
  title: p.name,
  shortDescription: p.shortDescription ?? null,

  price: p.calculatedProductPrice?.price ?? 0,
  discountPrice: p.calculatedProductPrice?.oldPrice ?? null,
  savingPercent: p.calculatedProductPrice?.percentOfSaving ?? null,

  rating: p.ratingAverage ?? 0,
  reviewsCount: p.reviewsCount ?? 0,

  inStock: (p.stockQuantity ?? 0) > 0,
  stockQuantity: p.stockQuantity ?? 0,

  allowToOrder: p.isAllowToOrder ?? false,

  photos: p.images?.length > 0 ? p.images.map((img: any) => img.url) : [],

  description: p.description ?? null,
  specification: p.specification ?? null,

  attributes: p.attributes ?? [],
  categories: p.categories ?? [],
  brand: p.brand ?? null,

  relatedProducts: p.relatedProducts ?? [],
  crossSellProducts: p.crossSellProducts ?? [],
});
