import { ROUTES } from "@/src/constants/routes";
import { toast } from "@backpackapp-io/react-native-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useCheckout } from "../../checkout/hooks/useCheckout";

interface UseCartCheckoutParams {
  selectedCoupon: string;
  resetCoupon: () => void;
}

export function useCartCheckout({
  selectedCoupon,
  resetCoupon,
}: UseCartCheckoutParams) {
  const router = useRouter();
  const { mutateAsync: handleCheckout, isPending } = useCheckout();

  // selectedCartItemIds: ids of the cart items the user checked for checkout.
  // NOTE: confirm useCheckout's mutation fn / backend endpoint actually
  // accepts a `cartItemIds` field — adjust the key name below to match.
  const handlePlaceOrder = async (selectedCartItemIds: string[]) => {
    if (!selectedCartItemIds?.length) {
      toast.error("Select at least one item to checkout");
      return;
    }

    try {
      const data = await handleCheckout({
        couponCode: selectedCoupon || "",
        cartItemIds: selectedCartItemIds,
      });
      const checkoutId = data?.checkoutId;

      if (checkoutId) {
        await AsyncStorage.setItem("checkoutId", checkoutId);
      }

      await AsyncStorage.setItem("appliedCoupon", selectedCoupon || "");
      router.push(ROUTES.SHOPPING.CHECKOUT.SELECT_ADDRESS);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Checkout failed due to coupon",
      );
      resetCoupon();
    }
  };

  return { handlePlaceOrder, isPending };
}
