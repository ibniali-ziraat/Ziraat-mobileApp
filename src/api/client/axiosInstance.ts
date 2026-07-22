import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://umarmukhtar-001-site1.jtempurl.com/",
  // baseURL:
  //   "https://ziraatapi-fgfhe3hxf3h9gkg4.centralindia-01.azurewebsites.net/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
