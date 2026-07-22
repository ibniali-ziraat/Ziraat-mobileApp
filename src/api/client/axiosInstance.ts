import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://g87613d7-44388.inc1.devtunnels.ms/",
  // baseURL:
  //   "https://ziraatapi-fgfhe3hxf3h9gkg4.centralindia-01.azurewebsites.net/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
