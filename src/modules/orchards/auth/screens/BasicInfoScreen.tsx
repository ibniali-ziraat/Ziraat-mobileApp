import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { useAuth } from "@/src/contexts/AuthContext";
import { useOrchard } from "@/src/contexts/OrchardContext";

import { useZodForm } from "@/src/hooks/useZodForm";
import { BasicInfoSchema } from "@/src/schemas/orchard schemas/BasicInfoSchema";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import {
  useCreateOrchardMutation,
  useOrchardsByUserQuery,
  useUpdateOrchardMutation,
} from "../../hooks/useOrchardsQuery";
import BasicInfo from "../../sections/BasicInfo";

export default function BasicInfoScreen() {
  const { userId } = useAuth();
  const { orchardId, setOrchardId } = useOrchard();

  const { data } = useOrchardsByUserQuery(userId);
  const { mutateAsync: save, isPending: isSaving } = useCreateOrchardMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateOrchardMutation();

  const form = useZodForm(BasicInfoSchema);
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  // Prefill if editing
  useEffect(() => {
    if (!data) return;
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
    setOrchardId(data.id);
  }, [data]);

  const onSubmit = async (values: any) => {
    try {
      let res;

      if (orchardId) {
        res = await update({ id: orchardId, ...values });
        showSuccessToast("Orchard updated");
      } else {
        res = await save({ userId, ...values });
        setOrchardId(res.id);
        showSuccessToast("Orchard created");
      }

      // move to next step
      router.push("/orchards/variety");
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save orchard information"
      );
    }
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Orchard Registration"
        desc="Basic / Mandatory Information"
      />

      <FormProvider {...form}>
        <BasicInfo errors={errors} control={control} />

        <FormActions
          cancelLabel="Cancel"
          onCancel={() => router.back()}
          submitLabel={orchardId ? "Update & Continue" : "Save & Continue"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
          loading={isSaving || isUpdating}
        />
      </FormProvider>
    </ScreenLayout>
  );
}
