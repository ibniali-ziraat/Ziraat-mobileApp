// import axiosInstance from "../api/client/axiosInstance";



//     export const saveOtp = async (phoneNumber,otp) =>
//  (await axiosInstance.post("/api/core/otpverfication", phoneNumber,otp))
//     .data;



// export const postPassword = async (password) =>
//   (await axiosInstance.post(`/user/set-password,${password}`))
//     .data;




import axiosInstance from "../api/client/axiosInstance";

/* SEND OTP */
export const sendOtpService = async (phoneNumber: string) => {
  const { data } = await axiosInstance.post("/api/core/send-otp", {
    phoneNumber,
  });

  return data;
};

/* VERIFY OTP */
export const verifyOtpService = async ({
  phoneNumber,
  otp,
}: {
  phoneNumber: string;
  otp: string;
}) => {
  const { data } = await axiosInstance.post("/api/core/otpverfication", {
    phoneNumber,
    otp,
  });

  return data;
};

/* RESET PASSWORD */
export const resetPasswordService = async ({
  phoneNumber,
  password,
}: {
  phoneNumber: string;
  password: string;
}) => {
  const { data } = await axiosInstance.post("/user/set-password", {
    phoneNumber,
    password,
  });

  return data;
};







  