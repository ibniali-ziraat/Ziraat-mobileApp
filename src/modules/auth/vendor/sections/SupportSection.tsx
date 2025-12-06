import FormInput from "@/src/components/form/inputs/FormInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { FormSectionProps } from "@/src/types/formSectionProps";
import { useWatch } from "react-hook-form";
import { View } from "react-native";

export default function SupportSection({ control, errors }: FormSectionProps) {
  const fieldStaffAvailable = useWatch({
    control,
    name: "fieldStaffAvailable",
    defaultValue: false,
  });

  return (
    <View style={{ padding: 20, gap: 12 }}>
      <SingleSelectInput
        control={control}
        name="agronomyAdvisorySupport"
        label="Agronomy Advisory Support"
        options={[
          { value: "", label: "Select" },
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        error={errors?.agronomyAdvisorySupport}
      />

      <SingleSelectInput
        control={control}
        name="fieldStaffAvailable"
        label="Field Staff Available"
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        error={errors?.fieldStaffAvailable}
      />

      {fieldStaffAvailable && (
        <FormInput
          control={control}
          name="numberOfStaff"
          label="Number of Field Staff"
          type="phone"
          error={errors?.numberOfStaff?.message}
        />
      )}

      <FormInput
        control={control}
        name="afterSalesService"
        label="After-Sales Service (Warranty / Return / Replacement policy)"
        error={errors?.afterSalesService?.message}
      />

      <FormInput
        control={control}
        name="preferredDeliveryAreaRangeSqKm"
        label="Preferred Delivery Area Range (Sq. KMs)"
        type="phone"
        error={errors?.preferredDeliveryAreaRangeSqKm?.message}
      />

      <SingleSelectInput
        control={control}
        name="computerFacilityAvailable"
        label="Computer/Laptop Facility Available"
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        error={errors?.computerFacilityAvailable}
      />

      <SingleSelectInput
        control={control}
        name="deliveryVehicleAvailable"
        label="Vehicle for Delivery / Two Wheeler"
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        error={errors?.deliveryVehicleAvailable}
      />
    </View>
  );
}
