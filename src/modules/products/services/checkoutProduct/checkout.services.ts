import axiosInstance from "@/src/api/client/axiosInstance";

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

  stateOrProvinces: SelectOption[];
  districts: SelectOption[];
  countries: SelectOption[];

  displayDistrict: boolean;
  displayZipCode: boolean;
  displayCity: boolean;
}

export const createAddress = async (payload: CreateAddressPayload) => {
  const { data } = await axiosInstance.post("/Create", payload);
  return data;
};
