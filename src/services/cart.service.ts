import axiosInstance from "../api/client/axiosInstance";
import { safeGet } from "./helpers/safeGet";

export interface CartItem {
  id: number;
  productId: number;
  variationName?: string;
  quantity: number;
}

export interface AddToCartPayload {
  productId: number;
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
  return safeGet(
    axiosInstance.get("/cart/list/")
  );
};

// ADD 
export const saveCartItems = async (payload: AddToCartPayload) => {
  return safeGet(
    axiosInstance.post("/cart/add-item", payload)
  );
};

// UPDATE 
export const updateCartItems = async (payload: UpdateCartPayload) => {
  return safeGet(
    axiosInstance.put("/cart/update-item-quantity", payload)
  );
};

//DELETE
export const deleteCartItems = async (payload: DeleteCartPayload) => {
  return safeGet(
    axiosInstance.post(`/cart/remove-item${payload.cartItemId}`, {
      data: payload,
    })
  );
};
