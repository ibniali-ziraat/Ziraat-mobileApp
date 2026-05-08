import axiosInstance from "../api/client/axiosInstance";

// SEND OTP
export const sendOtpService = async (phoneNumber: string) => {

  const response = await axiosInstance.post("/ForgotPassword", {
    phoneNumber,
  });

  return response.data;
};


// VERIFY OTP + RESET PASSWORD
export const resetPasswordService = async (data: {
  phoneNumber: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}) => {

  const response = await axiosInstance.post(
    "/VerifyOtpAndResetPassword",
    data
  );

  return response.data;

};