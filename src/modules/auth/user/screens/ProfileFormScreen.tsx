import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useProfileMutation,
  useProfileQuery,
  useProfileUpdateMutation,
} from "../../../../hooks/userQueryHooks";

import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { DUMMY_EMAIL } from "@/src/constants/constants";
import { profileSchema } from "@/src/modules/auth/user/schemas/profile.schema";
import ProfileSection from "@/src/modules/auth/user/sections/ProfileSection";
import { showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

export default function ProfileFormScreen() {
  const { setUserProfileId, userId } = useAuth();

  const { data } = useProfileQuery(userId);
  console.log(data, "userprofiledata...");

  const { mutateAsync: save, isPending: isSaving } = useProfileMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useProfileUpdateMutation();

  const isUpdate = !!data;

  const form = useZodForm(profileSchema(isUpdate)); // re-derives when data loads
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  // const form = useZodForm(profileSchema);
  // const {
  //   setValue,
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = form;

  useEffect(() => {
    if (!data) return;

    Object.entries(data).forEach(([k, v]) => {
      if (k === "email" && v.endsWith(DUMMY_EMAIL)) {
        setValue(k, "");
      } else {
        setValue(k, v != null ? String(v) : "");
      }
    });

    setUserProfileId(data?.id);
  }, [data]);

  const onSubmit = async (values) => {
    try {
      const payload = {
        id: data?.id,
        userId: userId,
        ...values,
        email: values.email?.trim() || `${values.phone}${DUMMY_EMAIL}`,
      };
      if (data) {
        await update(payload);
        showSuccessToast("Profile Updated");
      } else {
        await save(payload);
        showSuccessToast("Profile Saved");
      }
      router.replace(ROUTES.ACCOUNT.PROFILE);
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
        onPress={() => router.replace(ROUTES.ACCOUNT.PROFILE)}
      />

      <ScreenContent>
        <FormProvider {...form}>
          <ProfileSection errors={errors} data={data} />
          <FormActions
            cancelLabel={"Cancel"}
            onCancel={() => router.replace(ROUTES.ACCOUNT.PROFILE)}
            submitLabel={data ? "Update " : "Submit"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
