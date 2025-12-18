import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorSupportMutation,
  useVendorSupportQuery,
  useVendorSupportUpdateMutation,
} from "@/src/hooks/vendorQueryHooks";
import { supportServicesSchema } from "@/src/schemas/vendor/support.schema";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Alert } from "react-native";
import SupportSection from "../sections/SupportSection";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { useAuth } from "@/src/contexts/AuthContext";
import { ROUTES } from "@/src/constants/routes";

export default function SupportScreen() {
  const { vendorProfileId, userId } = useAuth();

  const { data } = useVendorSupportQuery(vendorProfileId);

  const { mutateAsync: save, isPending: isSaving } = useVendorSupportMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useVendorSupportUpdateMutation();

  const form = useZodForm(supportServicesSchema);
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  useEffect(() => {
    if (!data) return;

    setValue("advisorySupport", data.advisorySupport ? "yes" : "no");
    setValue("fieldStaffAvailable", data.fieldStaffAvailable ? "yes" : "no");
    setValue("fieldStaffCount", data.fieldStaffCount?.toString() ?? "");
    setValue("afterSalesService", data.afterSalesService ?? "");
    setValue("deliveryRange", String(data.deliveryRange ?? ""));
    setValue("computerAvailable", data.computerAvailable ? "yes" : "no");
    setValue("vehicleAvailable", data.vehicleAvailable ? "yes" : "no");
  }, [data]);

  const onSubmit = async (values) => {
    const payload = {
      supplierProfileId: vendorProfileId,
      ...values,
      fieldStaffAvailable: values.fieldStaffAvailable,
      fieldStaffCount: values.fieldStaffAvailable
        ? Number(values.fieldStaffCount)
        : null,
      deliveryRange: Number(values.deliveryRange),
    };

    try {
      if (data) {
        await update(payload);
        showSuccessToast("Support info updated ");
      } else {
        await save(payload);
        showSuccessToast("Support info added ");
      }

      router.replace(ROUTES.AUTH.VENDOR_PROFILE);
    } catch (err) {
      showErrorToast("Error saving data", err.message || "Unknown error");
    }
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Support Services"
        onPress={() => router.replace(ROUTES.AUTH.VENDOR_PROFILE)}
      />
      <FormProvider {...form}>
        <SupportSection errors={errors} control={control} />
        <FormActions
          cancelLabel={"Cancel"}
          onCancel={() => router.back()}
          submitLabel={data ? "Update" : "Add"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
          loading={isSaving || isUpdating}
        />
      </FormProvider>
    </ScreenLayout>
  );
}
