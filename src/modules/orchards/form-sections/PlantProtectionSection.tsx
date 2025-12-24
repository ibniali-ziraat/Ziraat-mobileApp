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
        {/* <CsText className="text-lg font-semibold mb-3 text-primary">
          Plant Protection & Health
       </CsText> */}

        {/* 1️⃣ Disease History */}
        {/* <CheckboxGroup
          control={control}
          name="diseases"
          label="Disease History"
          options={diseaseList}
          error={errors.diseases?.message}
        /> */}

        <MultiSelectInput
          name="diseases"
          control={control}
          label="Disease History"
          options={DISEASE_LIST}
          error={errors?.diseases?.message}
        />

        <MultiSelectInput
          name="pests"
          control={control}
          label="Pest History"
          options={PEST_LIST}
          error={errors?.pests?.message}
        />

        {/* <FormInput
          control={control}
          name="spraySchedule"
          label="Spray Schedule (Optional)"
          optional={true}
          icon="calendar-clock"
          error={errors.spraySchedule?.message}
        /> */}

        <ChipInput
          control={control}
          name="spraySchedule"
          label="Spray Schedule (Optional)"
          placeholder="Spray Schedule "
          error={errors?.spraySchedule}
        />

        <SingleSelectInput
          control={control}
          name="cropInsurance"
          modalLabel="Crop Insurance"
          label="Crop Insurance Coverage"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
          error={errors.cropInsurance}
        />
      </View>
    </View>
  );
}
