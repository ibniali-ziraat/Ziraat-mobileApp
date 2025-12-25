// StepF_FarmInfrastructure.js

import { View } from "react-native";

import FormInput from "@/src/components/form/inputs/FormInput";

import MultiSelectInput from "@/src/components/form/inputs/MultiSelectInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";

export default function FarmInfrastructureScreen({ control, errors }) {
  const EQUIPMENT_OPTIONS = [
    "Tractor",
    "Sprayer",
    "Grading Line",
    "Power Weeder",
    "Weather Station",
    "Sensors",
    "Rotavator",
    "Plough",
    "Other",
  ].map((x) => ({ label: x, value: x }));

  const STORAGE_OPTIONS = [
    "Tractor",
    "Sprayer",
    "Grading Line",
    "Power Weeder",
    "Weather Station",
    "Sensors",
    "Rotavator",
    "Plough",
    "Other",
  ].map((x) => ({ label: x, value: x }));

  return (
    <View className="flex-1 w-full">
      <View className="bg-light w-full">
        {/* <CheckboxGroup
          control={control}
          name="equipmentOwned"
          label="Equipment Owned"
          options={equipmentOptions}
          error={errors.equipmentOwned?.message}
        /> */}
        <MultiSelectInput
          name="equipmentOwned"
          control={control}
          label="Equipment Owned"
          options={EQUIPMENT_OPTIONS}
          error={errors?.equipmentOwned?.message}
        />

        {/* 2️⃣ Storage Facilities (REQUIRED) */}
        {/* <CheckboxGroup
          control={control}
          name="storageFacility"
          label="Storage Facilities"
          options={storageOptions}
          error={errors.storageFacility?.message}
        /> */}

        <MultiSelectInput
          name="storageFacility"
          control={control}
          label="Storage Facilities"
          options={STORAGE_OPTIONS}
          error={errors?.storageFacility?.message}
        />

        {/* 3️⃣ Farm Labor (OPTIONAL) */}
        {/* <RadioGroup
          control={control}
          name="farmLabor"
          label="Farm Labor (Optional)"
          options={laborOptions}
          error={errors.farmLabor?.message}
        /> */}

        <SingleSelectInput
          control={control}
          name="farmLabor"
          modalLabel="Farm Labor"
          label="Farm Labor (Optional)"
          options={[
            { value: "permanent", label: "Permanent" },
            { value: "seasonal", label: "Seasonal" },
            { value: "contract-based", label: "Contract Based" },
          ]}
          error={errors.farmLabor}
        />

        {/* 4️⃣ Other Tools (OPTIONAL) */}
        <FormInput
          control={control}
          name="otherTools"
          label="Other Tools (Pruning Shear, Ladder, Baskets, etc.)"
          optional={true}
          icon="tools"
          error={errors.otherTools?.message}
        />
      </View>
    </View>
  );
}
