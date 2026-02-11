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
    if (addMutation.isPending) return;

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
    if (deleteMutation.isPending) return;

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
    if (updateMutation.isPending) return;

    await updateMutation.mutateAsync(payload);
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  };

  /* ================= HELPERS ================= */
  const isInCart = (productId: number) =>
    items.some((item: any) => item.productId === productId);

  const getCartItemByProduct = (productId: number) =>
    items.find((item: any) => item.productId === productId);

  /* ================= LOADING STATES ================= */
  const isLoadingCart = cartQuery.isLoading || cartQuery.isFetching;
  const isAdding = addMutation.isPending;
  const isRemoving = deleteMutation.isPending;
  const isUpdating = updateMutation.isPending;

  // Global cart busy flag
  const isCartBusy = isLoadingCart || isAdding || isRemoving || isUpdating;

  return {
    cart: items,

    /* Query states */
    isLoadingCart,
    isFetchingCart: cartQuery.isFetching,
    isError: cartQuery.isError,

    /* Mutation states */
    isAdding,
    isRemoving,
    isUpdating,
    isCartBusy,

    /* Helpers */
    isInCart,
    getCartItemByProduct,

    /* Actions */
    addToCart,
    removeFromCart,
    updateCartItem,
  };
};
