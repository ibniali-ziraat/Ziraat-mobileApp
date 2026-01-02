import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useEducationMutation,
  useEducationQuery,
  useEducationUpdateMutation,
} from "../../../../hooks/userQueryHooks";

import { educationSchema } from "@/src/modules/auth/user/schemas/education.schema";
import EducationSection from "@/src/modules/auth/user/sections/EducationSection";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

export default function EducationScreen() {
  const { userProfileId } = useAuth();

  const { data } = useEducationQuery(userProfileId);
  const { mutateAsync: save, isPending: isSaving } = useEducationMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useEducationUpdateMutation();

  const form = useZodForm(educationSchema);
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!data) return;
    Object.entries(data).forEach(([k, v]) => {
      setValue(k, v != null ? String(v) : ""); // convert numbers to strings
    });
  }, [data]);

  const onSubmit = async (values) => {
    try {
      const payload = { profileId: userProfileId, ...values };

      if (data) {
        await update(payload);
        showSuccessToast("Education Updated");
      } else {
        await save(payload);
        showSuccessToast("Education Saved");
      }

      router.replace(ROUTES.USER.PROFILE);
    } catch (error) {
      const backendError =
        error?.response?.data?.message ||
        error?.response?.data?.[0]?.description ||
        "Something went wrong while saving education details";

      showErrorToast(backendError);
    }
  };

  return (
    <ScreenLayout>
      <FormProvider {...form}>
        <BackHeader
          title="Educational Details"
          desc="Please provide details about your highest qualification and educational background."
          onPress={() => router.replace(ROUTES.USER.PROFILE)}
        />

        <EducationSection control={control} errors={errors} />
        <FormActions
          cancelLabel={"Cancel"}
          onCancel={() => router.replace(ROUTES.USER.PROFILE)}
          submitLabel={data ? "Update" : "Add"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
          loading={isSaving || isUpdating}
        />
      </FormProvider>
    </ScreenLayout>
  );
}
