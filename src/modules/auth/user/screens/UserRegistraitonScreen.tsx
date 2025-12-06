import OTPSection from "@/src/components/form/sections/OTPSection";
import ProfileSection from "@/src/components/form/sections/ProfileSection";
import {
  useLoginMutation,
  useOtpVerifyMutation,
  useProfileMutation,
} from "@/src/hooks/userQueryHooks";

import Button from "@/src/components/ui/Button";
import Loader from "@/src/components/ui/Loader";
import { useGlobalData } from "@/src/contexts/GlobalDataContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import { otpSchema } from "@/src/schemas/shared/otp.schema";
import { profileSchema } from "@/src/schemas/user/profile.schema";
import { showErrorToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function UserRegistrationScreen() {
  const [step, setStep] = useState(0);
  const [profileData, setProfileData] = useState<any>(null);

  const schemas = [profileSchema, otpSchema];
  const methods = useZodForm(schemas[step], { mode: "onChange" });
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
  const { setUserToken, setUserData } = useGlobalData();

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: any) => {
    if (step === 0) {
      setProfileData(data);
      nextStep();
      return;
    }

    if (step === 1) {
      try {
        console.log(profileData, "profileData...");

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

        await setUserToken(loginRes.token);

        setUserData({
          id: loginRes.user,
        });

        router.replace("/");

        Alert.alert("Success", "Registration and login successful.");
      } catch (error: any) {
        const backendError =
          error?.response?.data?.[0]?.description ||
          error?.response?.data?.message ||
          "Something went wrong";

        showErrorToast(backendError);
      }
    }
  };

  const isLoading = isSignupPending || isOtpPending;
  if (isLoading) {
    return <Loader visible={isLoading} />;
  }

  return (
    <View style={{ flex: 1 }}>
      {step === 0 && <ProfileSection control={control} errors={errors} />}
      {step === 1 && <OTPSection control={control} errors={errors} />}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          margin: 20,
        }}
      >
        {step > 0 && (
          <Button title="Back" onPress={prevStep} disabled={isLoading} />
        )}

        <Button
          title={step === 1 ? "Submit" : "Next"}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
      </View>
    </View>
  );
}
