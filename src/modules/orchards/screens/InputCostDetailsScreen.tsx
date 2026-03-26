import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { useZodForm } from "@/src/hooks/useZodForm";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";

import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { useAuth } from "@/src/contexts/AuthContext";
import InputCostDetails from "../form-sections/InputCostSection";
import {
  useCreateInputCostMutation,
  useInputCostQuery,
  useUpdateInputCostMutation,
} from "../hooks/useOrchardsQuery";

export default function InputCostDetailsScreen() {
  const { orchardProfileId } = useAuth();
  console.log(orchardProfileId, "orchardprofile id in orchard.service");

  const { data: inputCostData } = useInputCostQuery(orchardProfileId!);

  const { mutateAsync: save, isPending: isSaving } =
    useCreateInputCostMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateInputCostMutation();
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
    if (!inputCostData) return;
    Object.entries(inputCostData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
  }, [inputCostData]);

  /**
   * Submit handler
   */
  const onSubmit = async (values: any) => {
    try {
      const payload = {
        id: inputCostData?.id,
        orchardProfileId,
        ...values,
      };

      if (inputCostData) {
        await update(payload);
        showSuccessToast("Orchard input cost updated");
      } else {
        await save(payload);
        showSuccessToast("Orchard input cost saved");
      }

      // router.push(ROUTES.TABS.ORCHARDS);
      router.dismiss();
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save orchard input cost",
      );
    }
  };

  /**
   * Loading / Error guards
   */
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
            submitLabel={inputCostData?.length > 0 ? "Update" : "Save"}
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
