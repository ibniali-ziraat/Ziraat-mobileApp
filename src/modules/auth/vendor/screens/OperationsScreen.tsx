import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, Button } from "react-native";

import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorOperationsMutation,
  useVendorOperationsQuery,
  useVendorOperationsUpdateMutation,
} from "@/src/hooks/vendorQueryHooks";

import { operationalDetailsSchema } from "@/src/schemas/vendor/operations.schema";
import OperationalSection from "../sections/OperationalSection";

export default function OperationsScreen() {
  const { vendorId } = useAuth();
  const { data } = useVendorOperationsQuery(vendorId);

  const { mutateAsync: save } = useVendorOperationsMutation();
  const { mutateAsync: update } = useVendorOperationsUpdateMutation();

  // Initialize form with empty defaults
  const form = useZodForm(operationalDetailsSchema, {
    defaultValues: {
      yearsInBusiness: "",
      deliveryServiceAvailable: "",
      avgMonthlySalesVolume: "",
      serviceArea: [],
      companyTieups: [],
    },
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  // Prefill form when backend data arrives
  useEffect(() => {
    if (!data) return;
    console.log(data, "data////");

    setValue("yearsInBusiness", String(data.yearsInBusiness));
    setValue(
      "deliveryServiceAvailable",
      data.deliveryServiceAvailable ? "yes" : "no"
    );
    setValue("avgMonthlySalesVolume", String(data.avgMonthlySalesVolume));

    setValue(
      "companyTieups",
      data.companyTieups?.map((x) => ({ name: x.name })) ?? []
    );

    setValue(
      "serviceArea",
      data.serviceAreas?.map((x) => ({ name: x.placeName })) ?? []
    );
  }, [data, setValue]);

  // Submit handler: transform strings → backend objects
  const onSubmit = async (val) => {
    const payload = {
      supplierProfileId: vendorId,
      yearsInBusiness: Number(val.yearsInBusiness),
      deliveryServiceAvailable: val.deliveryServiceAvailable === "yes",
      avgMonthlySalesVolume: Number(val.avgMonthlySalesVolume),
      companyTieups: val.companyTieups.map((name) => ({ name })),
      serviceAreas: val.serviceArea.map((placeName) => ({ placeName })),
    };

    try {
      data ? await update(payload) : await save(payload);
      Alert.alert("Operations Saved!");
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
