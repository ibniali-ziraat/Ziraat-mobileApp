import { useMutation, useQuery } from "@tanstack/react-query";
import {
  applyCoupon,
  checkout,
  codCheckoutService,
  createCheckoutShipping,
  createShippingAddress,
  getCheckoutShipping,
  getPaymentProviders,
  updateTaxAndShippingPrices,
} from "../services/checkout.services";

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

export const useCreateShippingAddress = () => {
  return useMutation({
    mutationFn: createShippingAddress,
  });
};

export const useCheckoutShipping = (checkoutId?: string) => {
  return useQuery({
    queryKey: ["checkout-shipping", checkoutId],
    queryFn: () => getCheckoutShipping(checkoutId!),
    enabled: !!checkoutId, // prevents running if id not available
  });
};

export const useGetCheckoutShipping = (checkoutId?: string) => {
  return useQuery({
    queryKey: ["checkout-shipping", checkoutId],
    queryFn: () => getCheckoutShipping(checkoutId!),
    enabled: !!checkoutId, // prevents running if id not available
  });
};

export const useCreateCheckoutShipping = () => {
  return useMutation({
    mutationFn: ({
      checkoutId,
      payload,
    }: {
      checkoutId: string;
      payload: any;
    }) => createCheckoutShipping(checkoutId, payload),
  });
};

export const useUpdateTaxAndShippingPrices = () => {
  return useMutation({
    mutationFn: ({
      checkoutId,
      payload,
    }: {
      checkoutId: string;
      payload: any;
    }) => updateTaxAndShippingPrices(checkoutId, payload),
  });
};

//payment method-----------------

export const usePaymentProviders = () => {
  return useQuery({
    queryKey: ["payment-providers"],
    queryFn: getPaymentProviders,
  });
};

//place order

export const useCodCheckout = () => {
  return useMutation({
    mutationFn: (checkoutId: number) => codCheckoutService(checkoutId),
  });
};
