import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import FormActions from "@/src/components/shared/FormActions";

import {
  useResetPasswordMutation,
  useSendOtpMutation,
} from "@/src/hooks/useForgotPassword";
import { useZodForm } from "@/src/hooks/useZodForm";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";

import BackHeader from "@/src/components/shared/BackHeader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { Lock } from "lucide-react-native";
import { FormProvider } from "react-hook-form";
import { ResetPasswordSchema } from "./schemas/newPassword.schema";
import { VerifyPhoneSchema } from "./schemas/verfiy-phone.schema";
import VerifyOtpAndReset from "./steps/VerifyOtpAndReset";
import VerifyPhone from "./steps/VerifyPhone";

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState<0 | 1>(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpTimer, setOtpTimer] = useState(60);

  const schema = step === 0 ? VerifyPhoneSchema : ResetPasswordSchema;
  const methods = useZodForm(schema);
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutateAsync: sendOtp, isPending: isSendingOtp } =
    useSendOtpMutation();
  const { mutateAsync: resetPassword, isPending: isResetting } =
    useResetPasswordMutation();

  useEffect(() => {
    if (step !== 1) return;
    if (otpTimer === 0) return;
    const timerId = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [step, otpTimer]);

  const sendOtpFlow = async (mobileNumber: string) => {
    try {
      await sendOtp(mobileNumber);
      showSuccessToast("OTP sent successfully");
      setPhoneNumber(mobileNumber);
      setStep(1);
      setOtpTimer(60);
    } catch (err: any) {
      showErrorToast(err?.response?.data?.message || "Failed to send OTP");
    }
  };

  const resetFlow = async (values: {
    otp: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      await resetPassword({
        phoneNumber,
        otp: values.otp,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      showSuccessToast("Password updated");
      router.replace(ROUTES.AUTH.LOGIN);
    } catch (err: any) {
      showErrorToast(err?.response?.data?.error || "Failed to reset password");
    }
  };

  const resendOtpFlow = async () => {
    try {
      await sendOtp(phoneNumber);
      showSuccessToast("OTP resent");
      setOtpTimer(60);
    } catch (err: any) {
      showErrorToast(err?.response?.data?.message || "Failed to resend OTP");
    }
  };

  const onSubmit = async (values: any) => {
    if (step === 0) {
      return sendOtpFlow(values.mobileNumber);
    }

    if (otpTimer > 0) {
      return resetFlow(values);
    }
  };

  const prevStep = () => {
    if (step === 1) {
      setStep(0);
      return;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <BackHeader
        title="Forgot Password"
        desc="Recover your account securely"
      />
      <ScreenLayout>
        <ScreenContent>
          <FormProvider {...methods}>
            {step === 0 ? (
              <VerifyPhone errors={errors} />
            ) : (
              <VerifyOtpAndReset
                phoneNumber={phoneNumber}
                timer={otpTimer}
                errors={errors}
                onResendOtp={resendOtpFlow}
                isResending={isSendingOtp}
              />
            )}

            <View>
              <FormActions
                cancelLabel={step > 0 ? "Back" : undefined}
                onCancel={prevStep}
                submitLabel={step === 0 ? "Send OTP" : "Verify & Reset"}
                onSubmit={handleSubmit(onSubmit)}
                disabled={
                  isSendingOtp || isResetting || (step === 1 && otpTimer <= 0)
                }
                loading={isSendingOtp || isResetting}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 16,
              }}
            >
              <Lock size={14} color={colors.secondary} />
              <Text style={{ marginLeft: 6, color: colors.neutral }}>
                Your information is secure
              </Text>
            </View>
          </FormProvider>
        </ScreenContent>
      </ScreenLayout>
    </View>
  );
}
