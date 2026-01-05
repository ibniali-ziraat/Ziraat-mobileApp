import FormInput from "@/src/components/form/inputs/FormInput";
import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { typography } from "@/src/constants/fonts/typography";
import { useOtpVerifyMutation, useSendOtpMutation } from "@/src/hooks/userQueryHooks";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Pressable, Text, View } from "react-native";

type ForgotPasswordForm = {
  phoneNumber: string;
  otp: string;
  password: string;
  confirmPassword: string;
};

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState<"phone" | "otp" | "reset">("phone");

  const { control, getValues, reset } = useForm<ForgotPasswordForm>({
    defaultValues: {
      phoneNumber: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });


    const { mutateAsync: sendOtpMutate, isPending: isSendingOtp } =
      useSendOtpMutation();

         const { mutateAsync: verifyOtpMutate, isPending: isOtpPending } =
          useOtpVerifyMutation();

  /* -------------------- HANDLERS -------------------- */

  const handleSendOtp = async () => {
    const phone = getValues("phoneNumber");

    if (!phone) {
      showErrorToast("Phone number is required");
      return;
    }

    try {

            const otpRes = await sendOtpMutate(phone);
              if (!otpRes?.success) {
                showErrorToast(otpRes?.message || "Failed to send OTP");
                return;
              }

              console.log(otpRes,"otpres....");
              
      showSuccessToast("OTP sent successfully");
      setStep("otp");
    } catch {
      showErrorToast("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    const { phoneNumber, otp } = getValues();

    if (!otp) {
      showErrorToast("OTP is required");
      return;
    }

    try {

    
      await verifyOtpMutate({ phoneNumber, otp });
      showSuccessToast("OTP verified");
      setStep("reset");
    } catch {
      showErrorToast("Invalid OTP");
    }
  };

  // const handleResetPassword = async () => {
  //   const { phoneNumber, password, confirmPassword } = getValues();

  //   if (!password || !confirmPassword) {
  //     showErrorToast("All fields are required");
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     showErrorToast("Passwords do not match");
  //     return;
  //   }

  //   try {
  //     await resetPassword({ phoneNumber, password });
  //     showSuccessToast("Password changed successfully");
  //     reset();
  //     router.replace("/login");
  //   } catch {
  //     showErrorToast("Failed to reset password");
  //   }
  // };

  /* -------------------- UI -------------------- */

  return (
    <View className="flex-1 bg-light">
      <BackHeader
        title="Forgot Password"
        desc="Recover your account securely"
      />

      <ScreenLayout>
        <View className="flex-1 justify-center">
          {/* LOGO */}
          <View
            style={{
              alignItems: "center",
              marginBottom: 40,
              marginTop: -150,
            }}
          >
            <Image
              source={require("@/assets/images/logo.jpeg")}
              style={{ width: 180, height: 170, resizeMode: "contain" }}
            />
          </View>

          {/* CARD */}
          <ZiraatCard width="100%" paddingHorizontal={1} paddingVertical={2}>
            {/* PHONE STEP */}
            {step === "phone" && (
              <>
                <Text
                  className="mb-3"
                  style={typography.Poppins_s_regular}
                >
                  Enter your registered phone number. For your security,
                  we’ll send a one-time password (OTP) to this number.
                </Text>

                <FormInput
                  control={control}
                  name="phoneNumber"
                  label="Phone Number"
                  type="phone"
                />

                <Pressable
                  className="bg-primary py-3 rounded-xl mt-4"
                  onPress={handleSendOtp}
                >
                  <Text
                    className="text-light text-center"
                    style={typography.Poppins_m_medium}
                  >
                    Send OTP
                  </Text>
                </Pressable>
              </>
            )}

            {/* OTP STEP */}
            {step === "otp" && (
              <>
                <Text
                  className="mb-3"
                  style={typography.Poppins_s_regular}
                >
                  Please enter the 6-digit OTP sent to your registered
                  mobile number to continue.
                </Text>

                <FormInput
                  control={control}
                  name="otp"
                  label="OTP"
                  keyboardType="numeric"
                />

                <Pressable
                  className="bg-primary py-3 rounded-xl mt-4"
                  onPress={handleVerifyOtp}
                >
                  <Text
                    className="text-light text-center"
                    style={typography.Poppins_m_medium}
                  >
                    Verify OTP
                  </Text>
                </Pressable>
              </>
            )}

            {/* RESET PASSWORD STEP */}
            {step === "reset" && (
              <>
                <Text
                  className="mb-3"
                  style={typography.Poppins_s_regular}
                >
                  Create a new password for your account. Make sure it’s
                  strong and easy for you to remember.
                </Text>

                <FormInput
                  control={control}
                  name="password"
                  label="New Password"
                  type="password"
                />

                <FormInput
                  control={control}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                />

                <Pressable
                  className="bg-primary py-3 rounded-xl mt-4"
                  onPress={()=>{}}
                >
                  <Text
                    className="text-light text-center"
                    style={typography.Poppins_m_medium}
                  >
                    Submit
                  </Text>
                </Pressable>
              </>
            )}
          </ZiraatCard>
        </View>
      </ScreenLayout>
    </View>
  );
}
