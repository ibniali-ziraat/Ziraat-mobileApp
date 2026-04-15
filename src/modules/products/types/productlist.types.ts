export interface RawProduct {
  id?: string;
  _id?: string;
  name?: string;
  title?: string;
  price?: number;
  oldPrice?: number;
  discountPrice?: number;
  thumbnailUrl?: string;
  photos?: string[];
  ratingAverage?: number;
  rating?: number;
}

export interface NormalizedProduct {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  image?: string;
  rating?: number;
  discount?: number;
}

export interface WishlistItem {
  productId: string | number;
}

export interface ProductsListProps {
  items: RawProduct[] | { products: RawProduct[] };
  wishlistItems?: WishlistItem[];
  onToggleWishlist?: (productId: string) => void;
  isWishlistBusy?: boolean;
  onSeeMore?: () => void;
  variant?: "grid" | "carousel";
  title?: string;
}
