// ReviewOrderScreen.tsx
import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { typography } from "@/src/constants/fonts/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Pressable, Text } from "react-native";

import { DeliveryAddress } from "../components/DeliveryAddress";
import { OrderItems } from "../components/OrderItems";
import { OrderSummary } from "../components/OrderSummary";
import { PaymentMethodSelector } from "../components/PaymentMethodSelector";
import { useReviewOrder } from "../hooks/useReviewOrder";

const ReviewOrderScreen = () => {
  const { address, orderSummary } = useLocalSearchParams();
  console.log(orderSummary, "order summarey");

  const selectedAddress = address ? JSON.parse(address as string) : null;
  const summary = orderSummary ? JSON.parse(orderSummary as string) : null;

  const methods = useForm({ defaultValues: { paymentMethod: "" } });
  const selectedPayment = methods.watch("paymentMethod");

  const { errorMsg, isPending, paymentOptions, handlePlaceOrder } =
    useReviewOrder();

  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    const getCoupon = async () => {
      const stored = await AsyncStorage.getItem("appliedCoupon");
      if (stored) setCouponCode(stored);
    };
    getCoupon();
  }, []);

  if (!summary || !selectedAddress) return null;

  // console.log(selectedAddress, "selected address....");

  return (
    <FormProvider {...methods}>
      <ScreenLayout scrollable>
        <BackHeader title="Review Order" desc="Confirm your order details" />

        <OrderItems items={summary.items} />
        <DeliveryAddress address={selectedAddress} />
        <OrderSummary summary={summary} couponCode={couponCode} />
        <PaymentMethodSelector options={paymentOptions} />

        {!!errorMsg && (
          <Text className="mt-3 text-center text-sm font-semibold text-[#f44336]">
            {errorMsg}
          </Text>
        )}

        {!!selectedPayment && (
          <Pressable
            onPress={() =>
              handlePlaceOrder(
                selectedPayment,
                summary.orderTotal,
                selectedAddress,
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
