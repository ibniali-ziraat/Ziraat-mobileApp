import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { View } from "react-native";

import ChipInput from "@/src/components/form/inputs/ChipInput";
import FormInput from "@/src/components/form/inputs/FormInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";

export default function OperationalSection({ control, errors }) {
  const { setValue } = useFormContext();

  const deliveryServiceAvailable = useWatch({
    control,
    name: "deliveryServiceAvailable",
  });

  // 👉 Auto-clear service area when user selects "no"
  useEffect(() => {
    if (deliveryServiceAvailable === "no") {
      setValue("serviceArea", []);
    }
  }, [deliveryServiceAvailable]);

  return (
    <View>
      <FormInput
        control={control}
        name="yearsInBusiness"
        label="Years in Business"
        type="phone"
        error={errors?.yearsInBusiness?.message}
      />

      <View className="mb-6">
        <ChipInput
          control={control}
          name="companyTieups"
          label="Company Tieups (if any)"
          placeholder="Add Company Tieups"
          error={errors?.companyTieups}
          optional
        />
      </View>

      <SingleSelectInput
        control={control}
        name="deliveryServiceAvailable"
        label="Delivery Service Available"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        error={errors?.deliveryServiceAvailable}
      />

      {deliveryServiceAvailable === "yes" && (
        <ChipInput
          control={control}
          name="serviceArea"
          label="Service Areas"
          placeholder="Add Service Areas"
          error={errors?.serviceArea}
        />
      )}

      <FormInput
        control={control}
        name="avgMonthlySalesVolume"
        label="Average Monthly Sales Volume"
        type="phone"
        error={errors?.avgMonthlySalesVolume?.message}
        optional
      />
    </View>
  );
}
