import axiosInstance from "../api/client/axiosInstance";



    export const saveOtp = async (phoneNumber,otp) =>
 (await axiosInstance.post("/api/core/otpverfication", phoneNumber,otp))
    .data;



export const postPassword = async (password) =>
  (await axiosInstance.post(`/user/set-password,${password}`))
    .data;




  