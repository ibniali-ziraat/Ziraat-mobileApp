import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteWishlist,
  editWishlist,
  getWishlist,
  saveWishlist,
  updateWishlist,
} from "../services/wishlist.service";

/* ================= GET ================= */
export const useGetWishlist = () =>
  useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

/* ================= ADD ================= */
export const useSaveWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};

/* ================= REMOVE ================= */
export const useDeleteWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};

/* ================= UPDATE ================= */
export const useUpdateWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};

/* ================= EDIT ================= */
export const useEditWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};
