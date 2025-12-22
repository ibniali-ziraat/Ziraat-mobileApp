import { useCallback } from "react";
import RazorpayCheckout from "react-native-razorpay";
import { colors } from "../constants/colors";

const RAZORPAY_KEY = "rzp_test_RuYSKNZSDzCrK1";
type RazorpayResult =
  | {
      success: true;
      data: {
        razorpay_payment_id: string;
        razorpay_order_id?: string;
        razorpay_signature?: string;
      };
    }
  | {
      success: false;
      error: {
        code?: string;
        description: string;
        source?: string;
        step?: string;
        reason?: string;
      };
    };

export const usePayment = () => {
  const pay = useCallback(
    async ({
      amount,
      orderId,
      description,
      image,
      user,
    }: {
      amount: number; // rupees
      orderId?: string;
      description?: string;
      image?: string;
      user: {
        name: string;
        email: string;
        contact: string;
      };
    }): Promise<RazorpayResult> => {
      try {
        const options = {
          key: RAZORPAY_KEY,
          currency: "INR",
          amount: String(amount * 100), // paise
          name: "Ziraat",
          description,
          image,
          order_id: orderId,
          prefill: user,
          theme: { color: colors.primary },
          method: {
            upi: true,
            card: true,
            netbanking: true,
            wallet: true,
          },
        };

        const response = await RazorpayCheckout.open(options);

        return {
          success: true,
          data: response,
        };
      } catch (err: any) {
        return {
          success: false,
          error: {
            code: err?.code,
            description: err?.description || "Payment cancelled",
            source: err?.source,
            step: err?.step,
            reason: err?.reason,
          },
        };
      }
    },
    []
  );

  return { pay };
};
