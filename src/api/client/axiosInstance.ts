import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://umarmukhtar-001-site1.jtempurl.com/",
  baseURL:
    "https://ldpwf73h-44388.inc1.devtunnels.ms/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
