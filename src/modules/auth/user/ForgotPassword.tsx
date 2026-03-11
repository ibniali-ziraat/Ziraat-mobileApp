
import BackHeader from "@/src/components/shared/BackHeader";
import FormOtpInput from "@/src/components/shared/inputs/FormOtpInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import {
  useOtpVerifyMutation,
  useResetPasswordMutation,
  useSendOtpMutation,
} from "@/src/hooks/userQueryHooks";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { Lock } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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

  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const intervalRef = useRef<any>(null);

  const methods = useForm<ForgotPasswordForm>({
    defaultValues: {
      phoneNumber: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const otpValue = methods.watch("otp");

  const { mutateAsync: sendOtpMutate, isPending: isSendingOtp } =
    useSendOtpMutation();

  const { mutateAsync: verifyOtpMutate, isPending: isOtpPending } =
    useOtpVerifyMutation();

  const { mutateAsync: resetPasswordMutate, isPending: isResetting } =
    useResetPasswordMutation();

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setTimer(60);
    setCanResend(false);

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(intervalRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (step === "otp") startTimer();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [step]);

  const handleSendOtp = async () => {
    const phone = methods.getValues("phoneNumber");

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

  const handleResendOtp = async () => {
    const phone = methods.getValues("phoneNumber");

    try {
      const res = await sendOtpMutate(phone);

      if (!res?.success)
        return showErrorToast(res?.message || "Failed to resend OTP");

      showSuccessToast("OTP resent successfully");
      startTimer();
    } catch {
      showErrorToast("Failed to resend OTP");
    }
  };

  const handleVerifyOtp = async () => {
    const { phoneNumber, otp } = methods.getValues();

    if (!otp) return showErrorToast("OTP is required");

    try {
      await verifyOtpMutate({ phoneNumber, otp });

      showSuccessToast("OTP verified");
      setStep("reset");
    } catch {
      showErrorToast("Invalid OTP");
    }
  };

  const handleResetPassword = async () => {
    const { phoneNumber, password, confirmPassword } = methods.getValues();

    if (!password || !confirmPassword)
      return showErrorToast("All fields required");

    if (password !== confirmPassword)
      return showErrorToast("Passwords do not match");

    try {
      const res = await resetPasswordMutate({ phoneNumber, password });

      if (!res?.success)
        return showErrorToast(res?.message || "Reset failed");

      showSuccessToast("Password updated successfully");

      methods.reset();
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

      <FormProvider {...methods}>
        <ScreenLayout>
          <View className="flex-1 justify-center px-2">

            {/* LOGO */}
            <View style={{ alignItems: "center", marginBottom: 10 }}>
              <Image
                source={require("@/assets/images/logo.jpeg")}
                style={{ width: 115, height: 100, resizeMode: "contain" }}
              />
            </View>

            {/* STEP INDICATOR */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              {["phone", "otp", "reset"].map((s) => (
                <View
                  key={s}
                  style={{
                    height: 6,
                    width: step === s ? 38 : 22,
                    borderRadius: 10,
                    backgroundColor: step === s ? colors.primary : "#E5E7EB",
                    marginHorizontal: 6,
                  }}
                />
              ))}
            </View>

            {/* CARD */}
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
              <View style={{ alignItems: "center", marginBottom: 18 }}>
                <Text
                  style={{
                    fontSize: 22,
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
                  }}
                >
                  {step === "phone"
                    ? "We’ll send a verification code"
                    : step === "otp"
                      ? "Enter the 6 digit code"
                      : "Choose a strong password"}
                </Text>
              </View>

              {/* PHONE STEP */}
              {step === "phone" && (
                <>
                  <FormTextInput
                    name="phoneNumber"
                    label="Phone Number"
                    type="phone"
                    required
                  />

                  <PrimaryButton loading={isSendingOtp} onPress={handleSendOtp}>
                    Send Otp
                  </PrimaryButton>
                </>
              )}

              {/* OTP STEP */}
              {step === "otp" && (
                <>
                  <Text
                    style={[
                      typography.Poppins_s_regular,
                      { marginBottom: 10 },
                    ]}
                  >
                    Please enter the 6-digit OTP sent to your registered
                    mobile number.
                  </Text>

                  <FormOtpInput name="otp" label="Enter OTP" required />

                  {!canResend && !otpValue && (
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        color: colors.neutral,
                      }}
                    >
                      Code expires in {timer}s
                    </Text>
                  )}

                  {otpValue ? (
                    <PrimaryButton
                      loading={isOtpPending}
                      onPress={handleVerifyOtp}
                    >
                      Verify OTP
                    </PrimaryButton>
                  ) : canResend ? (
                    <PrimaryButton
                      loading={isSendingOtp}
                      onPress={handleResendOtp}
                    >
                      Resend OTP
                    </PrimaryButton>
                  ) : (
                    <PrimaryButton
                      loading={isOtpPending}
                      onPress={handleVerifyOtp}
                    >
                      Verify OTP
                    </PrimaryButton>
                  )}
                </>
              )}

              {/* RESET PASSWORD */}
              {step === "reset" && (
                <>
                  <FormTextInput
                    name="password"
                    label="New Password"
                    type="password"
                    required
                  />

                  <FormTextInput
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    required
                  />

                  <PrimaryButton
                    loading={isResetting}
                    onPress={handleResetPassword}
                  >
                    Update Password
                  </PrimaryButton>
                </>
              )}

              {/* SECURITY TEXT */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 16,
                }}
              >
                <Lock size={14} color={colors.secondary} />
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.neutral,
                    marginLeft: 6,
                  }}
                >
                  Your information is secure
                </Text>
              </View>

            </View>
          </View>
        </ScreenLayout>
      </FormProvider>
    </KeyboardAvoidingView>
  );
}

function PrimaryButton({ children, loading, onPress, disabled }: any) {
  return (
    <Pressable
      onPress={!disabled ? onPress : undefined}
      style={{
        backgroundColor: disabled ? "#ccc" : colors.primary,
        paddingVertical: 15,
        borderRadius: 16,
        marginTop: 20,
        shadowColor: colors.primary,
        shadowRadius: 10,
        elevation: 3,
      }}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "700",
            fontSize: 15,
          }}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}

