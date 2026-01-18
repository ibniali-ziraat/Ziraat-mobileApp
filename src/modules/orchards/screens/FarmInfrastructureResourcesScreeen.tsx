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

import FarmInfrastructure from "../form-sections/FarmInfrastructureSection";
import {
  useCreateOrchardBasinInfoMutation,
  useOrchardByIdQuery,
  useUpdateOrchardBasicInfoMutation,
} from "../hooks/useOrchardsQuery";

export default function FarmInfrastructureScreen() {
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

  /**
   * ✅ PREFILL FORM IF DATA EXISTS
   */
  useEffect(() => {
    if (!orchard?.infrastructure) return;

    Object.entries(orchard.infrastructure).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
  }, [orchard?.infrastructure]);

  /**
   * Submit handler
   */
  const onSubmit = async (values: any) => {
    try {
      const payload = {
        id: orchard?.id,
        infrastructure: {
          ...values,
        },
      };

      /**
       * ✅ UPDATE vs CREATE
       */
      if (orchard?.infrastructure) {
        await update(payload);
        showSuccessToast("Farm infrastructure updated");
      } else {
        await save(payload);
        showSuccessToast("Farm infrastructure saved");
      }
      router.push(ROUTES.TABS.ORCHARDS);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message ||
          "Failed to save farm infrastructure information"
      );
    }
  };

  /**
   * Loading / Error guards
   */
  if (isPending) return null;

  return (
    <ScreenLayout>
      <BackHeader
        title="Orchard Registration"
        desc="Farm Infrastructure & Resources"
      />

      <ScreenContent>
        <FormProvider {...form}>
          <FarmInfrastructure errors={errors} control={control} />

          <FormActions
            cancelLabel="Cancel"
            submitLabel={orchard?.infrastructure ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
