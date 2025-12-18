import { getItem } from "@/src/utils/universalSecureToken";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://l1k6q3vc-44388.inc1.devtunnels.ms",
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
  (error) => Promise.reject(error)
);

export default axiosInstance;
