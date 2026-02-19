import { getItem } from "@/src/utils/universalSecureToken";
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://r612bq9q-44388.inc1.devtunnels.ms",

  baseURL:
    "https://ziraatapi-fgfhe3hxf3h9gkg4.centralindia-01.azurewebsites.net/",

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
