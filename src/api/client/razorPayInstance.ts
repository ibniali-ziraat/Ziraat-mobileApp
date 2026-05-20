import axios from "axios";

const razorpayInstance = axios.create({
  baseURL: "https://reattach-scope-aeration.ngrok-free.dev",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export default razorpayInstance;
