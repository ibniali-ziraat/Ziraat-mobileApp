import OTPSection from "@/src/modules/auth/user/sections/OTPSection";
import ProfileSection from "@/src/modules/auth/user/sections/ProfileSection";
import {
  useCheckUserExists,
  useLoginMutation,
  useOtpVerifyMutation,
  useProfileMutation,
  useSendOtpMutation,
} from "@/src/hooks/userQueryHooks";

import FormActions from "@/src/components/shared/FormActions";
import Button from "@/src/components/ui/Button";

import { useGlobalData } from "@/src/contexts/GlobalDataContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import { otpSchema } from "@/src/schemas/shared/otp.schema";
import { profileSchema } from "@/src/schemas/user/profile.schema";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import Heading from "@/src/components/shared/Heading";
import Loader from "@/src/components/shared/Loader";
import { ROUTES } from "@/src/constants/routes";
import OtpHeading from "@/src/components/shared/OtpHeading";
import AnimatedStepWrapper from "@/src/components/shared/AnimatedStepWrapper";
import { useAuth } from "@/src/contexts/AuthContext";

export default function UserRegistrationScreen() {
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
        setProfileData(data);

        const existsRes = await verifyUserExists({
          phone: data.phone,
          email: data.email,
        });

        console.log(existsRes, "existsres.");

        if (existsRes?.success === false) {
          showErrorToast(existsRes.message);
          return;
        }

        // 3. Send OTP if user doesn't exist
        const otpRes = await sendOtpMutate(data.phone);
        if (!otpRes?.success) {
          showErrorToast(otpRes?.message || "Failed to send OTP");
          return;
        }

        // 4. Move to OTP step
        nextStep();
      } catch (error) {
        console.log(error, "error");

        showErrorToast(
          error.response.data.message || "Something went wrong try again later"
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

        router.push(ROUTES.USER.HOME);
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

  const isLoading = isSignupPending || isOtpPending || isUserExistsPending;
  if (isLoading) {
    return <Loader />;
  }

  return (
    <View>
      {step === 0 && (
        <Heading
          title="Sign Up"
          subtitle="Create your account to get started"
        />
      )}

      {step === 1 && (
        <OtpHeading
          title="Verify your phone"
          phone={profileData?.phone}
          onResend={handleResendOtp}
        />
      )}

      <AnimatedStepWrapper trigger={step}>
        {step === 0 && <ProfileSection control={control} errors={errors} />}
        {step === 1 && <OTPSection control={control} errors={errors} />}
      </AnimatedStepWrapper>

      <View>
        {/* {step > 0 && (
          <Button title="Back" onPress={prevStep} disabled={isLoading} />
        )} */}

        <FormActions
          cancelLabel={step > 0 ? "Back" : undefined}
          onCancel={prevStep}
          submitLabel={step === 1 ? "Signup" : "Next"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isLoading}
          loading={isUserExistsPending}
        />
      </View>
    </View>
  );
}
