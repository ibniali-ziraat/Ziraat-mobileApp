import axiosInstance from "@/src/api/client/axiosInstance";
import { CreateCheckoutPayload } from "../checkoutTypes";

export const applyCoupon = async (payload: { couponCode: string }) => {
  const { data } = await axiosInstance.post("/cart/apply-coupon", payload);
  return data;
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

export const createAddress = async (payload: CreateAddressPayload) => {
  try {
    const response = await axiosInstance.post("/Create", payload);

    return response.data;
  } catch (error: any) {
    /**
     * ✅ HANDLE 302 REDIRECT CASE
     */
    if (error?.response?.status === 302) {
      console.log("302 redirect received — treating as success");

      return error.response.data;
    }

    throw error;
  }
};

export const createCheckout = async (payload: CreateCheckoutPayload) => {
  try {
    const response = await axiosInstance.post(
      "/Checkout/Create", // change endpoint if needed
      payload,
    );

    return response.data;
  } catch (error: any) {
    /**
     * ✅ HANDLE 302 REDIRECT CASE
     */
    if (error?.response?.status === 302) {
      console.log("302 redirect received — treating as success");

      return error.response.data;
    }

    throw error;
  }
};

export const getCheckoutShipping = async (checkoutId: string) => {
  const { data } = await axiosInstance.get(`/checkout/${checkoutId}/shipping`);

  return data;
};
