import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteCartItems, getCartItems, saveCartItems, updateCartItems } from "../services/cart.service";
import { ID } from "../types/global";

export const useCartQuery = (id:ID) =>
  useQuery({
    queryKey: ["cart", id],
    queryFn: () => getCartItems(id),
    enabled: !!id,
  });

  export const useCartItem = () =>
  useMutation({ mutationFn: saveCartItems });

   export const useUpdateCratItem = () =>
  useMutation({ mutationFn: updateCartItems});

export const useDeleteCratItem = () =>
  useMutation({ mutationFn: deleteCartItems});


