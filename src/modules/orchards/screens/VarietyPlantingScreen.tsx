import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { ROUTES } from "@/src/constants/routes";
import { useZodForm } from "@/src/hooks/useZodForm";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";

import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import VarietAndPlatingDetails from "../form-sections/VarietyPlantingSection";
import {
  useCreateOrchardBasinInfoMutation,
  useOrchardByIdQuery,
  useUpdateOrchardBasicInfoMutation,
} from "../hooks/useOrchardsQuery";

export default function VarietyAndPlatingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isPending } = useOrchardByIdQuery(Number(id));
  const { mutateAsync: save, isPending: isSaving } =
    useCreateOrchardBasinInfoMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateOrchardBasicInfoMutation();
  const form = useZodForm();
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!data?.varieties?.length) return;

    const { id, ...varietyFormValues } = data.varieties[0];

    form.reset(varietyFormValues);
  }, [data?.varieties]);

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        id: data?.id,
        varieties: [
          {
            ...values,
          },
        ],
      };

      if (data.varieties.length) {
        await update(payload);
        showSuccessToast("Variety & Planting Details updated");
      } else {
        await save(payload);
        showSuccessToast("Variety & Planting Details saved");
      }

      router.push(ROUTES.TABS.ORCHARDS);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save variety details"
      );
    }
  };

  /**
   * Loading / Error guards
   */
  if (isPending) return null;

  return (
    <ScreenLayout>
      <BackHeader
        title="Orchard Registration"
        desc="Variety And Planting Details"
      />
      <ScreenContent>
        <FormProvider {...form}>
          <VarietAndPlatingDetails errors={errors} control={control} />
          <FormActions
            cancelLabel="Cancel"
            submitLabel={data.varieties.length ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
