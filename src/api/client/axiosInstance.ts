import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://j6rs4vgs-44388.inc1.devtunnels.ms",
  headers: {
    "Content-Type": "application/json",
  },
});
console.log(process.env.EXPO_PUBLIC_ZIRAAT_BASE_URL, "url");

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("auth_token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
