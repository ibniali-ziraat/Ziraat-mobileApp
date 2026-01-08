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

import SoilAndWaterProfile from "../form-sections/SoilWaterSection";
import {
  useCreateOrchardBasinInfoMutation,
  useOrchardByIdQuery,
  useUpdateOrchardBasicInfoMutation,
} from "../hooks/useOrchardsQuery";

export default function SoilAndWaterProfileScreen() {
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
   * ✅ Prefill form if data exists
   */
  useEffect(() => {
    if (!data) return;

    Object.entries(data.soilAndWater).forEach(([key, value]) => {
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
        soilAndWater: {
          ...values,
          soilTestReportUrl:
            values.soilTestReportUrl?.name || values.soilTestReportUrl,
        },
      };

      if (data.soilAndWater) {
        await update(payload);
        showSuccessToast("Soil & Water Profile updated");
      } else {
        await save(payload);
        showSuccessToast("Soil & Water Profile saved");
      }

      router.push(ROUTES.ORCHARDS.REGISTRATION.VARIETY_INFO);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save soil & water profile"
      );
    }
  };

  /**
   * Loading / Error guards
   */
  if (isPending) return null;

  return (
    <ScreenLayout>
      <BackHeader title="Orchard Registration" desc="Soil and Water Profile" />

      <ScreenContent>
        <FormProvider {...form}>
          <SoilAndWaterProfile errors={errors} control={control} />

          <FormActions
            cancelLabel="Cancel"
            submitLabel={data.soilAndWater ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
