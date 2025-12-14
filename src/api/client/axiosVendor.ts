import axios from "axios";

export let vendorAuthToken: string | null = null;

export const setVendorAxiosToken = (token: string | null) => {
  vendorAuthToken = token;
};

const axiosVendor = axios.create({
  baseURL: "https://j6rs4vgs-44388.inc1.devtunnels.ms",
  headers: { "Content-Type": "application/json" },
});

axiosVendor.interceptors.request.use((config) => {
  if (vendorAuthToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${vendorAuthToken}`;
  }
  return config;
});

export default axiosVendor;
