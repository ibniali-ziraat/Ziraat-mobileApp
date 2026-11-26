import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://codestrix-002-site1.itempurl.com/",
  // baseURL: "https://7mslcf5d-44388.inc1.devtunnels.ms/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
