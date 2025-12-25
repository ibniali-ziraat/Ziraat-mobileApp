// StepG_ProductionMarketing.js

import FormInput from "@/src/components/form/inputs/FormInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { View } from "react-native";

import FormDateInput from "@/src/components/form/inputs/FormDateInput";
import { sellingPreferenceOptions } from "@/src/modules/orchards/schemas/ProductionMarketingSchema";

export default function ProductionMarketing({ control, errors }: any) {
  // Map-ready dropdown format
  const sellingOptions = sellingPreferenceOptions.map((x) => ({
    label: x,
    value: x,
  }));

  // Dynamic form field list
  const productionFields = [
    {
      name: "",
      label: "Average Annual Yield (Boxes / Kilos)",
      icon: "chart-bar",
    },
  ];

  return (
    <View className="flex-1 w-full">
      {/* Page Heading */}
      {/* <CsText className="text-2xl font-bold mb-4 text-center text-primary">
        Production & Marketing
     </CsText> */}

      <View className="bg-light w-full">
        {/* <CsText className="text-lg font-semibold mb-3 text-primary">
          Production & Marketing Information
       </CsText> */}

        {/* Repeated text inputs (Yield + Harvest Season) */}

        <FormInput
          control={control}
          name="annualYield"
          label="Average Annual Yield (Boxes / Kilos)"
          type="phone"
          error={errors.annualYield?.message}
        />

        <FormDateInput
          control={control}
          name="peakHarvestSeason"
          label="Peak Harvest Season (Month / Duration)"
          error={errors.peakHarvestSeason?.message}
        />

        {/* Selling Preference */}
        <SingleSelectInput
          control={control}
          name="sellingPreference"
          label="Selling Preference"
          options={sellingOptions}
          error={errors.sellingPreference?.message}
        />

        {/* Buyer Details (OPTIONAL) */}
        <FormInput
          control={control}
          name="buyerDetails"
          label="Buyer Details (Optional)"
          optional={true}
          icon="account-box"
          iconColor="secondary"
          error={errors.buyerDetails}
        />
      </View>
    </View>
  );
}
