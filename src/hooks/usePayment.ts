import RazorpayCheckout from "react-native-razorpay";

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
  const pay = async (opts: {
    amount: number; // ALREADY in paise — do NOT multiply by 100
    orderId: string;
    keyId?: string;
    description: string;
    user: { name: string; email: string; contact: string };
  }) => {
    const options = {
      key: opts.keyId ?? process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID!,
      amount: opts.amount,
      currency: "INR",
      name: "Ziraat",
      description: opts.description,
      order_id: opts.orderId,
      prefill: {
        name: opts.user.name,
        email: opts.user.email,
        contact: opts.user.contact,
      },
      theme: { color: "#2d6b06" },
      config: {
        display: {
          blocks: {
            upi: {
              name: "Pay via UPI",
              instruments: [{ method: "upi" }],
            },
          },
          sequence: ["block.upi"],
          preferences: { show_default_blocks: true },
        },
      },
    };
    try {
      const data = await RazorpayCheckout.open(options);
      return { success: true as const, data };
    } catch (error: any) {
      console.log("Razorpay error:", JSON.stringify(error));
      return { success: false as const, error };
    }
  };
  return { pay };
};