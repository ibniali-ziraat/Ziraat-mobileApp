import { useMutation } from "@tanstack/react-query";
import {
  createRazorpayOrderService,
  orderDeliveredService,
  releaseRazorpayPaymentService,
  saveOrderService,
  verifyRazorpayPaymentService,
} from "../services/razorpay.service";

export const useCreateRazorpayOrder = () => {
  return useMutation({
    mutationFn: (payload: {
      amount: number;
      vendorAccountId: string;
      checkoutId?: string;
      userId?: number | null;
    }) => createRazorpayOrderService(payload),
  });
};

export const useVerifyRazorpayPayment = () => {
  return useMutation({
    mutationFn: (payload: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      amount: number;
      checkoutId: string;
      userId: number | null;
    }) => verifyRazorpayPaymentService(payload),
  });
};

export const useSaveOrder = () => {
  return useMutation({
    mutationFn: saveOrderService,
  });
};

export const useReleaseRazorpayPayment = () => {
  return useMutation({
    mutationFn: (payload: { transferId: string; checkoutId: string }) =>
      releaseRazorpayPaymentService(payload),
  });
};

// Use this when order is delivered — auto-releases payment to vendor
export const useOrderDelivered = () => {
  return useMutation({
    mutationFn: (payload: { checkoutId: string }) =>
      orderDeliveredService(payload),
  });
};
