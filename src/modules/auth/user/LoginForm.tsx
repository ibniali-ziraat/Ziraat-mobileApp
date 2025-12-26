import FormInput from "@/src/components/form/inputs/FormInput";
import FormActions from "@/src/components/shared/FormActions";
import Heading from "@/src/components/shared/Heading";
import { useAuth } from "@/src/contexts/AuthContext";
import { useLoginMutation } from "@/src/hooks/userQueryHooks";
import { LoginSchema } from "@/src/schemas/login.schema";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { View } from "react-native";
import { Divider } from "react-native-paper";
import { useZodForm } from "../../../hooks/useZodForm";

export default function LoginForm() {
  const { control, handleSubmit, formState } = useZodForm(LoginSchema);
  const { errors } = formState;

  // const { setUserToken, setUserData } = useGlobalData();
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

// import FormInput from "@/src/components/form/inputs/FormInput";
// import FormActions from "@/src/components/shared/FormActions";
// import Heading from "@/src/components/shared/Heading";
// import Loader from "@/src/components/shared/Loader";
// import { colors } from "@/src/constants/colors";
// import { useAuth } from "@/src/contexts/AuthContext";
// import { useLoginMutation } from "@/src/hooks/userQueryHooks";
// import { LoginSchema } from "@/src/schemas/login.schema";
// import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
// import { LinearGradient } from "expo-linear-gradient";
// import { router } from "expo-router";
// import { useEffect, useRef, useState } from "react";
// import { Animated, Image, Pressable, Text, View } from "react-native";
// import { useZodForm } from "../../../hooks/useZodForm";

// export default function LoginForm() {
//   const { control, handleSubmit, formState } = useZodForm(LoginSchema);
//   const { errors } = formState;

//   const { setUserToken, setUserId, setUserTokenExp } = useAuth();
//   const { mutateAsync: loginMutate } = useLoginMutation();
//   const [isPending, setIsPending] = useState(false);

//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(20)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 400,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 400,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   const onSubmit = async (data: any) => {
//     setIsPending(true);
//     try {
//       const response = await loginMutate({
//         mobileNumber: data.mobileNumber,
//         password: data.password,
//       });

//       if (response.success) {
//         await setUserToken(response?.token);
//         await setUserTokenExp(response.tokenExpiry);
//         await setUserId(response?.user);

//         router.replace("/");
//         setIsPending(false);
//         showSuccessToast("logged in");
//       }
//     } catch (error: any) {
//       if (error?.response?.status === 401) {
//         setIsPending(false);
//         showErrorToast("Invalid credentials.");
//       } else {
//         showErrorToast("Something went wrong. Please try again later.");
//       }
//     }
//   };

//   if (isPending) return <Loader />;

//   return (
//     <View className="flex-1 justify-center px-4">
//       <Animated.View
//         style={{
//           opacity: fadeAnim,
//           transform: [{ translateY: slideAnim }],
//         }}
//       >
//         <Heading
//           title="Let's Sign in."
//           subtitle="Welcome back to your account"

//         />

//        {/* Login Inputs */}
// {/* Login Inputs */}
// <View
//   style={{
//     marginTop: 16,
//     marginBottom: 12,
//     borderRadius: 20,
//     padding: 1.5,

//   }}
// >
//   <View
//     style={{
//       borderRadius: 18,

//       shadowColor: "#000",
//       shadowOpacity: 0.04,
//       shadowRadius: 10,
//       shadowOffset: { width: 0, height: 4 },
//       elevation: 2,
//     }}
//   >
//     <FormInput
//       control={control}
//       name="mobileNumber"
//       label="Phone Number"
//       type="phone"
//       error={errors.mobileNumber}
//     />

//     <FormInput
//       control={control}
//       name="password"
//       label="Password"
//       type="password"
//       error={errors.password}
//     />
//   </View>
//    <Pressable className="items-end ">
//           <Text
//             className="text-sm font-medium"
//             style={{ color: colors.primary }}
//           >
//             Forgot password?
//           </Text>
//         </Pressable>
// </View>

//         {/* Login Button */}
//         <View className=" mb-3">

//           <FormActions

//             submitLabel={"Login"}
//             onSubmit={handleSubmit(onSubmit)}
//             disabled={isPending}
//             loading={isPending}

//           />
//         </View>

//         {/* OR Divider */}
//         <View className="flex-row items-center my-4">
//           <View className="flex-1 h-[1px] bg-gray-300" />
//           <Text className="mx-3 text-sm text-gray-500">or sign in with google</Text>
//           <View className="flex-1 h-[1px] bg-gray-300" />
//         </View>

//        {/* Login with Google (UI only) */}
// <LinearGradient
//   colors={["#4285F4", "#DB4437", "#F4B400", "#0F9D58"]}
//   start={{ x: 0, y: 0 }}
//   end={{ x: 1, y: 1 }}
//   style={{
//     borderRadius: 12,
//     padding: 1.5,
//     marginTop:"6",
//      marginBottom:"8",
//   }}
// >
//   <Pressable
//     style={{
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "center",
//       paddingVertical: 12,
//       borderRadius: 10,
//       backgroundColor: "#fff",

//     }}
//   >
//     <Image
//       source={require("@/assets/images/google-logo.png")}
//       style={{ width: 20, height: 20, marginRight: 10 }}
//     />
//     <Text
//       style={{
//         fontSize: 15,
//         fontWeight: "700",
//         color: "#111827",

//       }}
//     >
//       Google
//     </Text>
//   </Pressable>
// </LinearGradient>

//       </Animated.View>
//     </View>
//   );
// }
