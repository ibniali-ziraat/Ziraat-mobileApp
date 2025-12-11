import EducationSection from "@/src/components/form/sections/EducationSection";
import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { useGlobalData } from "@/src/contexts/GlobalDataContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useEducationMutation,
  useEducationQuery,
  useEducationUpdateMutation,
} from "@/src/hooks/userQueryHooks";
import { educationSchema } from "@/src/schemas/user/education.schema";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { ScrollView } from "react-native";

export default function EducationScreen() {
  const { userData } = useGlobalData();

  const { data } = useEducationQuery(userData.profileId);
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
    Object.entries(data).forEach(([k, v]) => setValue(k, v));
  }, [data]);

  const onSubmit = async (values) => {
    try {
      const payload = { profileId: userData.profileId, ...values };

      if (data) {
        await update(payload);
      } else {
        await save(payload);
      }

      showSuccessToast("Education saved successfully");
      router.replace("/user-profile");
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
        <ScrollView>
          <BackHeader title="Education" />

          <EducationSection control={control} errors={errors} />
          <FormActions
            cancelLabel={"Cancel"}
            submitLabel={data ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
          />
        </ScrollView>
      </FormProvider>
    </ScreenLayout>
  );
}
