import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorLicenseMutation,
  useVendorLicenseQuery,
  useVendorLicenseUpdateMutation,
} from "@/src/hooks/vendorQueryHooks";
import { licensingComplianceSchema } from "@/src/modules/auth/vendor/schemas/licensing.schema";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import LicenseSection from "../sections/LicenseSection";

export default function LicenseScreen() {
  const { vendorProfileId } = useAuth();

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
      if (value === null || value === undefined) return;

      if (key === "licenseCopyUrl" && typeof value === "string") {
        setValue("licenseCopyUrl", {
          uri: value,
          name: value.split("/").pop() || "License File",
          type: "application/octet-stream",
          isRemote: true,
        });
        return;
      }

      setValue(key as any, value);
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
        showSuccessToast("License Updated");
      } else {
        const payload = {
          supplierProfileId: vendorProfileId,
          ...values,
        };
        await save(payload);
        showSuccessToast("License Saved!");
      }

      router.replace(ROUTES.AUTH.VENDOR_PROFILE);
    } catch (err) {
      console.error(err);
      showErrorToast("Error saving license");
    }
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Licensing & Compliance"
  desc="Enter your professional license details below."
        onPress={() => router.replace(ROUTES.AUTH.VENDOR_PROFILE)}
      />
      <FormProvider {...form}>
        <LicenseSection errors={errors} control={control} />
        <FormActions
          cancelLabel={"Cancel"}
          submitLabel={data ? "Update" : "Add"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
          loading={isSaving || isUpdating}
          onCancel={() => router.back()}
        />
      </FormProvider>
    </ScreenLayout>
  );
}
