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
  useCodCheckout,
  usePaymentProviders,
  useUpiCheckout,
} from "./useCheckout";

const UPI_OPTION = { label: "UPI", value: "UPI" };

export type UserPaymentDetails = {
  name: string;
  email: string;
  phone: string;
};

export const useReviewOrder = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [userDetails, setUserDetails] = useState<UserPaymentDetails>({
    name: "",
    email: "",
    phone: "",
  });

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
  const { mutateAsync: createRazorpayOrder } = useCreateRazorpayOrder();
  const { mutateAsync: verifyPayment } = useVerifyRazorpayPayment();
  const { mutateAsync: saveOrder } = useSaveOrder();
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
    paymentMethod: "UPI" | "CoD",
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
      // non-blocking — don't stop navigation if mongo save fails
      console.error("Something went wrong please try after sometime", err);
    }
  };

  // --- COD ---
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

  // --- UPI ---
  const handleUpiPayment = async (
    checkoutId: string,
    amount: number,
    shippingAddress: any,
    vendorAccountId: string,
  ) => {
    // Step 1: Create Razorpay order + save initial Payment record to MongoDB.
    // Pass checkoutId and userId so backend can store vendorAccountId early —
    // verify-payment will read it from DB instead of needing it re-sent.
    let razorpayOrderId: string;
    try {
      const orderRes = await createRazorpayOrder({
        amount,
        vendorAccountId,
        checkoutId,
        userId: profileData?.id ?? null,
      });
      razorpayOrderId = orderRes.id;
      console.log("Razorpay order created:", razorpayOrderId);
    } catch (err) {
      console.log(err, "create order error");
      setErrorMsg("Failed to initiate payment. Please try again.");
      return;
    }

    // Step 2: Open Razorpay payment sheet
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

    console.log("Razorpay result:", result);

    if (!result.success) {
      // code 1 = user dismissed — silent, don't show error
      if (String(result.error?.code) !== "1") {
        setErrorMsg(
          result.error?.description ?? "Payment failed. Please try again.",
        );
      }
      return;
    }

    // Step 3: Verify signature + fetch transferId + update Payment in MongoDB
    try {
      await verifyPayment({
        razorpay_order_id: result.data.razorpay_order_id,
        razorpay_payment_id: result.data.razorpay_payment_id,
        razorpay_signature: result.data.razorpay_signature,
        amount,
        checkoutId,
        userId: profileData?.id ?? null,
      });
    } catch (err) {
      setErrorMsg("Payment verification failed. Contact support.");
      return;
    }

    // Step 4: Notify main Azure backend about UPI checkout completion
    upiCheckout(
      {
        checkoutId,
        paymentId: result.data.razorpay_payment_id,
        orderId: result.data.razorpay_order_id,
        signature: result.data.razorpay_signature,
      },
      {
        onSuccess: async (response) => {
          // Step 5: Save full Order record to MongoDB (fire-and-forget)
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

  // --- Main handler ---
  const handlePlaceOrder = async (
    selectedPayment: string,
    amount: number,
    shippingAddress: any,
    vendorAccountId: string = "",
  ) => {
    const checkoutId = await AsyncStorage.getItem("checkoutId");
    if (!checkoutId) return;
    setErrorMsg("");

    if (selectedPayment === "CoD") {
      handleCodPayment(checkoutId, shippingAddress, amount);
    } else if (selectedPayment === "UPI") {
      await handleUpiPayment(
        checkoutId,
        amount,
        shippingAddress,
        (vendorAccountId = "acc_SiTe1aZkr6oiyU"),
      );
    }
  };

  return {
    errorMsg,
    isPending,
    paymentOptions,
    handlePlaceOrder,
    userDetails,
    setUserDetails,
    isProfileLoaded: !!profileData,
  };
};
