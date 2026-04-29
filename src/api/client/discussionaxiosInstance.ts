import { getItem } from "@/src/utils/universalSecureToken";
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://discussionapi.onrender.com/",
   baseURL: "http://localhost:3001/",
  // baseURL:"https://v4g9793f-7229.inc1.devtunnels.ms/",
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
