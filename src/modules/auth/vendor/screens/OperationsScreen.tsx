import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, Button } from "react-native";

import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorOperationsMutation,
  useVendorOperationsQuery,
  useVendorOperationsUpdateMutation,
} from "@/src/hooks/vendorQueryHooks";

import { useGlobalData } from "@/src/contexts/GlobalDataContext";
import { operationalDetailsSchema } from "@/src/schemas/vendor/operations.schema";
import { router } from "expo-router";
import OperationalSection from "../sections/OperationalSection";

export default function OperationsScreen() {
  const { vendorData } = useGlobalData();
  console.log(vendorData, "vendorssdata");

  const { data } = useVendorOperationsQuery(vendorData.profileId);

  const { mutateAsync: save } = useVendorOperationsMutation();
  const { mutateAsync: update } = useVendorOperationsUpdateMutation();

  const form = useZodForm(operationalDetailsSchema);
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  // Prefill form when backend data arrives
  useEffect(() => {
    if (!data) return;

    setValue("yearsInBusiness", String(data.yearsInBusiness));
    setValue(
      "deliveryServiceAvailable",
      data.deliveryServiceAvailable ? "yes" : "no"
    );
    setValue("avgMonthlySalesVolume", String(data.avgMonthlySalesVolume));

    // Prefill as string arrays
    setValue("companyTieups", data.companyTieups?.map((x) => x.name) ?? []);
    setValue("serviceArea", data.serviceAreas?.map((x) => x.placeName) ?? []);
  }, [data]);

  const onSubmit = async (val) => {
    console.log("submitted: ", val);

    const payload = {
      // operationalId: data?.id,
      supplierProfileId: vendorData.profileId,
      yearsInBusiness: +val.yearsInBusiness,
      deliveryServiceAvailable: val.deliveryServiceAvailable === "yes",
      serviceArea: val.deliveryServiceAvailable ? val.serviceArea : [],
      avgMonthlySalesVolume: +val.avgMonthlySalesVolume,

      companyTieups: val.companyTieups ?? [],
      // serviceArea: val.serviceArea ?? [],
    };

    try {
      data ? await update(payload) : await save(payload);
      Alert.alert("Operations Saved!");
      router.push("/auth/vendor/vendor-profile-screen");
    } catch (error) {
      Alert.alert("Error saving operations", error.message || "Unknown error");
    }
  };

  return (
    <FormProvider {...form}>
      <OperationalSection control={control} errors={errors} />
      <Button title="Save" onPress={handleSubmit(onSubmit)} />
    </FormProvider>
  );
}
