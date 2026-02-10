import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteWishlist,
  useGetWishlist,
  useSaveWishlist,
} from "../queries/wishlist.queries";

/**
 * SINGLE SOURCE OF TRUTH — WISHLIST
 */
export const useWishlist = () => {
  const queryClient = useQueryClient();

  /* ================= GET ================= */
  const wishlistQuery = useGetWishlist();

  const items = Array.isArray(wishlistQuery.data?.items?.data)
    ? wishlistQuery.data.items.data
    : [];

  /* ================= ADD ================= */
  const addMutation = useSaveWishlist();

  const addToWishlist = async (payload: any) => {
    const previous = queryClient.getQueryData(["wishlist"]);

    queryClient.setQueryData(["wishlist"], (old: any) => ({
      ...old,
      items: {
        ...(old?.items ?? {}),
        data: [...(old?.items?.data ?? []), payload],
      },
    }));

    try {
      await addMutation.mutateAsync(payload);
    } catch (e) {
      queryClient.setQueryData(["wishlist"], previous);
      throw e;
    } finally {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    }
  };

  /* ================= REMOVE ================= */
  const deleteMutation = useDeleteWishlist();

  const removeFromWishlist = async (productId: number) => {
    const previous = queryClient.getQueryData(["wishlist"]);

    queryClient.setQueryData(["wishlist"], (old: any) => ({
      ...old,
      items: {
        ...(old?.items ?? {}),
        data: old?.items?.data?.filter(
          (item: any) => item.productId !== productId,
        ),
      },
    }));

    try {
      await deleteMutation.mutateAsync(productId); // ✅ FIX
    } catch (e) {
      queryClient.setQueryData(["wishlist"], previous);
      throw e;
    } finally {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    }
  };

  const isInWishlist = (productId: string) =>
    items.some((item: any) => String(item.productId) === String(productId));

  return {
    wishlist: items,
    isLoading: wishlistQuery.isLoading,
    isFetching: wishlistQuery.isFetching,
    isError: wishlistQuery.isError,

    isInWishlist,
    addToWishlist,
    removeFromWishlist,
  };
};
