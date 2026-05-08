import { ROUTES } from "@/src/constants/routes";
import { toast } from "@backpackapp-io/react-native-toast";
import { router } from "expo-router";
import { useWishlist } from "../../wishlist/hooks/useWishlist";
import { WishlistItem } from "../../wishlist/types/wishlist.types";

interface SharedWishlistProps {
  wishlistItems: WishlistItem[];
  onToggleWishlist: (id: string | number) => void;
  isWishlistBusy: boolean;
  onSeeMore: () => void;
  variant: "carousel";
}

interface UseHomeWishlistReturn {
  sharedWishlistProps: SharedWishlistProps;
}

export function useHomeWishlist(): UseHomeWishlistReturn {
  const { wishlist, isWishlistBusy, addToWishlist, removeFromWishlist } =
    useWishlist();

  const handleToggleWishlist = (id: string): void => {
    const exists = wishlist.some((w) => String(w.productId) === String(id));
    if (exists) {
      removeFromWishlist({ id: Number(id) });
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({ productId: id });
      toast.success("Added to wishlist");
    }
  };

  const sharedWishlistProps: SharedWishlistProps = {
    wishlistItems: wishlist,
    onToggleWishlist: handleToggleWishlist,
    isWishlistBusy: isWishlistBusy,
    onSeeMore: () => router.push(ROUTES.TABS.PRODUCTS),
    variant: "carousel",
  };

  return { sharedWishlistProps };
}
