import axios from "axios";
import { getItem } from "@/src/utils/universalSecureToken";

const botInstance = axios.create({
    baseURL: "https://v4g9793f-7229.inc1.devtunnels.ms",
    headers: {
        "Content-Type": "application/json",
    },
});

//  FIXED INTERCEPTOR
botInstance.interceptors.request.use(
    async (config) => {
        const token = await getItem("user_token");

        console.log("TOKEN ", token);

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.log(" NO TOKEN FOUND");
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default botInstance;