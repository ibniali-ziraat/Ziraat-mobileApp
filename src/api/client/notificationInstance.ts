import { getItem } from "@/src/utils/universalSecureToken";
import axios from "axios";

const notificationInstance = axios.create({
  // baseURL: "https://pushnotificationserver.onrender.com/",
  baseURL:
    "https://ai-ecomintegration-c2ffbzcxg0a9dtdj.centralindia-01.azurewebsites.net/",

  headers: {
    "Content-Type": "application/json",
  },
});

notificationInstance.interceptors.request.use(
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

export default notificationInstance;
