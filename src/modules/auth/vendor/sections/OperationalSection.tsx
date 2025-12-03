import { useWatch } from "react-hook-form";
import { View } from "react-native";

import ChipInput from "@/src/components/form/inputs/ChipInput";
import FormInput from "@/src/components/form/inputs/FormInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";

export default function OperationalSection({ control, errors }) {
  // Watch deliveryServiceAvailable field
  const deliveryServiceAvailable = useWatch({
    control,
    name: "deliveryServiceAvailable",
  });

  const serviceAreas = useWatch({
    control,
    name: "serviceArea",
  });

  return (
    <View style={{ padding: 20, gap: 12 }}>
      {/* Years in Business */}
      <FormInput
        control={control}
        name="yearsInBusiness"
        label="Years in Business"
        type="phone"
        error={errors?.yearsInBusiness?.message}
      />

      {/* Company Tieups */}
      <ChipInput
        control={control}
        name="companyTieups"
        label="Company Tieups (if any)"
        placeholder="Add Company Tieups"
        error={errors?.companyTieups?.message}
        optional
      />

      {/* Delivery Service Available */}
      <SingleSelectInput
        control={control}
        name="deliveryServiceAvailable"
        label="Delivery Service Available"
        options={[
          { value: "", label: "Select" },
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        error={errors?.deliveryServiceAvailable}
      />

      {/* Service Areas (only if delivery service available) */}
      {deliveryServiceAvailable === "yes" && (
        <ChipInput
          control={control}
          name="serviceArea"
          label="Service Areas"
          placeholder="Add Service Areas"
          error={
            serviceAreas?.length === 0
              ? { message: "At least one service area is required." }
              : errors?.serviceArea?.message
          }
        />
      )}

      {/* Average Monthly Sales Volume */}
      <FormInput
        control={control}
        name="avgMonthlySalesVolume"
        label="Average Monthly Sales Volume"
        type="number"
        error={errors?.avgMonthlySalesVolume?.message}
        optional
      />
    </View>
  );
}
