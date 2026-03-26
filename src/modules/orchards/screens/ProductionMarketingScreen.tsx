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
import ProductionMarketingSection from "../form-sections/ProductionMarketingSection";
import {
  useCreateProductionMarketingMutation,
  useProductionMarketingQuery,
  useUpdateProductionMarketingMutation,
} from "../hooks/useOrchardsQuery";
import { ProductionMarketingSchema } from "../schemas/ProductionMarketingSchema";

export default function ProductionAndMarketingScreen() {
  const { orchardProfileId } = useAuth();
  console.log(orchardProfileId, "orchardprofile id in orchard.service");

  const { data: ProductionMarketingData } = useProductionMarketingQuery(
    orchardProfileId!,
  );
  console.log(ProductionMarketingData, "crop nutrition data...");

  const { mutateAsync: save, isPending: isSaving } =
    useCreateProductionMarketingMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateProductionMarketingMutation();

  const form = useZodForm(ProductionMarketingSchema);
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!ProductionMarketingData) return;

    Object.entries(ProductionMarketingData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
  }, [ProductionMarketingData]);

  /**
   * Submit handler
   */
  const onSubmit = async (values: any) => {
    try {
      const payload = {
        id: ProductionMarketingData?.id,
        orchardProfileId: orchardProfileId,
        ...values,
      };

      if (ProductionMarketingData) {
        await update(payload);
        showSuccessToast("Production & Marketing updated");
      } else {
        await save(payload);
        showSuccessToast("Production & Marketing saved");
      }
      // router.back();
      router.dismiss();

      // router.push(ROUTES.ORCHARDS.REGISTRATION.SOIL_WATER_INFO);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message ||
          "Failed to save production & marketing info",
      );
    }
  };

  /**
   * Loading / Error guards
   */
  // if (isPending) return null;
  // if (isError) {
  //   showErrorToast("Failed to load orchard data");
  //   return null;
  // }

  return (
    <ScreenLayout>
      <BackHeader title="Orchard Registration" desc="Production & Marketing" />

      <ScreenContent>
        <FormProvider {...form}>
          <ProductionMarketingSection errors={errors} control={control} />

          <FormActions
            cancelLabel="Cancel"
            submitLabel={
              ProductionMarketingData?.length > 0 ? "Update" : "Save"
            }
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
