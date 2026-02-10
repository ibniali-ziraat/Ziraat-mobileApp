import { useQueryClient } from "@tanstack/react-query";
import {
  useAddCartItem,
  useDeleteCartItem,
  useGetCart,
  useUpdateCartItem,
} from "../queries/cart.queries";

export const useCart = () => {
  const queryClient = useQueryClient();

  /* ================= GET ================= */
  const cartQuery = useGetCart();

  /* ================= NORMALIZE API ================= */
  const items = Array.isArray(cartQuery.data?.items)
    ? cartQuery.data.items
    : [];

  /* ================= ADD ================= */
  const addMutation = useAddCartItem();
  const addToCart = async (payload: any) => {
    await queryClient.cancelQueries({ queryKey: ["cart"] });
    const previous = queryClient.getQueryData(["cart"]);

    queryClient.setQueryData(["cart"], (old: any) => ({
      ...old,
      items: [...(old?.items ?? []), payload],
    }));

    try {
      await addMutation.mutateAsync(payload);
    } catch (e) {
      queryClient.setQueryData(["cart"], previous);
      throw e;
    } finally {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  };

  /* ================= REMOVE ================= */
  const deleteMutation = useDeleteCartItem();
  const removeFromCart = async ({ id }: { id: number }) => {
    await queryClient.cancelQueries({ queryKey: ["cart"] });
    const previous = queryClient.getQueryData(["cart"]);

    queryClient.setQueryData(["cart"], (old: any) => ({
      ...old,
      items: old?.items?.filter((item: any) => item.id !== id),
    }));

    try {
      await deleteMutation.mutateAsync({ id });
    } catch (e) {
      queryClient.setQueryData(["cart"], previous);
      throw e;
    } finally {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  };

  /* ================= UPDATE ================= */
  const updateMutation = useUpdateCartItem();
  const updateCartItem = async (payload: any) => {
    await updateMutation.mutateAsync(payload);
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  };

  /* ================= HELPERS ================= */
  const isInCart = (productId: number) =>
    items.some((item: any) => item.productId === productId);

  const getCartItemByProduct = (productId: number) =>
    items.find((item: any) => item.productId === productId);

  return {
    cart: items,

    isLoading: cartQuery.isLoading,
    isFetching: cartQuery.isFetching,
    isError: cartQuery.isError,

    isInCart,
    getCartItemByProduct,

    addToCart,
    removeFromCart,
    updateCartItem,
  };
};
