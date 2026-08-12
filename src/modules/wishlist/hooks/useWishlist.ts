import { WishlistItem, WishlistPayload } from "../types/wishlist.types";
import {
  useDeleteWishlist,
  useGetWishlist,
  useSaveWishlist,
} from "./wishlist.queries";

export const useWishlist = () => {
  const { data, isLoading, isFetching, isError, refetch } = useGetWishlist();
  const addMutation = useSaveWishlist();
  const deleteMutation = useDeleteWishlist();

  const items: WishlistItem[] = data?.items?.data ?? [];

  const addToWishlist = async (payload: WishlistPayload) => {
    if (addMutation.isPending) return;
    return addMutation.mutateAsync(payload);
  };

  const removeFromWishlist = async (id: number) => {
    console.log("REMOVE FROM WISHLIST ID 👉", id);
    if (deleteMutation.isPending) return;
    return deleteMutation.mutateAsync(id);
  };

  const isInWishlist = (
    productId: string | number,
    vendorId?: string | number,
  ) =>
    items.some(
      (item) =>
        String(item.productId) === String(productId) &&
        (vendorId === undefined || String(item.vendorId) === String(vendorId)),
    );

  const getWishlistItemId = (
    productId: string | number,
    vendorId?: string | number,
  ) =>
    items.find(
      (item) =>
        String(item.productId) === String(productId) &&
        (vendorId === undefined || String(item.vendorId) === String(vendorId)),
    )?.id;

  return {
    wishlist: items,
    isLoading: isLoading,
    isFetchingWishlist: isFetching,
    isAdding: addMutation.isPending,
    isRemoving: deleteMutation.isPending,
    isWishlistBusy:
      isLoading || addMutation.isPending || deleteMutation.isPending,
    isError,
    isInWishlist,
    getWishlistItemId,
    addToWishlist,
    removeFromWishlist,
    refetch,
  };
};
