import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { typography } from "@/src/constants/fonts/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { DeliveryAddress } from "../components/DeliveryAddress";
import { OrderItems } from "../components/OrderItems";
import { OrderSummary } from "../components/OrderSummary";
import { PaymentMethodSelector } from "../components/PaymentMethodSelector";
import { useReviewOrder } from "../hooks/useReviewOrder";

const ReviewOrderScreen = () => {
  const { address, orderSummary } = useLocalSearchParams();

  const selectedAddress = address ? JSON.parse(address as string) : null;
  const summary = orderSummary ? JSON.parse(orderSummary as string) : null;

  const methods = useForm({ defaultValues: { paymentMethod: "" } });
  const selectedPayment = methods.watch("paymentMethod");

  const {
    errorMsg,
    isPending,
    paymentOptions,
    handlePlaceOrder,
    handlePaymentMethodChange,
    bocValidation,
    isValidatingBoc,
  } = useReviewOrder();

  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    const getCoupon = async () => {
      const stored = await AsyncStorage.getItem("appliedCoupon");
      if (stored) setCouponCode(stored);
    };
    getCoupon();
  }, []);

  if (!summary || !selectedAddress) return null;

  // vendorId is a number — comes from items[0].vendorId
  const vendorId: number | undefined = summary?.items?.[0]?.vendorId;
  const va = summary?.items?.[0]?.vendorAssignment;

  const isBuyOnCredit = selectedPayment === "BuyOnCredit";

  // Use creditSalePrice when BOC is selected and validated
  const orderAmount =
    isBuyOnCredit && bocValidation?.isValid && va?.creditSalePrice
      ? va.creditSalePrice
      : summary.orderTotal;

  const onPaymentMethodChange = (value: string) => {
    handlePaymentMethodChange(value, vendorId);
  };

  const bocBlocked =
    isBuyOnCredit && bocValidation !== null && !bocValidation.isValid;
  const bocNotYetValidated =
    isBuyOnCredit && bocValidation === null && !isValidatingBoc;
  const showPlaceOrderButton =
    !!selectedPayment && !bocBlocked && !bocNotYetValidated && !isValidatingBoc;

  return (
    <FormProvider {...methods}>
      <ScreenLayout scrollable>
        <BackHeader title="Review Order" desc="Confirm your order details" />

        <OrderItems items={summary.items} />
        <DeliveryAddress address={selectedAddress} />

        <OrderSummary
          summary={summary}
          couponCode={couponCode}
          isBuyOnCredit={isBuyOnCredit && bocValidation?.isValid === true}
        />

        <PaymentMethodSelector
          options={paymentOptions}
          onValueChange={onPaymentMethodChange}
        />

        {isValidatingBoc && (
          <View className="mt-3 flex-row items-center justify-center gap-2">
            <ActivityIndicator size="small" color="#2d6b06" />
            <Text className="text-sm text-neutral-500">
              Checking credit eligibility...
            </Text>
          </View>
        )}

        {isBuyOnCredit && bocValidation && !bocValidation.isValid && (
          <Text className="mt-3 text-center text-sm font-semibold text-[#f44336]">
            {bocValidation.message}
          </Text>
        )}

        {!!errorMsg && !isBuyOnCredit && (
          <Text className="mt-3 text-center text-sm font-semibold text-[#f44336]">
            {errorMsg}
          </Text>
        )}

        {showPlaceOrderButton && (
          <Pressable
            onPress={() =>
              handlePlaceOrder(
                selectedPayment,
                orderAmount,
                selectedAddress,
                vendorId, // ← number, used by BOC only
              )
            }
            disabled={isPending}
            className="mx-4 my-6 h-14 items-center justify-center rounded-xl bg-[#2d6b06]"
          >
            <Text
              style={typography.Poppins_s_bold}
              className="text-base text-white"
            >
              {isPending ? "Placing Order..." : "Place Order"}
            </Text>
          </Pressable>
        )}
      </ScreenLayout>
    </FormProvider>
  );
};

export default ReviewOrderScreen;
