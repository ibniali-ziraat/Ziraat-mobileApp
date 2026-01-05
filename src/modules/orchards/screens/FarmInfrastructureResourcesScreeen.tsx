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

import FarmInfrastructure from "../form-sections/FarmInfrastructureSection";
import {
  useCreateInfrastructureMutation,
  useOrchardsByUserQuery,
  useUpdateInfrastructureMutation,
} from "../hooks/useOrchardsQuery";

export default function FarmInfrastructureScreen() {
  /**
   * ✅ Single orchard source
   */
  const { data: orchardData, isPending, isError } = useOrchardsByUserQuery();

  /**
   * Assume first orchard (future-safe for multi-orchard support)
   */
  const orchard = orchardData?.[0];
  const infrastructureData = orchard?.infrastructure;

  /**
   * Mutations
   */
  const { mutateAsync: save, isPending: isSaving } =
    useCreateInfrastructureMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateInfrastructureMutation();

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
    if (!infrastructureData) return;

    Object.entries(infrastructureData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
  }, [infrastructureData]);

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
      if (infrastructureData) {
        await update(payload);
        showSuccessToast("Farm infrastructure updated");
      } else {
        await save(payload);
        showSuccessToast("Farm infrastructure saved");
      }

      router.push(ROUTES.ORCHARDS.REGISTRATION.INPUT_COST_INFO);
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
  if (isError) {
    showErrorToast("Failed to load orchard data");
    return null;
  }

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
            submitLabel={infrastructureData ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
