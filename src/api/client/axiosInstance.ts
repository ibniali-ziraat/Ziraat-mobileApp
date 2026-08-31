import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://umarmukhtar-001-site1.jtempurl.com/",
  // baseURL:
  //   "https://bpspx92m-44388.inc1.devtunnels.ms/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
