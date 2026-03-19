export interface WishlistItem {
  id: number;
  productId: number | string;
  name?: string; // Optional: helpful for UI
  price?: number; // Optional: helpful for UI
  image?: string; // Optional: helpful for UI
  quantity: number;
  createdAt?: string;
}

export interface WishlistResponse {
  items: {
    data: WishlistItem[];
  };
}

export interface WishlistPayload {
  productId: number;
  quantity: number;
}
