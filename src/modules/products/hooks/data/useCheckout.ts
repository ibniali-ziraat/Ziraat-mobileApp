import { useMutation } from "@tanstack/react-query";
import {
    applyCoupon,
    checkout,
    createAddress,
    CreateAddressPayload,
} from "../../services/checkoutProduct/checkout.services";

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
