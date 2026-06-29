import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://m49j32jc-44388.inc1.devtunnels.ms/",
  // "https://25nd7fx7-44388.inc1.devtunnels.ms/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
