import { useMutation } from "@tanstack/react-query";

import {
    resetPasswordService,
    sendOtpService,
} from "../services/forgetPasswordService";


// SEND OTP
export const useSendOtpMutation = () => {
  return useMutation({
    mutationFn: sendOtpService,
  });
};


// VERIFY OTP + RESET PASSWORD
export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: resetPasswordService,
  });
};  