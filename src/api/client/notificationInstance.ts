import { getItem } from "@/src/utils/universalSecureToken";
import axios from "axios";

const notificationInstance = axios.create({
  // baseURL: "https://pushnotificationserver.onrender.com/",
  baseURL: "https://greedy-chirpy-rambling.ngrok-free.dev/",

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
