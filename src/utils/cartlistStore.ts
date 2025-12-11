// utils/cartlistStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "CART_LIST";

// Get all cart items
export const getCartList = async () => {
  const jsonValue = await AsyncStorage.getItem(CART_KEY);
  return jsonValue ? JSON.parse(jsonValue) : [];
};

// Add item to cart
export const addToCartList = async (product: any) => {
  const currentCart = await getCartList();

  const existing = currentCart.find((item: any) => item.id === product.id);
  if (existing) {
    existing.quantity += product.quantity || 1;
    existing.total = existing.quantity * product.price;
  } else {
    currentCart.push({
      ...product,
      quantity: product.quantity || 1,
      total: (product.quantity || 1) * product.price,
    });
  }

  await AsyncStorage.setItem(CART_KEY, JSON.stringify(currentCart));
};

// Remove single item
export const removeFromCartList = async (id: string) => {
  const currentCart = await getCartList();
  const updatedCart = currentCart.filter((item: any) => item.id !== id);
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
};

// Clear entire cart
export const clearCartList = async () => {
  await AsyncStorage.removeItem(CART_KEY);
};
