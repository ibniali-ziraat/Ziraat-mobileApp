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
  ];

  const onSuccess = (response: any) => {
    console.log(response, "response is....");

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
    codCheckout(checkoutId, { onSuccess, onError });
  };

  const handleUpiPayment = async (
    checkoutId: string,
    amount: number,
    contactName: string,
  ) => {
    const result = await pay({
      amount,
      description: "Order Payment",
      user: {
        name: contactName,
        email: "test@example.com",
        contact: "9999999999",
      },
    });

    // if (result.success) {
    //   console.log("payment success..");

    //   upiCheckout(
    //     {
    //       checkoutId,
    //       paymentId: result.data.razorpay_payment_id,
    //       orderId: result.data.razorpay_order_id ?? "",
    //       signature: result.data.razorpay_signature ?? "",
    //     },
    //     { onSuccess, onError },
    //   );
    // }
    if (result.success) {
      // TODO: replace with real upiCheckout API call when backend is ready
      onSuccess({
        error: null,
        success: true,
        value: {
          billingAddress: {
            addressLine1: "Khan mohalla",
            addressLine2: "",
            city: "Srinagar",
            contactName: "Quarat qadir",
            country: null,
            countryId: "IN",
            district: null,
            districtId: 3,
            id: 329,
            phone: "7051059559",
            stateOrProvince: null,
            stateOrProvinceId: 3,
            zipCode: "190009",
          },
          billingAddressId: 329,
          children: [],
          couponCode: null,
          couponRuleName: null,
          createdById: 12902,
          createdOn: "2026-03-31T07:00:23.4481237+00:00",
          customerId: 12902,
          discountAmount: 250,
          id: 165,
          isMasterOrder: false,
          latestUpdatedById: 12902,
          latestUpdatedOn: "2026-03-31T07:00:23.4481239+00:00",
          orderItems: [],
          orderNote: null,
          orderStatus: 1,
          orderTotal: 1050,
          parentId: null,
          paymentFeeAmount: 0,
          paymentMethod: "UPI",
          shippingAddress: {
            addressLine1: "Khan mohalla",
            addressLine2: "",
            city: "Srinagar",
            contactName: "Quarat qadir",
            country: null,
            countryId: "IN",
            district: null,
            districtId: 3,
            id: 330,
            phone: "7051059559",
            stateOrProvince: null,
            stateOrProvinceId: 3,
            zipCode: "190009",
          },
          shippingAddressId: 330,
          shippingFeeAmount: 0,
          shippingMethod: "Free",
          subTotal: 1181.8181818181818,
          subTotalWithDiscount: 1181.8181818181818,
          taxAmount: 118.18181818181819,
          vendorId: null,
        },
      });
    } else {
      console.log("payment ffailed");

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
    contactName: string,
  ) => {
    const checkoutId = await AsyncStorage.getItem("checkoutId");
    if (!checkoutId) return;
    setErrorMsg("");

    if (selectedPayment === "CoD") {
      handleCodPayment(checkoutId);
    } else if (selectedPayment === "UPI") {
      handleUpiPayment(checkoutId, amount, contactName);
    }
  };

  return {
    errorMsg,
    isPending,
    paymentOptions,
    handlePlaceOrder,
  };
};
