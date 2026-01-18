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
import PlantProtection from "../form-sections/PlantProtectionSection";
import {
  useCreateOrchardBasinInfoMutation,
  useOrchardByIdQuery,
  useUpdateOrchardBasicInfoMutation,
} from "../hooks/useOrchardsQuery";

export default function PlantProtectionScreen() {
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
    if (!data?.plantHealth) return;

    Object.entries(data?.plantHealth).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
  }, [data?.plantHealth]);

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        id: data?.id,
        plantHealth: {
          ...values,
        },
      };

      if (data?.plantHealth) {
        await update(payload);
        showSuccessToast("Plant Protection updated");
      } else {
        await save(payload);
        showSuccessToast("Plant Protection saved");
      }

      router.push(ROUTES.ORCHARDS.REGISTRATION.PRODUCTION_INFO);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save plant protection"
      );
    }
  };

  if (isPending) return null;

  return (
    <ScreenLayout>
      <BackHeader
        title="Orchard Registration"
        desc="Plant Protection & Health"
      />

      <ScreenContent>
        <FormProvider {...form}>
          <PlantProtection errors={errors} control={control} />

          <FormActions
            cancelLabel="Cancel"
            submitLabel={data?.plantHealth ? "Update" : "Save"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
