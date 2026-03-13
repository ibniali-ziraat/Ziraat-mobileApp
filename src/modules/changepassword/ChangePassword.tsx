import FormInput from "@/src/components/form/inputs/FormInput";
import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { useChangeCurrentPassword } from "@/src/hooks/useChangeCurrentPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Eye, EyeOff, ShieldCheck } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Pressable,
  View,
} from "react-native";

import { ChangePasswordSchema } from "@/src/schemas/password.schema";

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
  } = useForm<FormValues>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
  });

  const changePassword = useChangeCurrentPassword();

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const onSubmit = async (values: FormValues) => {
  try {
    await changePassword.mutateAsync(values);

    reset();
    Alert.alert("Success", "Password changed successfully");

    setTimeout(() => {
      router.replace("/settings/SettingsScreen");
    }, 800);
  } catch (err: any) {
    Alert.alert(
      "Error",
      err?.response?.data?.message || "Something went wrong"
    );
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
              Change your current Password
            </CsText>

            <CsText style={{ color: colors.darkHover }} className="text-sm mt-1">
              Keep your account secure & safe
            </CsText>
          </View>

          <FormInput
            control={control}
            name="oldPassword"
            label="Current Password"
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
              <CsText style={{ color: colors.light }} className="font-semibold text-base ">
              Save changes
              </CsText>
            )}
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}