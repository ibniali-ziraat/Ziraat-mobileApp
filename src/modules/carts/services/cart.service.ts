import {
  deleteCartItems,
  getCartItems,
  saveCartItems,
  updateCartItems,
} from "@/src/services/cart.service";
import { useMutation, useQuery } from "@tanstack/react-query";

/* ================= GET ================= */
export const useGetCart = () =>
  useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });

/* ================= ADD ================= */
export const useAddCartItem = () =>
  useMutation({
    mutationFn: saveCartItems,
  });

/* ================= UPDATE ================= */
export const useUpdateCartItem = () =>
  useMutation({
    mutationFn: updateCartItems,
  });

/* ================= DELETE ================= */
export const useDeleteCartItem = () =>
  useMutation({
    mutationFn: deleteCartItems,
  });
