import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { ROUTES } from "@/src/constants/routes";
import { useZodForm } from "@/src/hooks/useZodForm";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";

import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import VarietAndPlatingDetails from "../form-sections/VarietyPlantingSection";
import {
  useCreateVarietyMutation,
  useOrchardsByUserQuery,
  useUpdateVarietyMutation,
} from "../hooks/useOrchardsQuery";

export default function VarietyAndPlatingDetailsScreen() {
  /**
   * ✅ Single orchard source
   */
  const { data: orchardData, isPending, isError } = useOrchardsByUserQuery();
  const orchard = orchardData?.[0];

  /**
   * Existing variety data
   */
  const varietyData = orchard?.varieties?.[0]; // assuming only one variety object per orchard

  /**
   * Mutations
   */
  const { mutateAsync: save, isPending: isSaving } = useCreateVarietyMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateVarietyMutation();

  /**
   * Form
   */
  const form = useZodForm();
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  /**
   * ✅ Prefill form if data exists
   */
  useEffect(() => {
    if (!varietyData) return;

    Object.entries(varietyData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
  }, [varietyData]);

  /**
   * Submit handler
   */
  const onSubmit = async (values: any) => {
    try {
      const payload = {
        id: orchard?.id,
        varieties: [
          {
            ...values,
          },
        ],
      };

      if (varietyData) {
        await update(payload);
        showSuccessToast("Variety & Planting Details updated");
      } else {
        await save(payload);
        showSuccessToast("Variety & Planting Details saved");
      }

      router.push(ROUTES.ORCHARDS.REGISTRATION.FUTURE_INFO);
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
  if (isError) {
    showErrorToast("Failed to load orchard data");
    return null;
  }

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
            submitLabel={varietyData ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
