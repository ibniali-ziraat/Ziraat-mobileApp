import { toast } from "@backpackapp-io/react-native-toast";
import { useWishlist } from "../../wishlist/hooks/useWishlist";

export function useWishlistToggle() {
  const {
    wishlist,
    isBusy,
    addToWishlist,
    removeFromWishlist,
    getWishlistItemId,
  } = useWishlist();

  const handleToggleWishlist = async (
    productId: string | number,
    vendorId?: string | number,
    vendorProductId?: string | number,
  ) => {
    const id = getWishlistItemId(productId, vendorId);
    try {
      if (id) {
        await removeFromWishlist({ id });
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist({ productId, vendorId, vendorProductId, quantity: 1 });
        toast.success("Added to wishlist");
      }
    } catch {}
  };

  return { wishlist, isBusy, handleToggleWishlist };
}
