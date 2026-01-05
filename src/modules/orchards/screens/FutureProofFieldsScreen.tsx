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

import OptionalFutureFields from "../form-sections/FutureFieldSection";
import {
  useCreateOrchardExtraMutation,
  useOrchardsByUserQuery,
  useUpdateOrchardExtraMutation,
} from "../hooks/useOrchardsQuery";

export default function FutureProofFieldScreen() {
  /**
   * ✅ Single orchard source
   */
  const { data: orchardData, isPending, isError } = useOrchardsByUserQuery();
  const orchard = orchardData?.[0];

  /**
   * Existing optional/future fields
   */
  const optionalFieldsData = orchard?.optionalFields;

  /**
   * Mutations
   */
  const { mutateAsync: save, isPending: isSaving } =
    useCreateOrchardExtraMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateOrchardExtraMutation();

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
    if (!optionalFieldsData) return;

    Object.entries(optionalFieldsData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
  }, [optionalFieldsData]);

  /**
   * Submit handler
   */
  const onSubmit = async (values: any) => {
    try {
      const payload = {
        id: orchard?.id,
        optionalFields: {
          ...values,
        },
      };

      /**
       * ✅ UPDATE vs CREATE
       */
      if (optionalFieldsData) {
        await update(payload);
        showSuccessToast("Orchard optional fields updated");
      } else {
        await save(payload);
        showSuccessToast("Orchard optional fields saved");
      }

      router.push(ROUTES.TABS.ORCHARDS);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message ||
          "Failed to save orchard optional fields"
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
        desc="Optional / Future-Proof Fields"
      />

      <ScreenContent>
        <FormProvider {...form}>
          <OptionalFutureFields errors={errors} control={control} />

          <FormActions
            cancelLabel="Cancel"
            submitLabel={optionalFieldsData ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
