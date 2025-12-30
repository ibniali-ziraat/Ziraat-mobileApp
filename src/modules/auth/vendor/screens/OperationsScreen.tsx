import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorOperationsMutation,
  useVendorOperationsQuery,
  useVendorOperationsUpdateMutation,
} from "../hooks/vendorQueryHooks";

import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { operationalDetailsSchema } from "@/src/modules/auth/vendor/schemas/operations.schema";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import OperationalSection from "../sections/OperationalSection";

export default function OperationsScreen() {
  const { vendorProfileId } = useAuth();

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
      if (data) {
        await update(payload);
        showSuccessToast("Changes updated ");
      } else {
        await save(payload);
        showSuccessToast("Changes saved ");
      }

      router.replace(ROUTES.AUTH.VENDOR_PROFILE);
    } catch (error) {
      showErrorToast(
        "Error saving operations",
        error.message || "Unknown error"
      );
    }
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Operational Details"
        desc="Provide information about your business operations."
        onPress={() => router.replace(ROUTES.AUTH.VENDOR_PROFILE)}
      />
      <FormProvider {...form}>
        <OperationalSection control={control} errors={errors} />
        <FormActions
          cancelLabel={"Cancel"}
          onCancel={() => router.replace(ROUTES.AUTH.VENDOR_PROFILE)}
          submitLabel={data ? "Update" : "Save"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
          loading={isSaving || isUpdating}
        />
      </FormProvider>
    </ScreenLayout>
  );
}
