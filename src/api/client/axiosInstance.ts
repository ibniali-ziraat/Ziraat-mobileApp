import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ziratuser-001-site1.ltempurl.com/",
  // baseURL:
  //   "https://p819m9x7-44388.inc1.devtunnels.ms/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
