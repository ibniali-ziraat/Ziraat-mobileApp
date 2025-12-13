import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Alert } from "react-native";

import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorOperationsMutation,
  useVendorOperationsQuery,
  useVendorOperationsUpdateMutation,
} from "@/src/hooks/vendorQueryHooks";

import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { useGlobalData } from "@/src/contexts/GlobalDataContext";
import { operationalDetailsSchema } from "@/src/schemas/vendor/operations.schema";
import { router } from "expo-router";
import OperationalSection from "../sections/OperationalSection";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { useAuth } from "@/src/contexts/AuthContext";
import { ROUTES } from "@/src/constants/routes";

export default function OperationsScreen() {
  const { vendorData } = useGlobalData();
  const { vendorProfileId } = useAuth()
  console.log(vendorData, "vendorssdata");

  const { data } = useVendorOperationsQuery(vendorProfileId);

  const { mutateAsync: save, isPending: isSaving } =
    useVendorOperationsMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useVendorOperationsUpdateMutation();

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
      supplierProfileId: vendorProfileId,
      yearsInBusiness: +val.yearsInBusiness,
      deliveryServiceAvailable: val.deliveryServiceAvailable === "yes",
      serviceArea: val.deliveryServiceAvailable ? val.serviceArea : [],
      avgMonthlySalesVolume: +val.avgMonthlySalesVolume,

      companyTieups: val.companyTieups ?? [],
      // serviceArea: val.serviceArea ?? [],
    };

    try {
      data ? await update(payload) : await save(payload);
      showSuccessToast("Operations Saved!");
      router.push(ROUTES.AUTH.VENDOR_PROFILE);

    } catch (error) {
      showErrorToast("Error saving operations", error.message || "Unknown error");
    }
  };

  return (
    <ScreenLayout>
      <BackHeader title="Operational Details"
        onPress={() => router.push(ROUTES.VENDOR.PROFILE)}
      />
      <FormProvider {...form}>
        <OperationalSection control={control} errors={errors} />
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
