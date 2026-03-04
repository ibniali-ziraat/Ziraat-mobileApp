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
import OptionalFutureFields from "../form-sections/FutureFieldSection";
import {
  useCreateOrchardExtraMutation,
  useOrchardExtraQuery,
  useUpdateOrchardExtraMutation,
} from "../hooks/useOrchardsQuery";
import { OptionalFutureFieldsSchema } from "../schemas/OptionalFutureFieldsSchema";

export default function FutureProofFieldScreen() {
  const { orchardProfileId } = useAuth();
  console.log(orchardProfileId, "orchardprofile id in orchard.service");

  const { data: orchardExtraData } = useOrchardExtraQuery(orchardProfileId!);

  const { mutateAsync: save, isPending: isSaving } =
    useCreateOrchardExtraMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateOrchardExtraMutation();
  const form = useZodForm(OptionalFutureFieldsSchema);
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
    if (!orchardExtraData) return;

    Object.entries(orchardExtraData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key as any, value);
      }
    });
  }, [orchardExtraData]);

  /**
   * Submit handler
   */
  const onSubmit = async (values: any) => {
    try {
      const payload = {
        id: orchardExtraData?.id,
        ...values,
        orchardProfileId,
      };

      if (orchardExtraData) {
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
          "Failed to save orchard optional fields",
      );
    }
  };

  // if (isPending) return null;

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
            submitLabel={orchardExtraData ? "Update" : "Save"}
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
