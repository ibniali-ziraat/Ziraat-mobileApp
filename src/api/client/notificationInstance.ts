import { getItem } from "@/src/utils/universalSecureToken";
import axios from "axios";

const notificationInstance = axios.create({
  baseURL: "http://192.168.1.29:3001/",

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
