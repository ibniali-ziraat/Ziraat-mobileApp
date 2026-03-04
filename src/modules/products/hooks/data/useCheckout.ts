import { useMutation, useQuery } from "@tanstack/react-query";
import {
  applyCoupon,
  checkout,
  createAddress,
  CreateAddressPayload,
  createCheckout,
  getCheckoutShipping,
} from "../../services/checkoutProduct/checkout.services";
import { CreateCheckoutPayload } from "../../services/checkoutTypes";

export const useCouponCode = () => {
  return useMutation({
    mutationFn: (payload: { couponCode: string }) => applyCoupon(payload),
  });
};

export const useCheckout = () => {
  return useMutation({
    mutationFn: (payload: { couponCode: string }) => checkout(payload),
  });
};

// -----------------Create Address-----------

export const useCreateAddress = () => {
  return useMutation({
    mutationFn: (payload: CreateAddressPayload) => createAddress(payload),
  });
};

export const useCreateCheckout = () => {
  return useMutation({
    mutationFn: (payload: CreateCheckoutPayload) => createCheckout(payload),
  });
};

export const useCheckoutShipping = (checkoutId: string) => {
  return useQuery({
    queryKey: ["checkout-shipping", checkoutId],
    queryFn: () => getCheckoutShipping(checkoutId),
    enabled: !!checkoutId, // only run when checkoutId exists
  });
};
