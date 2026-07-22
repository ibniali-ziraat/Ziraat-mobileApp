import { DUMMY_EMAIL } from "@/src/constants/constants";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { usePayment } from "@/src/hooks/usePayment";
import {
  useCreateRazorpayOrder,
  useSaveOrder,
  useVerifyRazorpayPayment,
} from "@/src/hooks/useRazorpayPayment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  useBocCheckout,
  useCodCheckout,
  usePaymentProviders,
  useUpiCheckout,
  useValidateBuyOnCredit,
} from "./useCheckout";

// const UPI_OPTION = { label: "UPI", value: "UPI" };

export type UserPaymentDetails = {
  name: string;
  email: string;
  phone: string;
};

export type BocValidationResult = {
  isValid: boolean;
  message: string;
  paymentFee: number;
} | null;

export const useReviewOrder = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [userDetails, setUserDetails] = useState<UserPaymentDetails>({
    name: "",
    email: "",
    phone: "",
  });
  const [bocValidation, setBocValidation] = useState<BocValidationResult>(null);
  const [isValidatingBoc, setIsValidatingBoc] = useState(false);

  const { profileData } = useAuth();

  useEffect(() => {
    if (profileData) {
      setUserDetails({
        name: profileData.fullName ?? "",
        email: profileData.email?.endsWith(DUMMY_EMAIL)
          ? ""
          : (profileData.email ?? ""),
        phone: profileData.phone ?? "",
      });
    }
  }, [profileData]);

  const { data: paymentProviders } = usePaymentProviders();
  const { mutate: codCheckout, isPending: isCodPending } = useCodCheckout();
  const { mutate: upiCheckout, isPending: isUpiPending } = useUpiCheckout();
  const { mutate: bocCheckout, isPending: isBocPending } = useBocCheckout();
  const { mutateAsync: createRazorpayOrder } = useCreateRazorpayOrder();
  const { mutateAsync: verifyPayment } = useVerifyRazorpayPayment();
  const { mutateAsync: saveOrder } = useSaveOrder();
  const { mutateAsync: validateBoc } = useValidateBuyOnCredit();
  const { pay } = usePayment();

  const isPending = isCodPending || isUpiPending || isBocPending;

  const paymentOptions = [
    ...(Array.isArray(paymentProviders)
      ? paymentProviders
          .filter((p: any) => p?.isEnabled)
          .map((p: any) => ({ label: p.name, value: p.id }))
      : []),
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

  const buildAddressPayload = (shippingAddress: any) => ({
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
  });

  const persistOrder = async (
    checkoutId: string,
    amount: number,
    shippingAddress: any,
    paymentMethod: "UPI" | "CoD" | "BOC",
    extraFields?: any,
  ) => {
    const addressPayload = buildAddressPayload(shippingAddress);
    try {
      await saveOrder({
        checkoutId,
        userId: profileData?.id ?? null,
        orderItems: extraFields?.orderItems ?? [],
        shippingAddress: addressPayload,
        billingAddress: addressPayload,
        shippingAddressId: shippingAddress.userAddressId,
        billingAddressId: shippingAddress.userAddressId,
        orderTotal: amount,
        discountAmount: extraFields?.discountAmount ?? 0,
        shippingFeeAmount: extraFields?.shippingFeeAmount ?? 0,
        paymentFeeAmount: extraFields?.paymentFeeAmount ?? 0,
        couponCode: extraFields?.couponCode ?? null,
        couponRuleName: extraFields?.couponRuleName ?? null,
        paymentMethod,
        orderStatus: 1,
        shippingMethod: "Free",
        isMasterOrder: false,
        parentId: null,
        orderNote: null,
      });
    } catch (err) {
      console.error("Something went wrong please try after sometime", err);
    }
  };

  // ── Payment Method Change Handler ─────────────────────────────────────────

  const handlePaymentMethodChange = async (
    value: string,
    vendorId?: number,
  ) => {
    setBocValidation(null);
    setErrorMsg("");

    if (value !== "BuyOnCredit") return;

    const checkoutId = await AsyncStorage.getItem("checkoutId");
    if (!checkoutId || !vendorId) return;

    setIsValidatingBoc(true);
    try {
      const result = await validateBoc({ checkoutId, vendorId });
      setBocValidation(result);
      if (!result.isValid) {
        setErrorMsg(result.message);
      }
    } catch {
      const fallback = {
        isValid: false,
        message: "Credit validation failed. Please try again.",
        paymentFee: 0,
      };
      setBocValidation(fallback);
      setErrorMsg(fallback.message);
    } finally {
      setIsValidatingBoc(false);
    }
  };

  // ── Individual Payment Handlers ───────────────────────────────────────────

  const handleCodPayment = (
    checkoutId: string,
    shippingAddress: any,
    amount: number,
  ) => {
    codCheckout(checkoutId, {
      onSuccess: async (response) => {
        await persistOrder(
          checkoutId,
          amount,
          shippingAddress,
          "CoD",
          response,
        );
        onSuccess({
          error: null,
          success: true,
          value: {
            ...response,
            billingAddress: buildAddressPayload(shippingAddress),
            billingAddressId: shippingAddress.userAddressId,
            orderTotal: amount,
            paymentMethod: "CoD",
            shippingAddress: buildAddressPayload(shippingAddress),
            shippingAddressId: shippingAddress.userAddressId,
          },
        });
      },
      onError,
    });
  };

  // const handleUpiPayment = async (
  //   checkoutId: string,
  //   amount: number,
  //   shippingAddress: any,
  //   vendorAccountId: string,
  // ) => {
  //   let razorpayOrderId: string;
  //   try {
  //     const orderRes = await createRazorpayOrder({
  //       amount,
  //       vendorAccountId,
  //       checkoutId,
  //       userId: profileData?.id ?? null,
  //     });
  //     razorpayOrderId = orderRes.id;
  //     console.log("Razorpay order created:", razorpayOrderId);
  //   } catch (err) {
  //     console.log(err, "create order error");
  //     setErrorMsg("Failed to initiate payment. Please try again.");
  //     return;
  //   }

  //   const result = await pay({
  //     amount,
  //     orderId: razorpayOrderId,
  //     description: "Order Payment",
  //     user: {
  //       name: shippingAddress.contactName,
  //       email: userDetails.email || "test@example.com",
  //       contact: shippingAddress.phone,
  //     },
  //   });

  //   if (!result.success) {
  //     if (String(result.error?.code) !== "1") {
  //       setErrorMsg(
  //         result.error?.description ?? "Payment failed. Please try again.",
  //       );
  //     }
  //     return;
  //   }

  //   try {
  //     await verifyPayment({
  //       razorpay_order_id: result.data.razorpay_order_id,
  //       razorpay_payment_id: result.data.razorpay_payment_id,
  //       razorpay_signature: result.data.razorpay_signature,
  //       amount,
  //       checkoutId,
  //       userId: profileData?.id ?? null,
  //     });
  //   } catch (err) {
  //     setErrorMsg("Payment verification failed. Contact support.");
  //     return;
  //   }

  const handleUpiPayment = async (
    checkoutId: string,
    amount: number,
    shippingAddress: any,
    vendorAccountId: string,
  ) => {
    let razorpayOrderId: string;
    try {
      const orderRes = await createRazorpayOrder({ checkoutId });
      console.log("RAW orderRes:", JSON.stringify(orderRes));
      if (!orderRes?.id) {
        throw new Error("Invalid order response from server");
      }
      razorpayOrderId = orderRes.id;
    } catch (err) {
      console.log(err, "create order error");
      setErrorMsg("Failed to initiate payment. Please try again.");
      return;
    }

    // ← this was missing — actually opens Razorpay checkout
    const result = await pay({
      amount,
      orderId: razorpayOrderId,
      description: "Order Payment",
      user: {
        name: shippingAddress.contactName,
        email: userDetails.email || "test@example.com",
        contact: shippingAddress.phone,
      },
    });

    if (!result.success) {
      if (String(result.error?.code) !== "1") {
        setErrorMsg(
          result.error?.description ?? "Payment failed. Please try again.",
        );
      }
      return;
    }

    try {
      await verifyPayment({
        checkoutId,
        razorpayOrderId: result.data.razorpay_order_id,
        razorpayPaymentId: result.data.razorpay_payment_id,
        razorpaySignature: result.data.razorpay_signature,
      });
    } catch (err) {
      setErrorMsg("Payment verification failed. Contact support.");
      return;
    }

    upiCheckout(
      {
        checkoutId,
        paymentId: result.data.razorpay_payment_id,
        orderId: result.data.razorpay_order_id,
        signature: result.data.razorpay_signature,
      },
      {
        onSuccess: async (response) => {
          await persistOrder(
            checkoutId,
            amount,
            shippingAddress,
            "UPI",
            response,
          );
          const addressPayload = buildAddressPayload(shippingAddress);
          onSuccess({
            error: null,
            success: true,
            value: {
              ...response,
              billingAddress: addressPayload,
              billingAddressId: shippingAddress.userAddressId,
              orderTotal: amount,
              paymentMethod: "UPI",
              shippingAddress: addressPayload,
              shippingAddressId: shippingAddress.userAddressId,
            },
          });
        },
        onError,
      },
    );
  };

  // ── BOC: needs checkoutId + vendorId ─────────────────────────────────────

  const handleCreditPayment = async (
    checkoutId: string,
    amount: number,
    shippingAddress: any,
    vendorId: number,
  ) => {
    console.log("BOC checkout →", { checkoutId, vendorId });

    bocCheckout(
      { checkoutId, vendorId },
      {
        onSuccess: async (response) => {
          await persistOrder(
            checkoutId,
            amount,
            shippingAddress,
            "BOC",
            response,
          );
          onSuccess({
            error: null,
            success: true,
            value: {
              ...response,
              billingAddress: buildAddressPayload(shippingAddress),
              billingAddressId: shippingAddress.userAddressId,
              orderTotal: amount,
              paymentMethod: "BOC",
              shippingAddress: buildAddressPayload(shippingAddress),
              shippingAddressId: shippingAddress.userAddressId,
            },
          });
        },
        onError,
      },
    );
  };

  // ── Main Place Order Handler ──────────────────────────────────────────────

  const handlePlaceOrder = async (
    selectedPayment: string,
    amount: number,
    shippingAddress: any,
    vendorId?: number,
  ) => {
    const checkoutId = await AsyncStorage.getItem("checkoutId");
    if (!checkoutId) return;
    setErrorMsg("");

    if (selectedPayment === "CoD") {
      handleCodPayment(checkoutId, shippingAddress, amount);
    } else if (selectedPayment === "RazorPay") {
      await handleUpiPayment(
        checkoutId,
        amount,
        shippingAddress,
        "acc_SiTe1aZkr6oiyU",
      );
    } else if (selectedPayment === "BuyOnCredit") {
      if (!vendorId) {
        setErrorMsg("Vendor information missing. Cannot place credit order.");
        return;
      }
      await handleCreditPayment(checkoutId, amount, shippingAddress, vendorId);
    }
  };

  return {
    errorMsg,
    isPending,
    paymentOptions,
    handlePlaceOrder,
    handlePaymentMethodChange,
    userDetails,
    setUserDetails,
    isProfileLoaded: !!profileData,
    bocValidation,
    isValidatingBoc,
  };
};
