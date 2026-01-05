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

import CropNutrition from "../form-sections/CropNutritionSection";
import {
  useCreateVarietyMutation,
  useOrchardsByUserQuery,
  useUpdateVarietyMutation,
} from "../hooks/useOrchardsQuery";

export default function CropNutritionManagementScreen() {
  /**
   * ✅ Single API source (same as other sections)
   */
  const { data: orchardData, isPending, isError } = useOrchardsByUserQuery();

  /**
   * Assume first orchard (adjust if multi-orchard selection is added later)
   */
  const orchard = orchardData?.[0];
  const cropNutritionData = orchard?.cropNutrition;

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
   * ✅ PREFILL FORM WHEN API DATA EXISTS
   */
  useEffect(() => {
    if (!cropNutritionData) return;

    Object.entries(cropNutritionData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
  }, [cropNutritionData]);

  /**
   * Submit handler
   */
  const onSubmit = async (values: any) => {
    try {
      const payload = {
        id: orchard?.id,
        cropNutrition: {
          ...values,
        },
      };

      /**
       * ✅ UPDATE vs CREATE
       */
      if (cropNutritionData) {
        await update(payload);
        showSuccessToast("Crop & Nutrition updated");
      } else {
        await save(payload);
        showSuccessToast("Crop & Nutrition saved");
      }

      router.push(ROUTES.ORCHARDS.REGISTRATION.FARM_INFO);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message ||
          "Failed to save crop & nutrition information"
      );
    }
  };

  /**
   * Loading / Error states
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
        desc="Crop & Nutrition Management"
      />

      <ScreenContent>
        <FormProvider {...form}>
          <CropNutrition errors={errors} control={control} />

          <FormActions
            cancelLabel="Cancel"
            submitLabel={cropNutritionData ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
