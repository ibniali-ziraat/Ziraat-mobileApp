import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { colors } from "@/src/constants/colors";

import { showErrorToast, showSuccessToast } from "@/src/utils/toast";

import { useZodForm } from "@/src/hooks/useZodForm";
import { FormProvider } from "react-hook-form";

import { Lock } from "lucide-react-native";
import { Image, Text, View } from "react-native";

import { useSendOtpMutation } from "@/src/hooks/useForgotPassword";
import { VerifyPhoneSchema } from "../schemas/verfiy-phone.schema";

type Props = {
  onNext: (phone: string) => void;
};

export default function VerifyPhone({ onNext }: Props) {

  const methods = useZodForm(VerifyPhoneSchema);
  const { handleSubmit, formState } = methods;
  const { errors } = formState;

  const { mutateAsync: sendOtpMutate, isPending } = useSendOtpMutation();

  const handleSendOtp = async (data: any) => {

    try {

      const res = await sendOtpMutate(data.mobileNumber);

      console.log("OTP RESPONSE", res);

      showSuccessToast("OTP sent successfully");

      onNext(data.mobileNumber);

    } catch (error: any) {

      console.log("OTP ERROR", error?.response);

      showErrorToast(
        error?.response?.data?.message || "Failed to send OTP"
      );

    }

  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Forgot Password"
        desc="Enter your phone number to receive OTP"
      />

      <FormProvider {...methods}>
        <View className="flex-1 justify-center px-2">

          {/* LOGO */}
          <View style={{ alignItems: "center", marginBottom: 15 }}>
            <Image
              source={require("@/assets/images/logo.jpeg")}
              style={{ width: 110, height: 90, resizeMode: "contain" }}
            />

              <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                marginTop: 16,
                color: "#111",
              }}
            >
              Verify your number
            </Text>

            <Text
              style={{
                fontSize: 13,
                color: colors.neutral,
                marginTop: 6,
                textAlign: "center",
            
              }}
            >
              We’ll send a verification code to your phone
            </Text>
          
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

            {/* SECURITY TEXT */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 16,
              }}
            >
              <Lock size={14} color={colors.secondary} />

              <Text
                style={{
                  marginLeft: 6,
                  color: colors.neutral,
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