import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import FormOtpInput from "@/src/components/shared/inputs/FormOtpInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { colors } from "@/src/constants/colors";
import { showErrorToast } from "@/src/utils/toast";

import { useZodForm } from "@/src/hooks/useZodForm";
import { router } from "expo-router";
import { CheckCircle, Lock } from "lucide-react-native";
import { FormProvider } from "react-hook-form";
import { Image, Text, View } from "react-native";

import {
    useResetPasswordMutation,
    useSendOtpMutation,
} from "@/src/hooks/useForgotPassword";

import { ResetPasswordSchema } from "../schemas/newPassword.schema";

import { useEffect, useState } from "react";

type FormType = {
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

export default function VerifyOtpReset({ phoneNumber }: any) {

  const methods = useZodForm(ResetPasswordSchema);
  const { handleSubmit, formState } = methods;
  const { errors } = formState;

  const { mutateAsync: resetPasswordMutate, isPending } =
    useResetPasswordMutation();

  const { mutateAsync: resendOtpMutate } =
    useSendOtpMutation();

  const [timer, setTimer] = useState(60);
  const [successVisible, setSuccessVisible] = useState(false);



useEffect(() => {
  if (!phoneNumber) {
    router.replace("/"); 
  }
}, []);


  // countdown
  useEffect(() => {

    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);

  // RESET PASSWORD
  const resetPassword = async (data: FormType) => {

    try {

      const payload = {
        phoneNumber,
        otp: data.otp,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      };

      await resetPasswordMutate(payload);

      // Show success modal
      setSuccessVisible(true);

    } catch (error: any) {
        console.log(error,"errrrrrrr");
        

      showErrorToast(
        error?.response?.data?.error || "Failed to reset password"
      );

    }

  };

  // RESEND OTP
  const handleResendOtp = async () => {

    try {

      await resendOtpMutate(phoneNumber);

      setTimer(60);

} catch(error) {
    console.log(error,"error in vefiry otp");
    

      showErrorToast(error.response.data.message||"Failed to resend OTP");

    }

  };

  return (
    <ScreenLayout>

      <BackHeader
        title="Forgot Password"
        desc="Recover your account securely"
      />

      <FormProvider {...methods}>

        <View className="flex-1 justify-center px-2">

          {/* LOGO */}
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <Image
              source={require("@/assets/images/logo.jpeg")}
              style={{ width: 115, height: 100, resizeMode: "contain" }}
            />
                <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 10 }}>
              Enter Verification Code
            </Text>

            <Text
              style={{
                fontSize: 13,
                color: colors.neutral,
                marginTop: 4,
              }}
            >
              Sent to +91 {phoneNumber}
            </Text>
          </View>

          

          <View
            style={{
              borderRadius: 30,
              padding: 26,
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 20,
              elevation: 8,
            }}
          >

            {/* OTP */}
            <FormOtpInput name="otp" label="OTP Code" required />



            {/* NEW PASSWORD */}
            <FormTextInput
              name="newPassword"
              label="New Password"
              type="password"
              error={errors.newPassword}
              required
            />

            {/* CONFIRM PASSWORD */}
            <FormTextInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              error={errors.confirmPassword}
              required
            />

           {/* TIMER */}
<View style={{ alignItems: "center", marginTop: 7,   }}>
  <Text style={{ color: colors.error}}>
    {timer > 0
      ? `Code expires in ${timer}s`
      : "OTP expired"}
  </Text>
</View>
           {/* VERIFY / RESEND BUTTON */}
<View style={{ marginTop: 16 }}>

  {timer > 0 ? (
    <FormActions
      submitLabel="Verify OTP"
      onSubmit={handleSubmit(resetPassword)}
      loading={isPending}
      disabled={isPending}
    />
  ) : (
    <FormActions
      submitLabel="Resend OTP"
      onSubmit={handleResendOtp}
    />
  )}

</View>

            {/* SECURITY */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 16,
              }}
            >
              <Lock size={14} color={colors.secondary} />
              <Text style={{ marginLeft: 6 }}>
                Your information is secure
              </Text>
            </View>
          </View>

        </View>

      </FormProvider>

     {/* SUCCESS MODAL */}
{successVisible && (

  <View
    style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    }}
  >

    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 30,
        width: "90%",
        alignItems: "center",
      }}
    >

      {/* ICON */}
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#E8F5E9",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <CheckCircle size={34} color="#2E7D32" />
      </View>

      {/* TITLE */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 8,
        }}
      >
        Password Updated
      </Text>

      {/* MESSAGE */}
      <Text
        style={{
          textAlign: "center",
          color: "#666",
          marginBottom: 20,
        }}
      >
        Your password has been changed successfully.
        Please login again.
      </Text>

      <FormActions
  submitLabel="Go to Login"
  onSubmit={() => router.replace("/auth")}
/>

    </View>

  </View>

)}

    </ScreenLayout>
  );
}