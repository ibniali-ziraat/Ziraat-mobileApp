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

import PlantProtection from "../form-sections/PlantProtectionSection";
import {
  useCreatePlantProtectionMutation,
  useOrchardsByUserQuery,
  useUpdatePlantProtectionMutation,
} from "../hooks/useOrchardsQuery";

export default function PlantProtectionScreen() {
  /**
   * ✅ Single orchard source
   */
  const { data: orchardData, isPending, isError } = useOrchardsByUserQuery();
  const orchard = orchardData?.[0];

  /**
   * Existing plant health / protection data
   */
  const plantHealthData = orchard?.plantHealth;

  /**
   * Mutations
   */
  const { mutateAsync: save, isPending: isSaving } =
    useCreatePlantProtectionMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdatePlantProtectionMutation();

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
   * ✅ PREFILL FORM IF DATA EXISTS
   */
  useEffect(() => {
    if (!plantHealthData) return;

    Object.entries(plantHealthData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
  }, [plantHealthData]);

  /**
   * Submit handler
   */
  const onSubmit = async (values: any) => {
    try {
      const payload = {
        id: orchard?.id,
        plantHealth: {
          ...values,
        },
      };

      if (plantHealthData) {
        await update(payload);
        showSuccessToast("Plant Protection updated");
      } else {
        await save(payload);
        showSuccessToast("Plant Protection saved");
      }

      router.push(ROUTES.ORCHARDS.REGISTRATION.PRODUCTION_INFO);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save plant protection"
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
        desc="Plant Protection & Health"
      />

      <ScreenContent>
        <FormProvider {...form}>
          <PlantProtection errors={errors} control={control} />

          <FormActions
            cancelLabel="Cancel"
            submitLabel={plantHealthData ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
