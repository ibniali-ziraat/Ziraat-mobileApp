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

import CropNutrition from "../form-sections/CropNutritionSection";
import {
  useCreateOrchardBasinInfoMutation,
  useOrchardByIdQuery,
  useUpdateOrchardBasicInfoMutation,
} from "../hooks/useOrchardsQuery";

export default function CropNutritionManagementScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: orchard, isPending } = useOrchardByIdQuery(Number(id));
  // const { data: orchardData, isPending } = useOrchardsByUserQuery();
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
    if (!orchard?.cropNutrition) return;

    const cn = orchard.cropNutrition;

    setValue("fertilizerPractices", cn.fertilizerPractices);
    setValue("hasFertigation", cn.hasFertigation);
    setValue("nutritionPlan", cn.nutritionPlan);
    setValue("isMulchingApplied", cn.isMulchingApplied);
    setValue(
      "lastFertilizerApplicationDate",
      cn.lastFertilizerApplicationDate
        ? cn.lastFertilizerApplicationDate.split("T")[0]
        : undefined
    );
    setValue("fertilizerApplicationMode", cn.fertilizerApplicationMode);
  }, [orchard?.cropNutrition]);

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
      if (orchard.cropNutrition) {
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
  // if (isError) {
  //   showErrorToast("Failed to load orchard data");
  //   return null;
  // }

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
            submitLabel={orchard.cropNutrition ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
