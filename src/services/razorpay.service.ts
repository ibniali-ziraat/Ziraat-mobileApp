import razorpayInstance from "../api/client/razorPayInstance";

// 1. Create Razorpay order + save initial Payment record to MongoDB
export const createRazorpayOrderService = async (payload: {
  amount: number;
  vendorAccountId: string;
  checkoutId?: string; // passed so backend can save Payment record early
  userId?: number | null; // stored in Payment record
}) => {
  console.log(payload, "createRazorpayOrder payload");
  const { data } = await razorpayInstance.post("/create-order", payload);
  return data; // { id, currency, amount }
};

// 2. Verify payment + fetch transferId + update Payment record in MongoDB
export const verifyRazorpayPaymentService = async (payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  amount: number;
  checkoutId: string;
  userId: number | null;
  // vendorAccountId NOT needed here — backend reads it from MongoDB
}) => {
  const { data } = await razorpayInstance.post("/verify-payment", payload);
  return data; // { success, transferId }
};

// 3. Save full Order record to MongoDB after payment success
export const saveOrderService = async (payload: {
  checkoutId: string;
  userId: number | null;
  orderItems: any[];
  shippingAddress: any;
  billingAddress: any;
  shippingAddressId: number;
  billingAddressId: number;
  orderTotal: number;
  discountAmount?: number;
  shippingFeeAmount?: number;
  paymentFeeAmount?: number;
  couponCode?: string | null;
  couponRuleName?: string | null;
  paymentMethod: "UPI" | "CoD";
  orderStatus?: number;
  shippingMethod?: string;
  isMasterOrder?: boolean;
  parentId?: string | null;
  orderNote?: string | null;
}) => {
  const { data } = await razorpayInstance.post("/save-order", payload);
  return data; // { success, order }
};

// 4. Release held transfer after delivery (manual, by transferId)
export const releaseRazorpayPaymentService = async (payload: {
  transferId: string;
  checkoutId: string;
}) => {
  const { data } = await razorpayInstance.post("/release-payment", payload);
  return data;
};

// 5. Mark order delivered + auto-release payment to vendor (preferred)
export const orderDeliveredService = async (payload: {
  checkoutId: string;
}) => {
  const { data } = await razorpayInstance.post("/order-delivered", payload);
  return data;
};
