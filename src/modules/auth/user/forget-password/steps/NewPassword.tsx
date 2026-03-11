import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { colors } from "@/src/constants/colors";
import { useResetPasswordMutation } from "@/src/hooks/userQueryHooks";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";

import { useZodForm } from "@/src/hooks/useZodForm";
import { router } from "expo-router";
import { Lock } from "lucide-react-native";
import { FormProvider } from "react-hook-form";
import { Image, Text, View } from "react-native";

import StepIndicator from "../../component/StepIndicator";
import { NewPasswordSchema } from "../schemas/newPassword.schema";

type FormType = {
    password: string;
    confirmPassword: string;
};

export default function NewPassword({ phoneNumber }: any) {
    const methods = useZodForm(NewPasswordSchema);

    const { handleSubmit, formState } = methods;
    const { errors } = formState;

    const { mutateAsync: resetPasswordMutate, isPending } =
        useResetPasswordMutation();

    const resetPassword = async (data: FormType) => {
        try {
            const res = await resetPasswordMutate({
                phoneNumber,
                password: data.password,
            });

            if (!res?.success) {
                return showErrorToast(res?.message || "Reset failed");
            }

            showSuccessToast("Password updated successfully");

            router.replace("/login");
        } catch {
            showErrorToast("Failed to reset password");
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
                    </View>


                    <StepIndicator step="reset" />

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
                        <FormTextInput
                            name="password"
                            label="New Password"
                            type="password"
                            error={errors.password}
                            required
                        />

                        <FormTextInput
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            error={errors.confirmPassword}
                            required
                        />


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


                        <FormActions
                            submitLabel="Reset Password"
                            onSubmit={handleSubmit(resetPassword)}
                            loading={isPending}
                            disabled={isPending}
                        />
                    </View>
                </View>
            </FormProvider>
        </ScreenLayout>
    );
}