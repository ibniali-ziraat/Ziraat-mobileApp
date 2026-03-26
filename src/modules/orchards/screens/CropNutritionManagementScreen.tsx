import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { useZodForm } from "@/src/hooks/useZodForm";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";

import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import CropNutrition from "../form-sections/CropNutritionSection";
import {
  useCreateCropNutritionMutation,
  useCropNutritionQuery,
  useUpdateCropNutritionMutation,
} from "../hooks/useOrchardsQuery";
import { CropNutritionSchema } from "../schemas/CropNutritionSchema";

export default function CropNutritionManagementScreen() {
  const { orchardProfileId } = useAuth();
  // console.log(orchardProfileId, "orchardprofile id in orchard.service");

  const { data: cropNutritionData } = useCropNutritionQuery(orchardProfileId!);
  // console.log(cropNutritionData, "crop nutrition data...");

  const { mutateAsync: save, isPending: isSaving } =
    useCreateCropNutritionMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateCropNutritionMutation();

  const form = useZodForm(CropNutritionSchema);
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!cropNutritionData) return;

    setValue("fertilizerPractices", cropNutritionData.fertilizerPractices);
    setValue("hasFertigation", cropNutritionData.hasFertigation);
    setValue("nutritionPlan", cropNutritionData.nutritionPlan);
    setValue("isMulchingApplied", cropNutritionData.isMulchingApplied);
    setValue(
      "lastFertilizerApplicationDate",
      cropNutritionData.lastFertilizerApplicationDate
        ? cropNutritionData.lastFertilizerApplicationDate.split("T")[0]
        : undefined,
    );
    setValue(
      "fertilizerApplicationMode",
      cropNutritionData.fertilizerApplicationMode,
    );
  }, [cropNutritionData]);

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        orchardProfileId: orchardProfileId,
        id: cropNutritionData?.id,
        ...values,
      };

      if (cropNutritionData) {
        await update(payload);
        showSuccessToast("Crop & Nutrition updated");
      } else {
        await save(payload);
        showSuccessToast("Crop & Nutrition saved");
      }

      // router.replace(ROUTES.TABS.ORCHARDS);
      router.dismiss();
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message ||
          "Failed to save crop & nutrition information",
      );
    }
  };

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
            onCancel={() => router.replace(ROUTES.TABS.ORCHARDS)}
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
