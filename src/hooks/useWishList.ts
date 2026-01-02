import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteWishlist, editWishlist, getWishlist, saveWishlist, updateWishlist } from "../services/wishlistService";

export const useGetWishlist = () =>
  useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(),
    
  });

  export const useDeleteWishlist = () =>
  useMutation({ mutationFn: deleteWishlist });

  export const useUpdateWishlist = () =>
    useMutation({ mutationFn: updateWishlist });

  export const useSaveWishlist = () =>
    useMutation({ mutationFn: saveWishlist });

  export const useEditWishlist = () =>
    useMutation({ mutationFn: editWishlist});
  
  

  

