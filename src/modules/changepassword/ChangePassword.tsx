import BackHeader from "@/src/components/shared/BackHeader";
import { colors } from "@/src/constants/colors";
import { useChangeCurrentPassword } from "@/src/hooks/useChangeCurrentPassword";
import { router } from "expo-router";
import { ShieldCheck } from "lucide-react-native";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { Text, View } from "react-native";

import FormActions from "@/src/components/shared/FormActions";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import { useZodForm } from "@/src/hooks/useZodForm";
import { ChangePasswordSchema } from "@/src/schemas/password.schema";

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordScreen() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const methods = useZodForm(ChangePasswordSchema);

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const changePassword = useChangeCurrentPassword();

  const onSubmit = async (values: FormValues) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await changePassword.mutateAsync(values);

      reset();
      setSuccessMessage("Password changed successfully");

      setTimeout(() => {
        router.replace(ROUTES.MORE.SETTINGS);
      }, 800);
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || "Incorrect Old Password");
    }
  };

  return (
    <ScreenLayout>
      <BackHeader title="Change Password" desc="Security Settings" />
      <ScreenContent>
        <FormProvider {...methods}>
          <View className="items-center mb-6">
            <View className="bg-primary/10 p-4 rounded-full">
              <ShieldCheck size={28} color={colors.primary} />
            </View>

            <Text className="mt-2 text-lg font-semibold">
              Change your current Password
            </Text>

            <Text style={{ color: colors.darkHover }} className="text-sm mt-1">
              Keep your account secure & safe
            </Text>
          </View>

          {successMessage ? (
            <Text className="text-green-600 mb-3 text-center">
              {successMessage}
            </Text>
          ) : null}

          {errorMessage ? (
            <Text className="text-red-500 mb-3 text-center">
              {errorMessage}
            </Text>
          ) : null}

          <FormTextInput
            name="oldPassword"
            label="Current Password"
            type="password"
            error={errors?.oldPassword}
          />

          <FormTextInput
            name="newPassword"
            label="New Password"
            type="password"
            error={errors?.newPassword}
          />

          <FormTextInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            error={errors?.confirmPassword}
          />

          <FormActions
            submitLabel="Update"
            onSubmit={handleSubmit(onSubmit)}
            disabled={changePassword.isPending}
            loading={changePassword.isPending}
            cancelLabel="Cancel"
            onCancel={() => router.back()}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
