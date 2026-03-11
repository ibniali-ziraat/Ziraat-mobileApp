import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import FormOtpInput from "@/src/components/shared/inputs/FormOtpInput";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";

import { Lock } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Text,
    View
} from "react-native";

import StepIndicator from "../../component/StepIndicator";

const STATIC_OTP = "123456";

export default function VerifyOtp({ onVerified }: any) {

    const methods = useForm({ defaultValues: { otp: "" } });

    const otpValue = methods.watch("otp");

    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [loading, setLoading] = useState(false);

    const intervalRef = useRef<any>(null);

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

        startTimer();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };

    }, []);

    const verify = async () => {

        if (!otpValue || otpValue.length !== 6) {
            showErrorToast("Please enter the 6 digit OTP");
            return;
        }

        setLoading(true);

        setTimeout(() => {

            if (otpValue === STATIC_OTP) {

                showSuccessToast("OTP verified");

                onVerified && onVerified();

            } else {

                showErrorToast("Invalid OTP");

            }

            setLoading(false);

        }, 500);

    };

    const resend = () => {

        showSuccessToast("OTP resent successfully");

        startTimer();

    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.light }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >

            <BackHeader
                title="Forgot Password"
                desc="Recover your account securely"
            />

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


                        <StepIndicator step="otp" />

                        {/* CARD */}
                        <View
                            style={{
                                borderRadius: 30,
                                padding: 26,
                                shadowColor: "#000",
                                shadowOpacity: 0.08,
                                shadowRadius: 20,
                                elevation: 8
                            }}
                        >

                            <View style={{ alignItems: "center", marginBottom: 18 }}>
                                <Text
                                    style={{
                                        fontSize: 22,
                                        fontWeight: "700",
                                        textAlign: "center",
                                        color: colors.dark
                                    }}
                                >
                                    Enter OTP
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: colors.neutral,
                                        textAlign: "center",
                                        marginTop: 4
                                    }}
                                >
                                    Enter the 6 digit code
                                </Text>
                            </View>

                            <Text
                                style={[
                                    typography.Poppins_s_regular,
                                    { marginBottom: 10 }
                                ]}
                            >
                                Enter the 6-digit OTP sent to your registered
                                mobile number.
                            </Text>

                            <FormOtpInput name="otp" label="Enter OTP" required />

                            {!canResend && !otpValue && (
                                <Text
                                    style={{
                                        textAlign: "center",
                                        marginTop: 10,
                                        color: colors.neutral
                                    }}
                                >
                                    Code expires in {timer}s
                                </Text>
                            )}


                            {otpValue ? (

                                <FormActions
                                    submitLabel="Verify OTP"
                                    onSubmit={verify}
                                    loading={loading}
                                    disabled={loading}
                                />

                            ) : canResend ? (

                                <FormActions
                                    submitLabel="Resend OTP"
                                    onSubmit={resend}
                                />

                            ) : (

                                <FormActions
                                    submitLabel="Verify OTP"
                                    onSubmit={verify}
                                    loading={loading}
                                    disabled={loading}
                                />

                            )}


                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 16
                                }}
                            >
                                <Lock size={14} color={colors.secondary} />

                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: colors.neutral,
                                        marginLeft: 6
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