import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
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
          <View
            style={{
              marginTop: 14,
              marginHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <ActivityIndicator size="small" color={chartTokens.current} />
            <Text
              style={[
                typography.Poppins_xs_regular,
                { color: cardTokens.inkMuted, fontSize: 13 },
              ]}
            >
              Checking credit eligibility...
            </Text>
          </View>
        )}

        {isBuyOnCredit && bocValidation && !bocValidation.isValid && (
          <Text
            style={[
              typography.Poppins_xs_semibold,
              {
                marginTop: 14,
                marginHorizontal: 16,
                textAlign: "center",
                color: chartTokens.negative,
                fontSize: 13,
              },
            ]}
          >
            {bocValidation.message}
          </Text>
        )}

        {!!errorMsg && !isBuyOnCredit && (
          <Text
            style={[
              typography.Poppins_xs_semibold,
              {
                marginTop: 14,
                marginHorizontal: 16,
                textAlign: "center",
                color: chartTokens.negative,
                fontSize: 13,
              },
            ]}
          >
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
            style={({ pressed }) => ({
              marginHorizontal: 16,
              marginTop: 24,
              marginBottom: 24,
              height: 56,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              backgroundColor: chartTokens.current,
              opacity: pressed || isPending ? 0.85 : 1,
            })}
          >
            <Text
              style={[
                typography.Poppins_s_bold,
                { color: "#FFFFFF", fontSize: 16 },
              ]}
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
