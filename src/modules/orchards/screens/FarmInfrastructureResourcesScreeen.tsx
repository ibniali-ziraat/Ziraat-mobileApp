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

import { useAuth } from "@/src/contexts/AuthContext";
import FarmInfrastructure from "../form-sections/FarmInfrastructureSection";
import {
  useCreateInfrastructureMutation,
  useInfrastructureQuery,
  useUpdateInfrastructureMutation,
} from "../hooks/useOrchardsQuery";

export default function FarmInfrastructureScreen() {
  const { orchardProfileId } = useAuth();
  console.log(orchardProfileId, "orchardprofile id in orchard.service");

  const { data: infrastructureData } = useInfrastructureQuery(
    orchardProfileId!,
  );
  console.log(infrastructureData, "crop nutrition data...");

  const { mutateAsync: save, isPending: isSaving } =
    useCreateInfrastructureMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateInfrastructureMutation();
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
        id: infrastructureData?.id,
        orchardProfileId: orchardProfileId!,
        ...values,
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
      router.replace(ROUTES.TABS.ORCHARDS);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message ||
          "Failed to save farm infrastructure information",
      );
    }
  };

  /**
   * Loading / Error guards
   */
  // if (isPending) return null;

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
            onCancel={() => router.back()}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isSaving || isUpdating}
            loading={isSaving || isUpdating}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
