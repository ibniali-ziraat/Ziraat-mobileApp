import axiosInstance from "@/src/api/client/axiosInstance";
import { safeGet } from "@/src/services/helpers/safeGet";
import { WishlistPayload } from "../types/wishlist.types";

export const getWishlist = async () =>
  safeGet(axiosInstance.get("/api/wishList/PrivateList/"));

export const deleteWishlist = async ({ id }: number) => {
  return safeGet(
    await axiosInstance.delete(`/api/wishList/RemoveItem?id=${id}`),
  ).data;
};

export const saveWishlist = async (data: WishlistPayload) =>
  (await axiosInstance.post("/api/wishList/AddItem", data)).data;

export const updateWishlist = async (data: WishlistPayload) =>
  (await axiosInstance.put(`/api/wishList/UpdateItem${data.id}`, data)).data;

export const editWishlist = async (id: number, data: WishlistPayload) =>
  (await axiosInstance.put(`/api/wishList/PrivateList/${id} ,${data}`)).data;
