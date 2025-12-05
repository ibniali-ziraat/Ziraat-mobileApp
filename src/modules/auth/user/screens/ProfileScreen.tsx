import ProfileSection from "@/src/components/form/sections/ProfileSection";
import BackHeader from "@/src/components/shared/BackHeader";
import { useGlobalData } from "@/src/contexts/GlobalDataContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useProfileMutation,
  useProfileQuery,
  useProfileUpdateMutation,
} from "@/src/hooks/userQueryHooks";
import { profileSchema } from "@/src/schemas/user/profile.schema";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, Button, ScrollView } from "react-native";

export default function ProfileScreen() {
  const { setUserData, userData } = useGlobalData();

  const { data } = useProfileQuery(userData.id);
  const { mutateAsync: save } = useProfileMutation();
  const { mutateAsync: update } = useProfileUpdateMutation();

  const form = useZodForm(profileSchema);
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  // Prefill
  useEffect(() => {
    if (!data) return;
    Object.entries(data).forEach(([k, v]) => setValue(k, v));
    setUserData({
      profileId: data.id,
    });
  }, [data]);

  const onSubmit = async (values) => {
    const payload = { id: data.id, userId: userData.id, ...values };
    data ? await update(payload) : await save(payload);
    Alert.alert("Success", "Profile Saved!");
    router.replace("/user-profile");
  };

  return (
    <FormProvider {...form}>
      <ScrollView>
        <BackHeader>Profile</BackHeader>
        <ProfileSection control={control} errors={errors} />
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </FormProvider>
  );
}
