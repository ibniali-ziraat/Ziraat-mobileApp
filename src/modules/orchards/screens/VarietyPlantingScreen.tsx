import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { ROUTES } from "@/src/constants/routes";
import { useZodForm } from "@/src/hooks/useZodForm";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";

import { router, useLocalSearchParams } from "expo-router";
import { FormProvider } from "react-hook-form";

import { useAuth } from "@/src/contexts/AuthContext";

import { useEffect } from "react";
import VarietAndPlatingDetails from "../form-sections/VarietyPlantingSection";
import {
  useCreateVarietyMutation,
  useOrchardVarietiesQuery,
  useUpdateVarietyMutation,
} from "../hooks/useOrchardsQuery";
import { VarietyAndPlatingDetailsSchema } from "../schemas/VarietyAndPlatingDetailsSchema";

export default function VarietyAndPlatingDetailsScreen() {
  const { orchardProfileId } = useAuth();

  if (!orchardProfileId) return null;

  const { varietyId } = useLocalSearchParams<{ varietyId?: string }>();

  const { data: varietiesData } = useOrchardVarietiesQuery(orchardProfileId);
  console.log(varietiesData, "varieties data....");

  const selectedVariety = varietiesData?.find(
    (v: any) => String(v.id) === String(varietyId),
  );

  const isEdit = selectedVariety;

  const { mutateAsync: save, isPending: isSaving } = useCreateVarietyMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateVarietyMutation();

  const form = useZodForm(VarietyAndPlatingDetailsSchema, {
    defaultValues: {
      varieties: [
        {
          varietyName: "",
          numberOfTrees: "",
          rootstockUsed: "",
          plantDensity: "",
          treesLessThan5Years: "",
          treesFiveToTenYears: "",
          treesMoreThan10Years: "",
        },
      ],
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!varietyId) return;
    if (!varietiesData || varietiesData.length === 0) return;

    const selected = varietiesData.find(
      (v: any) => String(v.id) === String(varietyId),
    );

    if (!selected) return;

    form.reset({
      varieties: [
        {
          varietyName: String(selected.varietyName ?? ""),
          numberOfTrees: String(selected.numberOfTrees ?? ""),
          rootstockUsed: String(selected.rootstockUsed ?? ""),
          plantDensity: String(selected.plantDensity ?? ""),
          treesLessThan5Years: String(selected.treesLessThan5Years ?? ""),
          treesFiveToTenYears: String(selected.treesFiveToTenYears ?? ""),
          treesMoreThan10Years: String(selected.treesMoreThan10Years ?? ""),
        },
      ],
    });
  }, [varietyId, varietiesData, form]);

  const onSubmit = async (values: any) => {
    try {
      if (isEdit) {
        await update({
          id: varietyId,
          orchardProfileId,
          ...values.varieties[0],
        });

        showSuccessToast("Variety updated");
      } else {
        for (const v of values.varieties) {
          await save({
            orchardProfileId,
            ...v,
          });
        }

        showSuccessToast("Varieties saved");
      }

      // router.back();
      router.dismiss();
    } catch (error) {
      showErrorToast("Failed to save variety");
    }
  };

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
            submitLabel={isEdit ? "Update Variety" : "Save Variety"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
