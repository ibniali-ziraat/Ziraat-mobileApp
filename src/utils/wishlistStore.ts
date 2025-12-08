// Simple in-memory wishlist (NO CONTEXT, NO STORAGE)

let wishlist: any[] = [];

export const addToWishlist = (product: any) => {
  const exists = wishlist.find((item) => item._id === product._id);
  if (!exists) {
    wishlist.push(product);
  }
};

export const removeFromWishlist = (id: string) => {
  wishlist = wishlist.filter((item) => item._id !== id);
};

export const getWishlist = () => {
  return wishlist;
};

export const isInWishlist = (id: string) => {
  return wishlist.some((item) => item._id === id);
};
