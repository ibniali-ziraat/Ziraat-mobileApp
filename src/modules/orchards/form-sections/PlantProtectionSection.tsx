// StepE_PlantProtection.js
import { View } from "react-native";

import ChipInput from "@/src/components/form/inputs/ChipInput";
import MultiSelectInput from "@/src/components/form/inputs/MultiSelectInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { FormSectionProps } from "@/src/types/formSectionProps";

export default function PlantProtection({ control, errors }: FormSectionProps) {
  const insuranceOptions = ["Yes", "No"];
  const DISEASE_LIST = [
    "Scab",
    "Alternaria",
    "Powdery Mildew",
    "Fire Blight",
    "Marssonina",
    "Root Rot",
  ].map((x) => ({ label: x, value: x }));

  const PEST_LIST = [
    "Aphids",
    "Mites",
    "Codling Moth",
    "Leaf Miner",
    "San Jose Scale",
    "Borers",
  ].map((x) => ({ label: x, value: x }));

  return (
    <View className="flex-1 w-full">
      <View className="bg-light w-full">
        <MultiSelectInput
          name="diseaseHistory"
          control={control}
          label="Disease History (optional)"
          placeholder="Disease History"
          options={DISEASE_LIST}
          error={errors?.diseases?.message}
          optional
        />

        <MultiSelectInput
          name="pestHistory"
          control={control}
          label="Pest History (optional)"
          placeholder="Pest History"
          options={PEST_LIST}
          error={errors?.pests?.message}
          optional
        />

        <ChipInput
          control={control}
          name="spraySchedule"
          label="Spray Schedule (Optional)"
          placeholder="Spray Schedule "
          error={errors?.spraySchedule}
        />

        <SingleSelectInput
          control={control}
          name="isCropInsuranceCovered"
          modalLabel="Crop Insurance"
          label="Crop Insurance Coverage"
          options={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
          error={errors.cropInsurance}
        />
      </View>
    </View>
  );
}
