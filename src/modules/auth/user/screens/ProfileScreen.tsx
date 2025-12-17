import ProfileSection from "@/src/modules/auth/user/sections/ProfileSection";
import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useProfileMutation,
  useProfileQuery,
  useProfileUpdateMutation,
} from "@/src/hooks/userQueryHooks";
import { profileSchema } from "@/src/schemas/user/profile.schema";
import { showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Alert } from "react-native";
import { useAuth } from "@/src/contexts/AuthContext";

export default function ProfileScreen() {
  const { setUserProfileId, userId } = useAuth();

  const { data } = useProfileQuery(userId);
  const { mutateAsync: save, isPending: isSaving } = useProfileMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useProfileUpdateMutation();

  const form = useZodForm(profileSchema);
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!data) return;

    Object.entries(data).forEach(([k, v]) => {
      setValue(k, v != null ? String(v) : ""); // convert numbers to strings
    });

    setUserProfileId(data?.id);
  }, [data]);

  const onSubmit = async (values) => {
    try {
      const payload = { id: data?.id, userId: userId, ...values };
      if (data) {
        await update(payload);
        showSuccessToast("Profile Updated");
      } else {
        await save(payload);
        showSuccessToast("Profile Saved");
      }
      router.replace(ROUTES.USER.PROFILE);
    } catch (error) {
      console.error("Profile submission error:", error);
      showSuccessToast("Something went wrong. Please try again.");
    }
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Profile"
        desc={
          data ? "Update your profile details" : "Add your profile information"
        }
        onPress={() => router.replace(ROUTES.USER.PROFILE)}
      />

      <FormProvider {...form}>
        {/* <ScrollView> */}

        <ProfileSection control={control} errors={errors} data={data} />
        <FormActions
          cancelLabel={"Cancel"}
          onCancel={() => router.replace(ROUTES.USER.PROFILE)}
          submitLabel={data ? "Update " : "Submit"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
          loading={isSaving || isUpdating}
        />
        {/* </ScrollView> */}
      </FormProvider>
    </ScreenLayout>
  );
}
