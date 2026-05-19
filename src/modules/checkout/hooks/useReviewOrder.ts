import { ROUTES } from "@/src/constants/routes";
import { usePayment } from "@/src/hooks/usePayment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  useCodCheckout,
  usePaymentProviders,
  useUpiCheckout,
} from "./useCheckout";

const UPI_OPTION = { label: "UPI", value: "UPI" };
const COD_OPTION = { label: "Cash on Delivery", value: "COD" };

export const useReviewOrder = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const { data: paymentProviders } = usePaymentProviders();
  const { mutate: codCheckout, isPending: isCodPending } = useCodCheckout();
  const { mutate: upiCheckout, isPending: isUpiPending } = useUpiCheckout();
  const { pay } = usePayment();

  const isPending = isCodPending || isUpiPending;

  const paymentOptions = [
    ...(Array.isArray(paymentProviders)
      ? paymentProviders
          .filter((p: any) => p?.isEnabled)
          .map((p: any) => ({ label: p.name, value: p.id }))
      : []),
    UPI_OPTION,
    COD_OPTION,
  ];

  const onSuccess = (response: any) => {
    router.push({
      pathname: ROUTES.SHOPPING.CHECKOUT.ORDER_SUCCESS,
      params: { order: JSON.stringify(response) },
    });
  };

  const onError = (error: any) => {
    const data = error?.response?.data;
    const message =
      typeof data === "string"
        ? data
        : (data?.message ??
          data?.error ??
          data?.errors?.[0] ??
          error?.message ??
          "Something went wrong");
    setErrorMsg(message);
  };

  const handleCodPayment = (checkoutId: string) => {
    console.log(checkoutId, "checkout id...");

    codCheckout(checkoutId, { onSuccess, onError });
  };

  const handleUpiPayment = async (
    checkoutId: string,
    amount: number,
    shippingAddress: any,
  ) => {
    const result = await pay({
      amount,
      description: "Order Payment",
      user: {
        name: shippingAddress.contactName,
        email: "test@example.com",
        contact: shippingAddress.phone,
      },
    });

    if (result.success) {
      const addressPayload = {
        addressLine1: shippingAddress.addressLine1,
        addressLine2: shippingAddress.addressLine2 ?? "",
        city: shippingAddress.cityName,
        contactName: shippingAddress.contactName,
        country: shippingAddress.countryName ?? null,
        countryId: shippingAddress.countryId ?? "IN",
        district: shippingAddress.districtName ?? null,
        districtId: shippingAddress.districtId ?? null,
        id: shippingAddress.userAddressId,
        phone: shippingAddress.phone,
        stateOrProvince: shippingAddress.stateOrProvinceName,
        stateOrProvinceId: shippingAddress.stateOrProvinceId,
        zipCode: shippingAddress.zipCode,
      };

      onSuccess({
        error: null,
        success: true,
        value: {
          billingAddress: addressPayload,
          billingAddressId: shippingAddress.userAddressId,
          children: [],
          couponCode: null,
          couponRuleName: null,
          discountAmount: 0,
          isMasterOrder: false,
          orderItems: [],
          orderNote: null,
          orderStatus: 1,
          orderTotal: amount,
          parentId: null,
          paymentFeeAmount: 0,
          paymentMethod: "UPI",
          shippingAddress: addressPayload,
          shippingAddressId: shippingAddress.userAddressId, // 11
          shippingFeeAmount: 0,
          shippingMethod: "Free",
        },
      });
    } else {
      if (result.error.code !== "0") {
        setErrorMsg(
          result.error.description ?? "Payment failed. Please try again.",
        );
      }
    }
  };

  const handlePlaceOrder = async (
    selectedPayment: string,
    amount: number,
    shippingAddress: any,
  ) => {
    const checkoutId = await AsyncStorage.getItem("checkoutId");
    if (!checkoutId) return;
    setErrorMsg("");

    if (selectedPayment === "COD") {
      handleCodPayment(checkoutId);
    } else if (selectedPayment === "UPI") {
      handleUpiPayment(checkoutId, amount, shippingAddress);
    }
  };

  return {
    errorMsg,
    isPending,
    paymentOptions,
    handlePlaceOrder,
  };
};
