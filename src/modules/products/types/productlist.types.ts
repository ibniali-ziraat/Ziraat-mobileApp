// export interface RawProduct {
//   id?: string;
//   _id?: string;
//   name?: string;
//   title?: string;
//   price?: number;
//   oldPrice?: number;
//   discountPrice?: number;
//   thumbnailUrl?: string;
//   photos?: string[];
//   ratingAverage?: number;
//   rating?: number;
// }

// export interface NormalizedProduct {
//   id: string;
//   title: string;
//   price: number;
//   oldPrice?: number;
//   image?: string;
//   rating?: number;
//   discount?: number;
// }

// export interface WishlistItem {
//   productId: string | number;
// }

// export interface ProductsListProps {
//   items: RawProduct[] | { products: RawProduct[] };
//   wishlistItems?: WishlistItem[];
//   onToggleWishlist?: (productId: string) => void;
//   isWishlistBusy?: boolean;
//   onSeeMore?: () => void;
//   variant?: "grid" | "carousel";
//   title?: string;
// }
export interface NormalizedProduct {
  id: string | number;
  name?: string;
  price?: number;
  image?: string;
  rating?: number;
  [key: string]: any;
}

export interface WishlistItem {
  id: string | number;
  productId: string | number;
  quantity?: number;
  [key: string]: any;
}

export interface ProductFilters {
  minRating?: number;
  minPrice?: number;
  maxPrice?: number;
  [key: string]: any;
}

export interface Category {
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
}

export interface UseProductSearchParams {
  query?: string;
  category?: string;
  page: number;
  [key: string]: any;
}

export interface ProductSearchResult {
  products: NormalizedProduct[];
  totalProduct: number;
}
