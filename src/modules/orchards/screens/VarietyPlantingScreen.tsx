import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { ROUTES } from "@/src/constants/routes";
import { useZodForm } from "@/src/hooks/useZodForm";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";

import { router } from "expo-router";
import { FormProvider } from "react-hook-form";

import { useAuth } from "@/src/contexts/AuthContext";
import { useLocalSearchParams } from "expo-router";
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
  console.log(orchardProfileId, "orchardprofile id in orchard.service");

  const { varietyId } = useLocalSearchParams<{ varietyId?: string }>();
  console.log(varietyId, "variety id is ..");

  const { data: varietiesData } = useOrchardVarietiesQuery(orchardProfileId!);
  const selectedVariety = varietiesData?.find(
    (v: any) => v.id === Number(varietyId),
  );

  const isEdit = !!varietyId && !!selectedVariety;
  console.log(varietiesData, "crop nutrition data...");

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
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!isEdit || !varietiesData || !varietyId) return;

    const selectedVariety = varietiesData.find(
      (v: any) => v.id === Number(varietyId),
    );

    if (!selectedVariety) return;

    // IMPORTANT: match useFieldArray structure
    form.reset({
      varieties: [
        {
          varietyName: selectedVariety.varietyName,
          numberOfTrees: selectedVariety.numberOfTrees,
          rootstockUsed: selectedVariety.rootstockUsed,
          plantDensity: selectedVariety.plantDensity,
          treesLessThan5Years: selectedVariety.treesLessThan5Years,
          treesFiveToTenYears: selectedVariety.treesFiveToTenYears,
          treesMoreThan10Years: selectedVariety.treesMoreThan10Years,
        },
      ],
    });
  }, [isEdit, varietiesData, varietyId]);

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
        // const payload = values.varieties.map((v) => ({
        //   orchardProfileId,
        //   ...v,
        // }));

        // await save(payload);
        // showSuccessToast("Varieties saved");
        for (const v of values.varieties) {
          const payload = {
            orchardProfileId,
            ...v,
          };

          await save(payload);
        }

        showSuccessToast("Varieties saved");
      }

      router.back();
    } catch (error) {
      showErrorToast("Failed to save variety");
    }
  };

  // const onSubmit = async (values: any) => {
  //   try {
  //     const payload = {
  //       id: varietiesData[0]?.id,
  //       orchardProfileId,
  //       ...values,
  //     };
  //     const saveData = [
  //       {
  //         id: varietiesData[0]?.id,
  //         orchardProfileId,
  //         ...values,
  //       },
  //     ];
  //     if (varietiesData.length > 0) {
  //       await update(payload);
  //       showSuccessToast("Variety & Planting Details updated");
  //     } else {
  //       await save(saveData);
  //       showSuccessToast("Variety & Planting Details saved");
  //     }

  //     router.replace(ROUTES.TABS.ORCHARDS);
  //   } catch (error: any) {
  //     showErrorToast(
  //       error?.response?.data?.message || "Failed to save variety details",
  //     );
  //   }
  // };

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
