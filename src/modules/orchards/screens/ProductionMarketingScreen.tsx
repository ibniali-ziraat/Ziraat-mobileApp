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

import ProductionMarketing from "../form-sections/ProductionMarketingSection";
import {
  useCreateOrchardBasinInfoMutation,
  useOrchardByIdQuery,
  useUpdateOrchardBasicInfoMutation,
} from "../hooks/useOrchardsQuery";

export default function ProductionAndMarketingScreen() {
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

  useEffect(() => {
    if (!data?.production) return;

    Object.entries(data?.production).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
  }, [data?.production]);

  /**
   * Submit handler
   */
  const onSubmit = async (values: any) => {
    try {
      const payload = {
        id: data?.id,
        production: {
          ...values,
        },
      };

      if (data?.production) {
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
  // if (isError) {
  //   showErrorToast("Failed to load orchard data");
  //   return null;
  // }

  return (
    <ScreenLayout>
      <BackHeader title="Orchard Registration" desc="Production & Marketing" />

      <ScreenContent>
        <FormProvider {...form}>
          <ProductionMarketing errors={errors} control={control} />

          <FormActions
            cancelLabel="Cancel"
            submitLabel={data?.production ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
