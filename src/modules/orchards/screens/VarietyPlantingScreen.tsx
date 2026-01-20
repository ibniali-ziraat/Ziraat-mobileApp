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

import { useAuth } from "@/src/contexts/AuthContext";
import VarietAndPlatingDetails from "../form-sections/VarietyPlantingSection";
import {
  useCreateVarietyMutation,
  useOrchardVarietiesQuery,
  useUpdateVarietyMutation,
} from "../hooks/useOrchardsQuery";

export default function VarietyAndPlatingDetailsScreen() {
  const { orchardProfileId } = useAuth();
  console.log(orchardProfileId, "orchardprofile id in orchard.service");

  const { data: varietiesData } = useOrchardVarietiesQuery(orchardProfileId!);
  console.log(varietiesData, "crop nutrition data...");

  const { mutateAsync: save, isPending: isSaving } = useCreateVarietyMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateVarietyMutation();
  const form = useZodForm();
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!varietiesData) return;

    const { id, ...varietyFormValues } = varietiesData[0];

    form.reset(varietyFormValues);
  }, [varietiesData]);

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        id: varietiesData[0]?.id,
        orchardProfileId,
        ...values,
      };
      const saveData = [
        {
          id: varietiesData[0]?.id,
          orchardProfileId,
          ...values,
        },
      ];
      if (varietiesData.length > 0) {
        await update(payload);
        showSuccessToast("Variety & Planting Details updated");
      } else {
        await save(saveData);
        showSuccessToast("Variety & Planting Details saved");
      }

      router.replace(ROUTES.TABS.ORCHARDS);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save variety details",
      );
    }
  };

  /**
   * Loading / Error guards
   */
  // if (isPending) return null;

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
            onCancel={() => router.replace(ROUTES.TABS.ORCHARDS)}
            submitLabel={varietiesData?.length > 0 ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
