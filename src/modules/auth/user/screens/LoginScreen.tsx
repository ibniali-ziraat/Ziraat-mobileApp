import { Divider } from "@/src/components/shared/Divider";
import FormActions from "@/src/components/shared/FormActions";
import Heading from "@/src/components/shared/Heading";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useLoginMutation } from "@/src/hooks/userQueryHooks";
import { LoginSchema } from "@/src/schemas/login.schema";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { FormProvider } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { useZodForm } from "../../../../hooks/useZodForm";
import { GoogleAuthButton } from "../../components/GoogleAuthButton";
import AuthWrapper from "../component/AuthWrapper";

export default function LoginScreen() {
  const methods = useZodForm(LoginSchema);
  const { control, handleSubmit, formState } = methods;
  const { errors } = formState;

  const { setUserToken, setUserId } = useAuth();
  const { mutateAsync: loginMutate, isPending } = useLoginMutation();

  const onSubmit = async (data: any) => {
    try {
      const response = await loginMutate({
        mobileNumber: data.mobileNumber,
        password: data.password,
      });

      if (response?.success) {
        await setUserToken(response.token);
        await setUserId(response.user);
        router.replace(ROUTES.TABS.HOME);
        showSuccessToast("Logged in successfully");
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        showErrorToast("Invalid credentials.");
      } else {
        showErrorToast("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <AuthWrapper mode="login">
      <FormProvider {...methods}>
        <View className="bg-light px-4">
          <Heading
            title="Let's Sign in."
            subtitle="Welcome back to your account"
          />

          <FormTextInput
            name="mobileNumber"
            label="Phone Number"
            type="phone"
            placeholder="Phone Number"
            error={errors.mobileNumber}
            required
          />

          <FormTextInput
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            error={errors.password}
            required
          />

          <Pressable
            className="items-end mt-2"
            onPress={() => router.push(ROUTES.ACCOUNT.FORGOT_PASSWORD)}
          >
            <Text className="text-primary" style={typography.Poppins_s_regular}>
              Forgot password?
            </Text>
          </Pressable>

          <View className="mb-3 mt-4">
            <FormActions
              submitLabel="Login"
              onSubmit={handleSubmit(onSubmit)}
              disabled={isPending}
              loading={isPending}
            />
          </View>

          <Divider label="or sign in with google" />

          <GoogleAuthButton
            label="Sign in with Google"
            onPress={() => { }}
            disabled={isPending}
          />
        </View>
      </FormProvider>
    </AuthWrapper>
  );
}
