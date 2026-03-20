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
