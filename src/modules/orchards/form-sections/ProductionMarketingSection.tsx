// StepG_ProductionMarketing.js

import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { View } from "react-native";

import FormDateInput from "@/src/components/form/inputs/FormDateInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";

export default function ProductionMarketing({ control, errors }: any) {
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

  // Dynamic form field list
  const productionFields = [
    {
      name: "",
      label: "Average Annual Yield (Boxes / Kilos)",
      icon: "chart-bar",
    },
  ];

  const YIELD_UNITS = ["BOXES", "CRATES", "KILO GRAMS"].map((x) => ({
    label: x,
    value: x,
  }));

  return (
    <View className="flex-1 w-full">
      <View className="bg-light w-full">
        <SingleSelectInput
          control={control}
          name="yieldUnit"
          label="Yield Unit"
          modalLabel="yieldUnit"
          options={YIELD_UNITS}
          error={errors?.soilType?.message}
        />
        <FormTextInput
          control={control}
          name="averageAnnualYield"
          label="Average Annual Yield"
          type="pincode"
          error={errors.averageAnnualYield}
          required
        />

        <FormDateInput
          control={control}
          name="peakHarvestFromMonth"
          label="Peak Harvest Season (Month / Duration)"
          error={errors.peakHarvestSeason?.message}
        />
        <FormDateInput
          control={control}
          name="peakHarvestToMonth"
          label="Peak Harvest Season (Month / Duration)"
          error={errors.peakHarvestSeason?.message}
        />

        {/* Selling Preference */}
        <SingleSelectInput
          control={control}
          name="sellingPreference"
          label="Selling Preference"
          options={sellingOptions}
          modalLabel="Selling Preference"
          error={errors.sellingPreference?.message}
        />

        {/* Buyer Details (OPTIONAL) */}
        <FormTextInput
          control={control}
          name="buyerName"
          label="Buyer Name (Optional)"
          placeholder="Buyer Name"
          optional
          icon="account-box"
          iconColor="secondary"
          error={errors.buyerDetails}
        />
        <FormTextInput
          control={control}
          name="buyerContact"
          label="Buyer Contact (Optional)"
          placeholder="Buyer Contact"
          optional={true}
          icon="account-box"
          iconColor="secondary"
          error={errors.buyerContact}
        />
      </View>
    </View>
  );
}
