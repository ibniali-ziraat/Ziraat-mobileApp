// import FormInput from "@/src/components/form/inputs/FormInput";
// import FormActions from "@/src/components/shared/FormActions";
// import Heading from "@/src/components/shared/Heading";
// import { useAuth } from "@/src/contexts/AuthContext";
// import { useLoginMutation } from "@/src/hooks/userQueryHooks";
// import { LoginSchema } from "@/src/schemas/login.schema";
// import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
// import { router } from "expo-router";
// import { View } from "react-native";
// import { Divider } from "react-native-paper";
// import { useZodForm } from "../../../hooks/useZodForm";

// export default function LoginForm() {
//   const { control, handleSubmit, formState } = useZodForm(LoginSchema);
//   const { errors } = formState;

//   // const { setUserToken, setUserData } = useGlobalData();
//   const { setUserToken, setUserId } = useAuth();

//   const { mutateAsync: loginMutate, isPending } = useLoginMutation();

//   const onSubmit = async (data: any) => {
//     // router.push("/");
//     try {
//       const response = await loginMutate({
//         mobileNumber: data.mobileNumber,
//         password: data.password,
//       });
//       console.log(response, "login response");

//       if (response.success) {
//         console.log(response, "response..");

//         await setUserToken(response?.token);
//         await setUserId(response?.user);

//         router.replace("/");
//         showSuccessToast("logged in");
//       }
//     } catch (error: any) {
//       if (error?.response?.status === 401) {
//         showErrorToast("Invalid credentials.");
//       } else {
//         showErrorToast("Something went wrong. Please try again later.");
//       }
//     }
//   };

//   return (
//     <View className="bg-light">
//       <Heading title="Login" subtitle="Enter your credentials below" />

//       <Divider style={{ marginVertical: 10 }} />

//       <FormInput
//         control={control}
//         name="mobileNumber"
//         label="Phone Number"
//         type="phone"
//         error={errors.mobileNumber}
//       />

//       <FormInput
//         control={control}
//         name="password"
//         label="Password"
//         type="password"
//         error={errors.password}
//       />

//       <FormActions
//         submitLabel={"Login"}
//         onSubmit={handleSubmit(onSubmit)}
//         disabled={isPending}
//         loading={isPending}
//       />
//     </View>
//   );
// }

import FormInput from "@/src/components/form/inputs/FormInput";
import { Divider } from "@/src/components/shared/Divider";
import FormActions from "@/src/components/shared/FormActions";
import Heading from "@/src/components/shared/Heading";
import { useAuth } from "@/src/contexts/AuthContext";
import { useLoginMutation } from "@/src/hooks/userQueryHooks";
import { LoginSchema } from "@/src/schemas/login.schema";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useZodForm } from "../../../hooks/useZodForm";

export default function LoginForm() {
  const { control, handleSubmit, formState } = useZodForm(LoginSchema);
  const { errors } = formState;

  const { setUserToken, setUserId } = useAuth();

  const { mutateAsync: loginMutate, isPending } = useLoginMutation();

  const onSubmit = async (data: any) => {
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
        showSuccessToast("logged in");
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
    <View className="bg-light px-4">
      <Heading title="Let's Sign in." subtitle="Welcome back to your account" />

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

      <Pressable className="items-end">
        <Text className="text-sm font-medium text-primary">
          Forgot password?
        </Text>
      </Pressable>

      <View className="mb-3">
        <FormActions
          submitLabel={"Login"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isPending}
          loading={isPending}
        />
      </View>
      <Divider label="or sign in with google" />

      {/* <GoogleAuthButton
        label="Sign in with Google"
        onPress={() => {}}
        disabled={isPending}
      /> */}
    </View>
  );
}
