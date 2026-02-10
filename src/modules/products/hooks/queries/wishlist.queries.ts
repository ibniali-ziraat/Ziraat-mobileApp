import {
  deleteWishlist,
  editWishlist,
  getWishlist,
  saveWishlist,
  updateWishlist,
} from "@/src/services/wishlistService";
import { useMutation, useQuery } from "@tanstack/react-query";

/* ================= GET ================= */
export const useGetWishlist = () =>
  useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

/* ================= ADD ================= */
export const useSaveWishlist = () =>
  useMutation({
    mutationFn: saveWishlist,
  });

/* ================= REMOVE ================= */
export const useDeleteWishlist = (id) =>
  useMutation({
    mutationFn: deleteWishlist,
  });

/* ================= UPDATE ================= */
export const useUpdateWishlist = () =>
  useMutation({
    mutationFn: updateWishlist,
  });

/* ================= EDIT ================= */
export const useEditWishlist = () =>
  useMutation({
    mutationFn: editWishlist,
  });
