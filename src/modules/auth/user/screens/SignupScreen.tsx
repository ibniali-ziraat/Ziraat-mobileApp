import {
  useCheckUserExists,
  useLoginMutation,
  useOtpVerifyMutation,
  useProfileMutation,
  useSendOtpMutation,
} from "../../../../hooks/userQueryHooks";

import OTPSection from "@/src/modules/auth/user/sections/OTPSection";
import ProfileSection from "@/src/modules/auth/user/sections/ProfileSection";

import FormActions from "@/src/components/shared/FormActions";

import AnimatedStepWrapper from "@/src/components/shared/AnimatedStepWrapper";
import Heading from "@/src/components/shared/Heading";
import OtpHeading from "@/src/components/shared/OtpHeading";
import { DUMMY_EMAIL } from "@/src/constants/constants";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import { profileSchema } from "@/src/modules/auth/user/schemas/profile.schema";
import { otpSchema } from "@/src/schemas/otp.schema";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { View } from "react-native";
import AuthWrapper from "../component/AuthWrapper";

export default function SignupScreen() {
  const [step, setStep] = useState(0);
  const { setUserId, setUserToken } = useAuth();

  const [profileData, setProfileData] = useState<any>(null);

  const schemas = [profileSchema, otpSchema];

  const methods = useZodForm(schemas[step]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutateAsync: signupMutate, isPending: isSignupPending } =
    useProfileMutation();
  const { mutateAsync: verifyOtpMutate, isPending: isOtpPending } =
    useOtpVerifyMutation();
  const { mutateAsync: loginMutate } = useLoginMutation();

  const { mutateAsync: verifyUserExists, isPending: isUserExistsPending } =
    useCheckUserExists();

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);
  const { mutateAsync: sendOtpMutate, isPending: isSendingOtp } =
    useSendOtpMutation();

  const onSubmit = async (data: any) => {
    if (step === 0) {
      try {
        const normalizedData = {
          ...data,
          email: data.email?.trim() || `${data.phone + DUMMY_EMAIL}`,
        };

        setProfileData(normalizedData);

        const existsRes = await verifyUserExists({
          phone: normalizedData.phone,
          email: normalizedData.email,
        });

        if (existsRes?.success === false) {
          showErrorToast(existsRes.message);
          return;
        }

        const otpRes = await sendOtpMutate(normalizedData.phone);

        if (process.env.EXPO_PUBLIC_USE_MOCK_OTP === "true") {
          showSuccessToast(`Mock OTP: ${process.env.EXPO_PUBLIC_MOCK_OTP}`);
        }
        if (!otpRes?.success) {
          showErrorToast(otpRes?.message || "Failed to send OTP");
          return;
        }

        nextStep();
      } catch (error: any) {
        showErrorToast(
          error?.response?.data?.message ||
            "Something went wrong try again later",
        );
      }
    }

    if (step === 1) {
      try {
        const otpRes = await verifyOtpMutate({
          phoneNumber: profileData.phone,
          otp: data.otp,
        });

        if (
          !otpRes?.success &&
          otpRes?.message !== "OTP verified successfully."
        ) {
          showErrorToast(otpRes?.message || "Invalid OTP");
          return;
        }

        const signupRes = await signupMutate(profileData);
        if (!signupRes?.success) {
          showErrorToast(signupRes?.message || "Signup failed");
          return;
        }

        const loginRes = await loginMutate({
          mobileNumber: profileData.phone,
          password: profileData.password,
        });

        if (!loginRes?.token) {
          showErrorToast("Login failed");
          return;
        }

        await setUserToken(loginRes?.token);
        await setUserId(loginRes?.user);

        router.push(ROUTES.TABS.HOME);
        showSuccessToast("Logged in Successfully");
      } catch (error: any) {
        const backendError =
          error?.response?.data?.[0]?.description ||
          error?.response?.data?.message ||
          "Something went wrong";
        showErrorToast(backendError);
      }
    }
  };

  const handleResendOtp = async () => {
    if (!profileData?.phone) {
      showErrorToast("Phone number not found");
      return;
    }

    try {
      const otpRes = await sendOtpMutate(profileData.phone);

      if (!otpRes?.success) {
        showErrorToast(otpRes?.message || "Failed to resend OTP");
        return;
      }

      showSuccessToast("OTP sent successfully");
    } catch (error: any) {
      showErrorToast(error?.response?.data?.message || "Failed to resend OTP");
    }
  };

  const isLoading =
    isSignupPending || isOtpPending || isUserExistsPending || isSendingOtp;

  return (
    <AuthWrapper mode="register">
      <FormProvider {...methods}>
        <View className="px-4 ">
          {step === 0 && (
            <Heading
              title="Lets sign up"
              subtitle="Create your account to get started"
              // subtitle="Join our trusted platform for safe, effective crop protection."
            />
          )}

          {step === 1 && (
            <OtpHeading
              title="Verify your phone"
              phone={profileData?.phone}
              onResend={handleResendOtp}
              disabled={isSendingOtp}
            />
          )}

          <AnimatedStepWrapper trigger={step}>
            {step === 0 && <ProfileSection control={control} errors={errors} />}
            {step === 1 && <OTPSection control={control} errors={errors} />}
          </AnimatedStepWrapper>

          <View>
            <FormActions
              cancelLabel={step > 0 ? "Back" : undefined}
              onCancel={prevStep}
              submitLabel={step === 1 ? "Signup" : "Next"}
              onSubmit={handleSubmit(onSubmit)}
              disabled={isLoading}
              loading={isLoading}
            />
          </View>
        </View>
      </FormProvider>
    </AuthWrapper>
  );
}
