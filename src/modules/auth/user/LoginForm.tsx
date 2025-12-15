import FormInput from "@/src/components/form/inputs/FormInput";
import FormActions from "@/src/components/shared/FormActions";
import Heading from "@/src/components/shared/Heading";
import Loader from "@/src/components/shared/Loader";
import { useAuth } from "@/src/contexts/AuthContext";
import { useLoginMutation } from "@/src/hooks/userQueryHooks";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";
import { useZodForm } from "../../../hooks/useZodForm";
import { LoginSchema } from "../../../schemas/shared/login.schema";

export default function LoginForm() {
  const { control, handleSubmit, formState } = useZodForm(LoginSchema);
  const { errors } = formState;

  const { setUserToken, setUserId } = useAuth();

  const { mutateAsync: loginMutate } = useLoginMutation();
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (data: any) => {
    setIsPending(true);
    // router.push("/");
    try {
      const response = await loginMutate({
        mobileNumber: data.mobileNumber,
        password: data.password,
      });
      console.log(response, "login response");

      if (response.success) {
        console.log(response, "response..");

        await setUserToken(response?.token);
        await setUserId(response?.user);

        router.replace("/");
        setIsPending(false);
        showSuccessToast("logged in");
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        setIsPending(false);
        showErrorToast("Invalid credentials.");
      } else {
        showErrorToast("Something went wrong. Please try again later.");
      }
    }
  };

  if (isPending) return <Loader />;

  return (
    <View className="bg-light">
      <Heading title="Login" subtitle="Enter your credentials below" />

      <Divider style={{ marginVertical: 10 }} />

      <FormInput
        control={control}
        name="mobileNumber"
        label="Phone Number"
        type="phone"
        error={errors.mobileNumber}
      />

      <FormInput
        control={control}
        name="password"
        label="Password"
        type="password"
        error={errors.password}
      />

      <FormActions
        submitLabel={"Login"}
        onSubmit={handleSubmit(onSubmit)}
        disabled={isPending}
        loading={isPending}
      />
    </View>
  );
}
