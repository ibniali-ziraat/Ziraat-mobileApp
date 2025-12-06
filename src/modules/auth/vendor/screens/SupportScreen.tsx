import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorSupportMutation,
  useVendorSupportQuery,
  useVendorSupportUpdateMutation,
} from "@/src/hooks/vendorQueryHooks";
import { supportServicesSchema } from "@/src/schemas/vendor/support.schema";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, Button, ScrollView } from "react-native";
import SupportSection from "../sections/SupportSection";

export default function SupportScreen() {
  const { vendorId } = useAuth();
  const { data } = useVendorSupportQuery(vendorId);

  const { mutateAsync: save } = useVendorSupportMutation();
  const { mutateAsync: update } = useVendorSupportUpdateMutation();

  const form = useZodForm(supportServicesSchema);
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  useEffect(() => {
    if (!data) return;

    setValue(
      "agronomyAdvisorySupport",
      data.agronomyAdvisorySupport ? "yes" : "no"
    );
    setValue("fieldStaffAvailable", data.fieldStaffAvailable);
    setValue("numberOfStaff", data.numberOfStaff);
    setValue("afterSalesService", data.afterSalesService);
    setValue(
      "preferredDeliveryAreaRangeSqKm",
      data.preferredDeliveryAreaRangeSqKm
    );
    setValue("computerFacilityAvailable", data.computerFacilityAvailable);
    setValue("deliveryVehicleAvailable", data.deliveryVehicleAvailable);
  }, [data]);

  const onSubmit = async (values) => {
    const payload = {
      supplierProfileId: vendorId,
      ...values,
    };
    data ? await update(payload) : await save(payload);
    Alert.alert("Support Info Saved!");
  };

  return (
    <ScrollView>
      <FormProvider {...form}>
        <SupportSection errors={errors} control={control} />
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </FormProvider>
    </ScrollView>
  );
}
