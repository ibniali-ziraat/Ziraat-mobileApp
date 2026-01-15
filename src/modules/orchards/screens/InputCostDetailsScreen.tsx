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

import InputCostDetails from "../form-sections/InputCostSection";
import {
  useCreateOrchardBasinInfoMutation,
  useOrchardByIdQuery,
  useUpdateOrchardBasicInfoMutation,
} from "../hooks/useOrchardsQuery";

export default function InputCostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending } = useOrchardByIdQuery(Number(id));
  console.log(data, "data of orchard is");

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

  /**
   * ✅ PREFILL FORM IF DATA EXISTS
   */
  useEffect(() => {
    if (!data) return;

    Object.entries(data.inputCost).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
  }, [data]);

  /**
   * Submit handler
   */
  const onSubmit = async (values: any) => {
    try {
      const payload = {
        id: data?.id,
        inputCost: {
          ...values,
        },
      };

      if (data.inputCost) {
        await update(payload);
        showSuccessToast("Orchard input cost updated");
      } else {
        await save(payload);
        showSuccessToast("Orchard input cost saved");
      }

      router.push(ROUTES.TABS.ORCHARDS);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save orchard input cost"
      );
    }
  };

  /**
   * Loading / Error guards
   */
  if (isPending) return null;
  // if (isError) {
  //   showErrorToast("Failed to load orchard data");
  //   return null;
  // }

  return (
    <ScreenLayout>
      <BackHeader title="Orchard Registration" desc="Input Cost Details" />

      <ScreenContent>
        <FormProvider {...form}>
          <InputCostDetails errors={errors} control={control} />

          <FormActions
            cancelLabel="Cancel"
            submitLabel={data.inputCost ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
