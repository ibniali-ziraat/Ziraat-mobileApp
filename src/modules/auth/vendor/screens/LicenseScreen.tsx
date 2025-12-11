import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { useGlobalData } from "@/src/contexts/GlobalDataContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorLicenseMutation,
  useVendorLicenseQuery,
  useVendorLicenseUpdateMutation,
} from "@/src/hooks/vendorQueryHooks";
import { licensingComplianceSchema } from "@/src/schemas/vendor/licensing.schema";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Alert } from "react-native";
import LicenseSection from "../sections/LicenseSection";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { useAuth } from "@/src/contexts/AuthContext";
import { ROUTES } from "@/src/constants/routes";

export default function LicenseScreen() {

  const { vendorProfileId } = useAuth()



  const { data } = useVendorLicenseQuery(vendorProfileId);
  const { mutateAsync: save, isPending: isSaving } = useVendorLicenseMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useVendorLicenseUpdateMutation();
  const form = useZodForm(licensingComplianceSchema);
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  useEffect(() => {
    if (!data) return;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key, value);
      }
    });
  }, [data]);

  const onSubmit = async (values) => {
    console.log("logged...");

    try {
      if (data) {
        const payload = {
          licensingId: data?.id,
          supplierProfileId: vendorProfileId,
          ...values,
        };
        await update(payload);
      } else {
        const payload = {
          supplierProfileId: vendorProfileId,
          ...values,
        };
        await save(payload);
      }

      showSuccessToast("License Saved!");
      router.push(ROUTES.AUTH.VENDOR_PROFILE);
    } catch (err) {
      console.error(err);
      showErrorToast("Error saving license");
    }
  };

  return (
    <ScreenLayout>
      <BackHeader title="Licensing & Compliance" />
      <FormProvider {...form}>
        <LicenseSection errors={errors} control={control} />
        <FormActions
          cancelLabel={"Cancel"}
          submitLabel={data ? "Update" : "Next"}

          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
          loading={isSaving || isUpdating}
          onCancel={() => router.back()}
        />
      </FormProvider>
    </ScreenLayout>
  );
}
