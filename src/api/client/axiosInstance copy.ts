import { getItem } from "@/src/utils/universalSecureToken";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://m49j32jc-44388.inc1.devtunnels.ms/",
  // "https://cnw9455s-44388.inc1.devtunnels.ms/",

  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getItem("user_token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
