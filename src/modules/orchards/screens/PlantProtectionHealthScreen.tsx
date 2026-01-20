import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import PlantProtection from "../form-sections/PlantProtectionSection";
import {
  useCreatePlantProtectionMutation,
  usePlantProtectionQuery,
  useUpdatePlantProtectionMutation,
} from "../hooks/useOrchardsQuery";

export default function PlantProtectionScreen() {
  const { orchardProfileId } = useAuth();
  console.log(orchardProfileId, "orchardprofile id in orchard.service");

  const { data: cropNutritionData } = usePlantProtectionQuery(
    orchardProfileId!,
  );
  console.log(cropNutritionData, "crop nutrition data...");

  const { mutateAsync: save, isPending: isSaving } =
    useCreatePlantProtectionMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdatePlantProtectionMutation();

  const form = useZodForm();
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!cropNutritionData) return;

    Object.entries(cropNutritionData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
  }, [cropNutritionData]);

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        id: cropNutritionData?.id,

        ...values,
        orchardProfileId: orchardProfileId,
      };

      if (cropNutritionData) {
        await update(payload);
        showSuccessToast("Plant Protection updated");
      } else {
        await save(payload);
        showSuccessToast("Plant Protection saved");
      }

      router.back();
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save plant protection",
      );
    }
  };

  // if (isPending) return null;

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
            submitLabel={cropNutritionData?.length > 0 ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            onCancel={() => router.back()}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
