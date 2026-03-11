import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { colors } from "@/src/constants/colors";
import { useSendOtpMutation } from "@/src/hooks/userQueryHooks";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";

import { Lock } from "lucide-react-native";
import { FormProvider } from "react-hook-form";
import {
    Image,
    Text,
    View
} from "react-native";

import StepIndicator from "../../component/StepIndicator";

import { useZodForm } from "@/src/hooks/useZodForm";
import { VerifyPhoneSchema } from "../schemas/verfiy-phone.schema";

export default function VerifyPhone({ onNext }: any) {

    const methods = useZodForm(VerifyPhoneSchema);
    const { handleSubmit, formState } = methods;
    const { errors } = formState;

    const { mutateAsync: sendOtpMutate, isPending } = useSendOtpMutation();

    const handleSendOtp = async (data: any) => {

        try {

            const res = await sendOtpMutate(data.mobileNumber);

            if (!res?.success)
                return showErrorToast(res?.message || "Failed to send OTP");

            showSuccessToast("OTP sent successfully");

            onNext(data.mobileNumber);

        } catch {
            showErrorToast("Failed to send OTP");
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
                    <View style={{ alignItems: "center", marginBottom: 15 }}>
                        <Image
                            source={require("@/assets/images/logo.jpeg")}
                            style={{ width: 115, height: 80, resizeMode: "contain" }}
                        />
                    </View>

                    <StepIndicator step="phone" />

                    {/* CARD */}
                    <View
                        style={{
                            borderRadius: 30,
                            padding: 26
                        }}
                    >

                        <FormTextInput
                            name="mobileNumber"
                            label="Phone Number"
                            type="phone"
                            required
                            error={errors.mobileNumber}
                        />


                        <FormActions
                            submitLabel="Send OTP"
                            onSubmit={handleSubmit(handleSendOtp)}
                            loading={isPending}
                            disabled={isPending}
                        />


                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 16
                            }}
                        >
                            <Lock size={14} color={colors.secondary} />

                            <Text
                                style={{
                                    marginLeft: 6,
                                    color: colors.neutral
                                }}
                            >
                                Your information is secure
                            </Text>
                        </View>

                    </View>

                </View>

            </FormProvider>

        </ScreenLayout>
    );
}