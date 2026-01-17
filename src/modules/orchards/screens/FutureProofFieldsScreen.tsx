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

import OptionalFutureFields from "../form-sections/FutureFieldSection";
import {
  useCreateOrchardBasinInfoMutation,
  useOrchardByIdQuery,
  useUpdateOrchardBasicInfoMutation,
} from "../hooks/useOrchardsQuery";

export default function FutureProofFieldScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isPending } = useOrchardByIdQuery(Number(id));
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
    if (!data?.optionalFields) return;

    Object.entries(data.optionalFields).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
  }, [data?.optionalFields]);

  /**
   * Submit handler
   */
  const onSubmit = async (values: any) => {
    try {
      const payload = {
        id: data?.id,
        optionalFields: {
          ...values,
        },
      };

      /**
       * ✅ UPDATE vs CREATE
       */
      if (data?.optionalFields) {
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

  if (isPending) return null;

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
            submitLabel={data?.optionalFields ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
