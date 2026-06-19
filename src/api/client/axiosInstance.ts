import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://ziraatapi-fgfhe3hxf3h9gkg4.centralindia-01.azurewebsites.net/",
    // "https://25nd7fx7-44388.inc1.devtunnels.ms/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
