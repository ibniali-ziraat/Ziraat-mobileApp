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

import ProductionMarketing from "../form-sections/ProductionMarketingSection";
import {
  useCreateProductionMarketingMutation,
  useOrchardsByUserQuery,
  useUpdateProductionMarketingMutation,
} from "../hooks/useOrchardsQuery";

export default function ProductionAndMarketingScreen() {
  /**
   * ✅ Single orchard source
   */
  const { data: orchardData, isPending, isError } = useOrchardsByUserQuery();
  const orchard = orchardData?.[0];

  /**
   * Existing production/marketing data
   */
  const productionData = orchard?.production;

  /**
   * Mutations
   */
  const { mutateAsync: save, isPending: isSaving } =
    useCreateProductionMarketingMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateProductionMarketingMutation();

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
   * ✅ Prefill form if data exists
   */
  useEffect(() => {
    if (!productionData) return;

    Object.entries(productionData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
  }, [productionData]);

  /**
   * Submit handler
   */
  const onSubmit = async (values: any) => {
    try {
      const payload = {
        id: orchard?.id,
        production: {
          ...values,
        },
      };

      if (productionData) {
        await update(payload);
        showSuccessToast("Production & Marketing updated");
      } else {
        await save(payload);
        showSuccessToast("Production & Marketing saved");
      }

      router.push(ROUTES.ORCHARDS.REGISTRATION.SOIL_WATER_INFO);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message ||
          "Failed to save production & marketing info"
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
      <BackHeader title="Orchard Registration" desc="Production & Marketing" />

      <ScreenContent>
        <FormProvider {...form}>
          <ProductionMarketing errors={errors} control={control} />

          <FormActions
            cancelLabel="Cancel"
            submitLabel={productionData ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
