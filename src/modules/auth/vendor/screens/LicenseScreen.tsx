import { useAuth } from "@/src/contexts/AuthContext";
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
import { Alert, Button } from "react-native";
import LicenseSection from "../sections/LicenseSection";

export default function LicenseScreen() {
  const { vendorId } = useAuth();
  const { data } = useVendorLicenseQuery(vendorId);

  const { mutateAsync: save } = useVendorLicenseMutation();
  const { mutateAsync: update } = useVendorLicenseUpdateMutation();

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
    try {
      if (data) {
        // Update existing license using licensingId
        const payload = {
          licensingId: data.id, // existing license id
          supplierProfileId: vendorId,
          ...values,
        };
        await update(payload);
      } else {
        // Save new license using supplierProfileId
        const payload = {
          supplierProfileId: vendorId,
          ...values,
        };
        await save(payload);
      }

      Alert.alert("License Saved!");
      router.push("/auth/vendor/vendor-profile-screen"); // navigate after saving
    } catch (err) {
      console.error(err);
      Alert.alert("Error saving license");
    }
  };

  return (
    <FormProvider {...form}>
      <LicenseSection errors={errors} control={control} />
      <Button title="Save" onPress={handleSubmit(onSubmit)} />
    </FormProvider>
  );
}
