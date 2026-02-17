// import { Eye, EyeOff, ShieldCheck } from "lucide-react-native";
// import { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import {
//   ActivityIndicator,
//   Animated,
//   Modal,
//   Pressable,
//   View,
// } from "react-native";
// import Toast from "react-native-toast-message";

// import FormInput from "@/src/components/form/inputs/FormInput";
// import BackHeader from "@/src/components/shared/BackHeader";
// import CsText from "@/src/components/shared/CsText";
// import { colors } from "@/src/constants/colors";
// import { useChangeCurrentPassword } from "@/src/hooks/useChangeCurrentPassword";

// type FormValues = {
//   oldPassword: string;
//   newPassword: string;
//   confirmPassword: string;
// };

// export default function ChangePasswordScreen() {
//   const [showOld, setShowOld] = useState(false);
//   const [showNew, setShowNew] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalText, setModalText] = useState("");

//   const fade = useRef(new Animated.Value(0)).current;

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FormValues>();

//   const changePassword = useChangeCurrentPassword();

//   useEffect(() => {
//     Animated.timing(fade, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const showPopup = (msg: string) => {
//     setModalText(msg);
//     setModalVisible(true);
//   };

//   const onSubmit = async (values: FormValues) => {
//     // Frontend validation
//     if (values.newPassword !== values.confirmPassword) {
//       return showPopup("Passwords do not match");
//     }

//     if (values.oldPassword === values.newPassword) {
//       return showPopup("New password must be different");
//     }

//     try {
//       await changePassword.mutateAsync({
//         oldPassword: values.oldPassword,
//         newPassword: values.newPassword,
//         confirmPassword: values.confirmPassword,
//       });

//       reset();

// Toast.show({
//   type: "success",
//   text1: "Password Changed",
//   text2: "Your password has been updated successfully",
//   position: "bottom",
// });

// showPopup("Password updated successfully");

//     } catch (err: any) {
//       showPopup(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: colors.light }}>
//       <View className="flex-1 px-4">
//         <BackHeader title="Change Password" desc="Security Settings" />

//         <Animated.View style={{ opacity: fade }} className="rounded-3xl p-5 mt-4">
//           <View className="items-center mb-6">
//             <View className="bg-primary/10 p-4 rounded-full">
//               <ShieldCheck size={28} color={colors.primary} />
//             </View>

//             <CsText className="mt-2 text-lg font-semibold">
//               Change Password
//             </CsText>

//             <CsText style={{ color: colors.darkHover }} className="text-xs mt-1">
//               Keep your account secure
//             </CsText>
//           </View>

//           <FormInput
//             control={control}
//             name="oldPassword"
//             label="Current Password"
//             rules={{ required: "Current password is required" }}
//             type={showOld ? "text" : "password"}
//             error={errors?.oldPassword}
//             rightIcon={
//               <Pressable onPress={() => setShowOld(!showOld)}>
//                 {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
//               </Pressable>
//             }
//           />

//           <FormInput
//             control={control}
//             name="newPassword"
//             label="New Password"
//             rules={{ required: "New password is required" }}
//             type={showNew ? "text" : "password"}
//             error={errors?.newPassword}
//             rightIcon={
//               <Pressable onPress={() => setShowNew(!showNew)}>
//                 {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
//               </Pressable>
//             }
//           />

//           <FormInput
//             control={control}
//             name="confirmPassword"
//             label="Confirm Password"
//             rules={{ required: "Confirm password is required" }}
//             type={showConfirm ? "text" : "password"}
//             error={errors?.confirmPassword}
//             rightIcon={
//               <Pressable onPress={() => setShowConfirm(!showConfirm)}>
//                 {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
//               </Pressable>
//             }
//           />

//           <Pressable
//             onPress={handleSubmit(onSubmit)}
//             disabled={changePassword.isPending}
//             className="mt-4 py-4 rounded-2xl items-center"
//             style={{
//               backgroundColor: colors.primary,
//               opacity: changePassword.isPending ? 0.6 : 1,
//             }}
//           >
//             {changePassword.isPending ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <CsText style={{ color: colors.light }} className="font-semibold">
//                 Save Changes
//               </CsText>
//             )}
//           </Pressable>
//         </Animated.View>
//       </View>

//       <Modal transparent visible={modalVisible} animationType="fade">
//         <View className="flex-1 justify-center items-center bg-black/40 px-8">
//           <View
//             style={{ backgroundColor: colors.light }}
//             className="rounded-xl p-5 w-full"
//           >
//             <CsText>{modalText}</CsText>

//             <Pressable
//               style={{ backgroundColor: colors.primary }}
//               onPress={() => setModalVisible(false)}
//               className="mt-4 py-3 rounded-xl items-center"
//             >
//               <CsText style={{ color: colors.light }}>OK</CsText>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }



import { Eye, EyeOff, ShieldCheck } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  View,
} from "react-native";

import { toast } from "@backpackapp-io/react-native-toast";

import FormInput from "@/src/components/form/inputs/FormInput";
import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { useChangeCurrentPassword } from "@/src/hooks/useChangeCurrentPassword";
import { router } from "expo-router";

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordScreen() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const fade = useRef(new Animated.Value(0)).current;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const changePassword = useChangeCurrentPassword();

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

 const onSubmit = async (values: FormValues) => {
  if (values.newPassword !== values.confirmPassword) {
    return toast.error("Passwords do not match");
  }

  if (values.oldPassword === values.newPassword) {
    return toast.error("New password must be different");
  }

  try {
    await changePassword.mutateAsync({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    });

    reset();

    toast.success("Password changed successfully");

    setTimeout(() => {
      router.replace("/settings/SettingsScreen");
    }, 800);
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Something went wrong");
  }
};


  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <View className="flex-1 px-4">
        <BackHeader title="Change Password" desc="Security Settings" />

        <Animated.View style={{ opacity: fade }} className="rounded-3xl p-5 mt-4">
          <View className="items-center mb-6">
            <View className="bg-primary/10 p-4 rounded-full">
              <ShieldCheck size={28} color={colors.primary} />
            </View>

            <CsText className="mt-2 text-lg font-semibold">
              Change Password
            </CsText>

            <CsText style={{ color: colors.darkHover }} className="text-xs mt-1">
              Keep your account secure
            </CsText>
          </View>

          <FormInput
            control={control}
            name="oldPassword"
            label="Current Password"
            rules={{ required: "Current password is required" }}
            type={showOld ? "text" : "password"}
            error={errors?.oldPassword}
            rightIcon={
              <Pressable onPress={() => setShowOld(!showOld)}>
                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
              </Pressable>
            }
          />

          <FormInput
            control={control}
            name="newPassword"
            label="New Password"
            rules={{ required: "New password is required" }}
            type={showNew ? "text" : "password"}
            error={errors?.newPassword}
            rightIcon={
              <Pressable onPress={() => setShowNew(!showNew)}>
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </Pressable>
            }
          />

          <FormInput
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            rules={{ required: "Confirm password is required" }}
            type={showConfirm ? "text" : "password"}
            error={errors?.confirmPassword}
            rightIcon={
              <Pressable onPress={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </Pressable>
            }
          />

          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={changePassword.isPending}
            className="mt-4 py-4 rounded-2xl items-center"
            style={{
              backgroundColor: colors.primary,
              opacity: changePassword.isPending ? 0.6 : 1,
            }}
          >
            {changePassword.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <CsText style={{ color: colors.light }} className="font-semibold">
                Save Changes
              </CsText>
            )}
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}
