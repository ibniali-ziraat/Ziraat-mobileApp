import FormInput from "@/src/components/form/inputs/FormInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { FormSectionProps } from "@/src/types/formSectionProps";
import { useWatch } from "react-hook-form";
import { View } from "react-native";

export default function SupportSection({ control, errors }: FormSectionProps) {
  const fieldStaffAvailable = useWatch({
    control,
    name: "fieldStaffAvailable",
    defaultValue: "no",
  });

  return (
    <View style={{ gap: 12 }}>
      <SingleSelectInput
        control={control}
        name="advisorySupport"
        modalLabel="Advisory Support"
        label="Agronomy Advisory Support"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        error={errors?.advisorySupport}
      />

      <SingleSelectInput
        control={control}
        name="fieldStaffAvailable"
        label="Field Staff Available"
        modalLabel="Field Staff Availability"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        error={errors?.fieldStaffAvailable}
      />

      {fieldStaffAvailable === "yes" && (
        <FormInput
          control={control}
          name="fieldStaffCount"
          label="Number of Field Staff"
          type="phone"
          error={errors?.fieldStaffCount?.message}
        />
      )}

      <FormInput
        control={control}
        name="afterSalesService"
        label="After-Sales Service Policy"
        error={errors?.afterSalesService?.message}
      />

      <FormInput
        control={control}
        name="deliveryRange"
        label="Preferred Delivery Area Range (Sq. KMs)"
        type="phone"
        error={errors?.deliveryRange?.message}
      />

      <SingleSelectInput
        control={control}
        name="computerAvailable"
        label="Computer/Laptop Facility"
        modalLabel="Computer/Laptop Facility"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        error={errors?.computerAvailable}
      />

      <SingleSelectInput
        control={control}
        name="vehicleAvailable"
        label="Vehicle for Delivery / Two Wheeler"
        modalLabel="Vehicle Availability"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        error={errors?.vehicleAvailable}
      />
    </View>
  );
}
