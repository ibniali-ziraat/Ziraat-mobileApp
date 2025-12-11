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

export default function LicenseScreen() {
  const { userData, vendorData } = useGlobalData();
  console.log(vendorData.profileId, "vendorprofileid");

  const { data } = useVendorLicenseQuery(vendorData.profileId);
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
          supplierProfileId: vendorData.profileId,
          ...values,
        };
        await update(payload);
      } else {
        const payload = {
          supplierProfileId: vendorData.profileId,
          ...values,
        };
        await save(payload);
      }

      Alert.alert("License Saved!");
      router.push("/auth/vendor/vendor-profile-screen");
    } catch (err) {
      console.error(err);
      Alert.alert("Error saving license");
    }
  };

  return (
    <ScreenLayout>
      <BackHeader title="Licensing & Compliance" />
      <FormProvider {...form}>
        <LicenseSection errors={errors} control={control} />
        <FormActions
          cancelLabel={"Cancel"}
          submitLabel={"Next"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
        />
      </FormProvider>
    </ScreenLayout>
  );
}
