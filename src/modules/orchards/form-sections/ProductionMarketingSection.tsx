// StepG_ProductionMarketing.js

import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { View } from "react-native";

import FormDateInput from "@/src/components/form/inputs/FormDateInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";

export default function ProductionMarketingSection({ control, errors }: any) {
  // Map-ready dropdown format
  console.log(errors, "errors in pms");

  const sellingOptions = [
    "Trader",
    "Mandi",
    "Direct to Consumer",
    "Contract Farming",
    "Exporter",
    "Retail",
  ].map((x) => ({
    label: x,
    value: x,
  }));

  const YIELD_UNITS = ["BOXES", "CRATES", "KILO GRAMS"].map((x) => ({
    label: x,
    value: x,
  }));

  return (
    <View className="flex-1 w-full">
      <View className="bg-light w-full">
        <SingleSelectInput
          name="yieldUnit"
          label="Yield Unit"
          modalLabel="Select Yield Unit"
          options={YIELD_UNITS}
          error={errors?.soilType?.message}
        />
        <FormTextInput
          name="averageAnnualYield"
          label="Average Annual Yield"
          type="pincode"
          error={errors.averageAnnualYield}
          required
        />

        <FormDateInput
          control={control}
          name="peakHarvestFromMonth"
          label="Peak Harvest Season (Month)"
          error={errors.peakHarvestSeason?.message}
        />
        <FormDateInput
          control={control}
          name="peakHarvestToMonth"
          label="Peak Harvest Season (Month)"
          error={errors.peakHarvestSeason?.message}
        />

        <SingleSelectInput
          name="sellingPreference"
          label="Selling Preference"
          options={sellingOptions}
          modalLabel="Selling Preference"
          error={errors.sellingPreference?.message}
        />

        {/* Buyer Details (OPTIONAL) */}
        <FormTextInput
          name="buyerName"
          label="Buyer Name (Optional)"
          placeholder="Buyer Name"
          error={errors.buyerDetails}
        />
        <FormTextInput
          name="buyerContact"
          label="Buyer Contact (Optional)"
          placeholder="Buyer Contact"
          error={errors.buyerContact}
          type="phone"
        />
      </View>
    </View>
  );
}
