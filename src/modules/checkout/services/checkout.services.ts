import axiosInstance from "@/src/api/client/axiosInstance";

export const applyCoupon = async (payload: { couponCode: string }) => {
  const { data } = await axiosInstance.post("/cart/apply-coupon", payload);
  return data;
};

export const getCoupon = async (couponCode?: string) => {
  const { data } = await axiosInstance.get(
    `/api/coupons/available${couponCode ? `?code=${couponCode}` : ""}`
  );

  return data?.data || []; 
};

export const checkout = async (payload: { couponCode: string }) => {
  const { data } = await axiosInstance.post("/checkout", payload);
  return data;
};

/* ================= create address ================= */

export interface SelectOption {
  disabled: boolean;
  group?: {
    disabled: boolean;
    name: string;
  };
  selected: boolean;
  text: string;
  value: string;
}

export interface CreateAddressPayload {
  id: number;
  contactName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  zipCode: string;
  city: string;
  stateOrProvinceId: number;
  districtId: number;
  countryId: string;

  stateOrProvinces: any[];
  districts: any[];
  countries: any[];

  displayDistrict: boolean;
  displayZipCode: boolean;
  displayCity: boolean;
}

export const getCheckoutShipping = async (checkoutId: string) => {
  const { data } = await axiosInstance.get(`/checkout/${checkoutId}/shipping`);
  return data;
};

export const createCheckoutShipping = async (
  checkoutId: string,
  payload: any,
) => {
  const { data } = await axiosInstance.post(
    `/checkout/${checkoutId}/shipping`,
    payload,
  );

  return data;
};

export const createShippingAddress = async (payload: any) => {
  const { data } = await axiosInstance.post(`/Create`, payload);
  return data;
};

export const updateTaxAndShippingPrices = async (
  checkoutId: string,
  payload: any,
) => {
  const { data } = await axiosInstance.post(
    `/checkout/${checkoutId}/update-tax-and-shipping-prices`,
    payload,
  );

  return data;
};

export const getPaymentProviders = async () => {
  const { data } = await axiosInstance.get(
    "/api/payments-providers/GetPaymentProviders",
  );

  return data;
};

//place order------
export const codCheckoutService = async (checkoutId: string) => {
  const response = await axiosInstance.post(
    `/api/CoD/CoDCheckout?checkoutId=${checkoutId}`,
  );

  return response.data;
};
export const upiCheckoutService = async (payload: {
  checkoutId: string;
  paymentId: string;
  orderId: string;
  signature: string;
}) => {
  const { data } = await axiosInstance.post(
    `/api/payments/upi-checkout`,
    payload,
  );
  return data;
};
