import axiosInstance from "@/src/api/client/axiosInstance";

export interface Country {
  id: string; // or number → adjust based on API response
  name: string;
  twoLetterIsoCode?: string;
  threeLetterIsoCode?: string;
}

/* ================= get countries  ================= */

export const fetchCountries = async (): Promise<Country[]> => {
  const { data } = await axiosInstance.get("/api/countries");
  return data;
};

export interface StateProvince {
  id: number; // adjust if string
  name: string;
  abbreviation?: string;
}

/* ================= API ================= */

export const fetchStatesByCountry = async (
  countryId: string,
): Promise<StateProvince[]> => {
  const { data } = await axiosInstance.get(
    `/api/countries/${countryId}/states-provinces`,
  );

  return data;
};

/* ================= district api ================= */

export interface district {
  id: number; // adjust if string
  name: string;
  abbreviation?: string;
}

export const fetchDistrictsByStates = async (
  stateOrProvinceId: string,
): Promise<district[]> => {
  const { data } = await axiosInstance.get(
    `/api/states-provinces/${stateOrProvinceId}/districts`,
  );

  return data;
};

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

export const createAddress = async (payload) => {
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

export const createCheckout = async (payload) => {
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

// get all the addresses

export const getListAddresses = async () => {
  const { data } = await axiosInstance.get("/List");

  return data;
};

export const deleteUserAddress = async (userAddressId: number) => {
  const { data } = await axiosInstance.post("/Delete", null, {
    params: { id: userAddressId },
  });

  return data;
};

// export const editUserAddress = async (
//   userAddressId: number,
//   payload: any
// ) => {
//   const { data } = await axiosInstance.post(
//     "/Edit",
//     payload,
//     {
//       params: { id: userAddressId },
//     }
//   );

//   return data;
// };

export const getExistingAddressess = async (userAddressId: number) => {
  const { data } = await axiosInstance.get("/Edit", {
    params: { id: userAddressId },
  });

  return data;
};

export const editUserAddress = async (userAddressId: number, payload: any) => {
  const { data } = await axiosInstance.post("/Edit", payload, {
    params: { id: userAddressId },
  });

  return data;
};

export const PostSetDefaultAddress = async (userAddressId: number) => {
  const { data } = await axiosInstance.post("/SetAsDefault", null, {
    params: { id: userAddressId },
  });

  return data;
};
