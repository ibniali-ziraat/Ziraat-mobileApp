import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteWishlist,
  useGetWishlist,
  useSaveWishlist,
} from "../queries/wishlist.queries";

export const useWishlist = () => {
  const queryClient = useQueryClient();

  /* ================= GET ================= */
  const wishlistQuery = useGetWishlist();

  const items = Array.isArray(wishlistQuery.data?.items?.data)
    ? wishlistQuery.data.items.data
    : [];

  /* ================= ADD ================= */
  const addMutation = useSaveWishlist();

  const addToWishlist = async (payload: {
    productId: number;
    quantity: number;
  }) => {
    if (addMutation.isPending) return;

    try {
      await addMutation.mutateAsync(payload);
    } finally {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    }
  };

  /* ================= REMOVE ================= */
  const deleteMutation = useDeleteWishlist();

  const removeFromWishlist = async (wishlistItemId?: number) => {
    if (!wishlistItemId || deleteMutation.isPending) return;

    try {
      await deleteMutation.mutateAsync(wishlistItemId);
    } finally {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    }
  };

  /* ================= HELPERS ================= */

  const isInWishlist = (productId: string | number) =>
    items.some((item: any) => String(item.productId) === String(productId));

  const getWishlistItemId = (productId: string | number) => {
    const match = items.find(
      (item: any) => String(item.productId) === String(productId),
    );
    return match?.id;
  };

  /* ================= LOADING STATES ================= */

  const isLoadingWishlist = wishlistQuery.isLoading || wishlistQuery.isFetching;
  const isAdding = addMutation.isPending;
  const isRemoving = deleteMutation.isPending;

  // Global loading (ANY wishlist action)
  const isWishlistBusy = isLoadingWishlist || isAdding || isRemoving;

  return {
    wishlist: items,

    /* Query states */
    isLoadingWishlist,
    isFetchingWishlist: wishlistQuery.isFetching,
    isError: wishlistQuery.isError,

    /* Mutation states */
    isAdding,
    isRemoving,
    isWishlistBusy,

    /* Helpers */
    isInWishlist,
    getWishlistItemId,

    /* Actions */
    addToWishlist,
    removeFromWishlist,
  };
};
