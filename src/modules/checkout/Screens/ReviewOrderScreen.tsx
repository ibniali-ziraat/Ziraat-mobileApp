import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { AlertCircle, Info, LockKeyhole } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
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

  // Buy on Credit is the default payment method whenever every item allows it;
  // the farmer can still switch to CoD / RazorPay (and sees what they save)
  const creditOffered =
    paymentOptions.some((o) => o.value === "BuyOnCredit") &&
    !!summary?.items?.length &&
    summary.items.every(
      (item: any) =>
        item?.vendorAssignment?.isAvailableForCreditBuyers !== false,
    );
  const defaultApplied = useRef(false);
  useEffect(() => {
    if (defaultApplied.current || !creditOffered) return;
    if (methods.getValues("paymentMethod")) return;
    defaultApplied.current = true;
    methods.setValue("paymentMethod", "BuyOnCredit");
    // same eligibility check that runs when the farmer picks it by hand
    handlePaymentMethodChange("BuyOnCredit", summary?.items?.[0]?.vendorId);
  }, [creditOffered, methods, handlePaymentMethodChange, summary?.items]);

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
  const selectedPaymentLabel = paymentOptions.find(
    (o) => o.value === selectedPayment,
  )?.label;

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

        <OrderItems
          items={summary.items}
          isBuyOnCredit={isBuyOnCredit && bocValidation?.isValid === true}
        />
        <DeliveryAddress address={selectedAddress} />

        <OrderSummary
          summary={summary}
          couponCode={couponCode}
          isBuyOnCredit={isBuyOnCredit && bocValidation?.isValid === true}
          savingsPaymentMethodLabel={
            selectedPayment && !isBuyOnCredit ? selectedPaymentLabel : undefined
          }
        />

        <PaymentMethodSelector
          options={paymentOptions}
          onValueChange={onPaymentMethodChange}
        />

        {isBuyOnCredit && !!couponCode && (
          <View
            style={{
              marginTop: 12,
              marginHorizontal: 16,
              flexDirection: "row",
              alignItems: "flex-start",
              paddingHorizontal: 14,
              paddingVertical: 12,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: colors.warning,
              backgroundColor: cardTokens.surface,
            }}
          >
            <Info size={18} color={colors.warning} />
            <Text
              style={[
                typography.Poppins_xs_medium,
                {
                  flex: 1,
                  marginLeft: 10,
                  color: colors.darkHover,
                  fontSize: 14.5,
                  lineHeight: 22,
                },
              ]}
            >
              Coupons aren't applicable on Buy on Credit orders — your applied
              coupon won't be used for this purchase.
            </Text>
          </View>
        )}

        {isValidatingBoc && (
          <View
            style={{
              marginTop: 12,
              marginHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 14,
              paddingVertical: 12,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: cardTokens.hairline,
              backgroundColor: cardTokens.surface,
            }}
          >
            <ActivityIndicator size="small" color={chartTokens.current} />
            <Text
              style={[
                typography.Poppins_xs_regular,
                {
                  flex: 1,
                  marginLeft: 10,
                  color: cardTokens.inkSecondary,
                  fontSize: 14.5,
                  lineHeight: 22,
                },
              ]}
            >
              Checking credit eligibility...
            </Text>
          </View>
        )}

        {isBuyOnCredit && bocValidation && !bocValidation.isValid && (
          <View
            style={{
              marginTop: 12,
              marginHorizontal: 16,
              flexDirection: "row",
              alignItems: "flex-start",
              paddingHorizontal: 14,
              paddingVertical: 12,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: colors.error,
              backgroundColor: cardTokens.surface,
            }}
          >
            <AlertCircle size={18} color={colors.error} />
            <Text
              style={[
                typography.Poppins_xs_medium,
                {
                  flex: 1,
                  marginLeft: 10,
                  color: colors.error,
                  fontSize: 14.5,
                  lineHeight: 22,
                },
              ]}
            >
              {bocValidation.message}
            </Text>
          </View>
        )}

        {!!errorMsg && !isBuyOnCredit && (
          <View
            style={{
              marginTop: 12,
              marginHorizontal: 16,
              flexDirection: "row",
              alignItems: "flex-start",
              paddingHorizontal: 14,
              paddingVertical: 12,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: colors.error,
              backgroundColor: cardTokens.surface,
            }}
          >
            <AlertCircle size={18} color={colors.error} />
            <Text
              style={[
                typography.Poppins_xs_medium,
                {
                  flex: 1,
                  marginLeft: 10,
                  color: colors.error,
                  fontSize: 14.5,
                  lineHeight: 22,
                },
              ]}
            >
              {errorMsg}
            </Text>
          </View>
        )}

        <View
          style={{
            marginHorizontal: 16,
            marginTop: 20,
            marginBottom: 24,
          }}
        >
          <Pressable
            onPress={() =>
              handlePlaceOrder(
                selectedPayment,
                orderAmount,
                selectedAddress,
                vendorId, // ← number, used by BOC only
              )
            }
            disabled={!showPlaceOrderButton || isPending}
            accessibilityRole="button"
            accessibilityState={{
              disabled: !showPlaceOrderButton || isPending,
            }}
            style={{
              width: "100%",
              height: 56,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              backgroundColor: colors.primary,
              opacity: !showPlaceOrderButton || isPending ? 0.45 : 1,
            }}
          >
            <Text
              style={[
                typography.Poppins_s_bold,
                { color: colors.light, fontSize: 16.5 },
              ]}
            >
              {isPending
                ? "Placing order..."
                : !selectedPayment
                  ? "Select a payment method"
                  : bocBlocked || bocNotYetValidated || isValidatingBoc
                    ? "Payment method unavailable"
                    : "Place order"}
            </Text>
          </Pressable>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <LockKeyhole size={12} color={cardTokens.inkMuted} />
            <Text
              style={[
                typography.Poppins_xs_regular,
                {
                  marginLeft: 6,
                  color: cardTokens.inkMuted,
                  fontSize: 13,
                },
              ]}
            >
              Your order and payment details are protected
            </Text>
          </View>
        </View>
      </ScreenLayout>
    </FormProvider>
  );
};

export default ReviewOrderScreen;
