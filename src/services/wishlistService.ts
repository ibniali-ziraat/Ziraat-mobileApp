import axiosInstance from "../api/client/axiosInstance";
import { safeGet } from "./helpers/safeGet";

export const getWishlist = async () =>
  safeGet(
    axiosInstance.get("/api/wishList/PrivateList/")
  );

  export const deleteWishlist = async (id) =>
  (await axiosInstance.delete(`/api/wishList/RemoveItem${id}`)).data;

  export const saveWishlist = async (data) =>
  (await axiosInstance.post("/api/wishList/AddItem", data)).data;

export const updateWishlist = async (data) =>
  (await axiosInstance.put(`/api/wishList/UpdateItem${data.id}`, data))
    .data;

    export const editWishlist = async (id,data) =>
  (await axiosInstance.put(`/api/wishList/PrivateList/${id} ,${data}`))
    .data;