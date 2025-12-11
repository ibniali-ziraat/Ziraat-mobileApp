import axios from "axios";

export let userAuthToken: string | null = null;

export const setUserAxiosToken = (token: string | null) => {
  userAuthToken = token;
};

const axiosUser = axios.create({
  baseURL: "https://j6rs4vgs-44388.inc1.devtunnels.ms",
  headers: { "Content-Type": "application/json" },
});

axiosUser.interceptors.request.use((config) => {
  if (userAuthToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${userAuthToken}`;
  }
  return config;
});

export default axiosUser;
