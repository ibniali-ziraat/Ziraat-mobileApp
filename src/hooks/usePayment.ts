import { useCallback } from "react";
import RazorpayCheckout from "react-native-razorpay";
import { colors } from "../constants/colors";

type RazorpayUser = {
  name: string;
  email: string;
  contact: string;
};

type RazorpayPaymentInput = {
  amount: number; // rupees
  orderId?: string;
  description?: string;
  image?: string;
  user: RazorpayUser;
};

type RazorpayResult =
  | { success: true; paymentId: string }
  | { success: false; error: string };

const RAZORPAY_KEY = "rzp_test_RuYSKNZSDzCrK1";

export const usePayment = () => {
  const pay = useCallback(
    async ({
      amount,
      orderId,
      description,
      image,
      user,
    }: RazorpayPaymentInput): Promise<RazorpayResult> => {
      try {
        const options = {
          key: RAZORPAY_KEY,
          currency: "INR",
          //   amount: String(amount * 100),
          amount: "1",
          name: "Ziraat",
          description,
          image,
          order_id: orderId, // optional
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.contact,
          },
          theme: { color: colors.primary },
          method: {
            upi: true,
            card: true,
            netbanking: true,
            wallet: true,
          },
        };

        const result = await RazorpayCheckout.open(options);

        return {
          success: true,
          paymentId: result.razorpay_payment_id,
        };
      } catch (error: any) {
        return {
          success: false,
          error: error?.description || "Payment cancelled",
        };
      }
    },
    []
  );

  return { pay };
};
