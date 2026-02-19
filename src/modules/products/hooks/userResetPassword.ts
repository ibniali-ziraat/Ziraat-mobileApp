

import { resetPasswordService, sendOtpService, verifyOtpService } from "@/src/services/forgetPassword";
import { useMutation } from "@tanstack/react-query";

export const useSendOtpMutation = () =>
  useMutation({
    mutationFn: sendOtpService,
  });

export const useOtpVerifyMutation = () =>
  useMutation({
    mutationFn: verifyOtpService,
  });

export const useResetPasswordMutation = () =>
  useMutation({
    mutationFn: resetPasswordService,
  });
