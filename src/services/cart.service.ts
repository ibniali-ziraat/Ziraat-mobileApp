import axiosInstance from "../api/client/axiosInstance";
import { safeGet } from "./helpers/safeGet";

export interface CartItem {
  id: number;
  productId: number;
  vendorId?: number;
  vendorProductId?: number;
  variationName?: string;
  quantity: number;
}

export interface AddToCartPayload {
  productId: number;
  vendorId?: number;
  vendorProductId?: number;
  variationName?: string;
  quantity: number;
}

export interface UpdateCartPayload {
  cartItemId: number;
  quantity: number;
}

export interface DeleteCartPayload {
  cartItemId: number;
}

// GET list
export const getCartItems = async () => {
  return safeGet(axiosInstance.get("/cart/list/"));
};

// src/services/cart.service.ts
export const saveCartItems = async (payload: AddToCartPayload) => {
  // Clean the payload: Remove variationName if it's empty
  const cleanPayload = { ...payload };
  if (!cleanPayload.variationName) {
    delete cleanPayload.variationName;
  }

  return safeGet(axiosInstance.post("/cart/add-item", cleanPayload));
};
// UPDATE
export const updateCartItems = async (payload: UpdateCartPayload) => {
  return safeGet(axiosInstance.post("/cart/update-item-quantity", payload));
};

//DELETE
export const deleteCartItems = async ({ id }: DeleteCartPayload) => {
  return safeGet(axiosInstance.post(`/cart/remove-item`, id));
};
