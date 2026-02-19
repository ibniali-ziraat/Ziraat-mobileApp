import FormInput from "@/src/components/form/inputs/FormInput";
import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import {
  useOtpVerifyMutation,
  useResetPasswordMutation,
  useSendOtpMutation,
} from "@/src/hooks/userQueryHooks";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

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

  const { mutateAsync: resetPasswordMutate, isPending: isResetting } =
    useResetPasswordMutation();

  /* SEND OTP */
  const handleSendOtp = async () => {
    const phone = getValues("phoneNumber");
    if (!phone) return showErrorToast("Phone number is required");

    try {
      const res = await sendOtpMutate(phone);
      if (!res?.success)
        return showErrorToast(res?.message || "Failed to send OTP");

      showSuccessToast("OTP sent successfully");
      setStep("otp");
    } catch {
      showErrorToast("Failed to send OTP");
    }
  };

  /* VERIFY OTP */
  const handleVerifyOtp = async () => {
    const { phoneNumber, otp } = getValues();
    if (!otp) return showErrorToast("OTP is required");

    try {
      await verifyOtpMutate({ phoneNumber, otp });
      showSuccessToast("OTP verified");
      setStep("reset");
    } catch {
      showErrorToast("Invalid OTP");
    }
  };

  /* RESET PASSWORD */
  const handleResetPassword = async () => {
    const { phoneNumber, password, confirmPassword } = getValues();

    if (!password || !confirmPassword)
      return showErrorToast("All fields required");

    if (password !== confirmPassword)
      return showErrorToast("Passwords do not match");

    try {
      const res = await resetPasswordMutate({ phoneNumber, password });

      if (!res?.success)
        return showErrorToast(res?.message || "Reset failed");

      showSuccessToast("Password updated successfully");
      reset();
      router.replace("/login");
    } catch {
      showErrorToast("Failed to reset password");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.light }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <BackHeader title="Forgot Password" desc="Recover your account securely" />

      <ScreenLayout>
        <View className="flex-1 justify-center px-5">

          {/* LOGO */}
          <View className="items-center mb-6">
            <Image
              source={require("@/assets/images/logo.jpeg")}
              style={{ width: 110, height: 100, resizeMode: "contain" }}
            />
          </View>

          {/* STEP INDICATOR */}
          <View className="flex-row justify-center mb-5 space-x-2">
            {["phone", "otp", "reset"].map((s) => (
              <View
                key={s}
                className="h-1 w-10 rounded-full"
                style={{
                  backgroundColor:
                    step === s ? colors.primary : colors.cardShadow,
                  opacity: step === s ? 1 : 0.4,
                }}
              />
            ))}
          </View>

          {/* CARD */}
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 26,
              padding: 24,
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 20,
              elevation: 6,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                textAlign: "center",
                color: colors.dark,
              }}
            >
              {step === "phone"
                ? "Verify Phone"
                : step === "otp"
                ? "Enter OTP"
                : "Reset Password"}
            </Text>

            <Text
              style={{
                fontSize: 13,
                color: colors.neutral,
                textAlign: "center",
                marginTop: 4,
                marginBottom: 16,
              }}
            >
              {step === "phone"
                ? "We’ll send a verification code"
                : step === "otp"
                ? "Enter the 6 digit code"
                : "Choose a strong password"}
            </Text>

            {step === "phone" && (
              <>
                <FormInput control={control} name="phoneNumber" label="Phone" />
                <PrimaryButton loading={isSendingOtp} onPress={handleSendOtp}>
                  Continue
                </PrimaryButton>
              </>
            )}

            {step === "otp" && (
              <>
                <FormInput control={control} name="otp" label="OTP" />
                <PrimaryButton loading={isOtpPending} onPress={handleVerifyOtp}>
                  Verify OTP
                </PrimaryButton>
              </>
            )}

            {step === "reset" && (
              <>
                <FormInput
                  control={control}
                  name="password"
                  label="New Password"
                  type="password"
                />

                <View className="mt-4">
                  <FormInput
                    control={control}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                  />
                </View>

                <PrimaryButton loading={isResetting} onPress={handleResetPassword}>
                  Update Password
                </PrimaryButton>
              </>
            )}

            <Text
              style={{
                fontSize: 11,
                color: colors.neutral,
                textAlign: "center",
                marginTop: 18,
              }}
            >
              🔒 Your information is secure
            </Text>
          </View>
        </View>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}

/* PRIMARY BUTTON */
function PrimaryButton({ children, loading, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 14,
        marginTop: 20,
      }}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "700" }}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}
