// StepF_FarmInfrastructure.js

import { View } from "react-native";

import CheckboxGroup from "@/src/components/form/inputs/Checkbox";
import FormInput from "@/src/components/form/inputs/FormInput";
import RadioGroup from "@/src/components/form/inputs/RadioButton";

import {
  equipmentOptions,
  laborOptions,
  storageOptions,
} from "@/src/schemas/orchard schemas/FarmInfrastructureSchema";

export default function FarmInfrastructure({ control, errors }) {
  return (
    <View className="flex-1 w-full">
      <View className="bg-light w-full">
        {/* <Text className="text-lg font-semibold mb-3 text-primary">
          Farm Infrastructure and Resources
        </Text> */}

        {/* 1️⃣ Equipment Owned (REQUIRED) */}
        <CheckboxGroup
          control={control}
          name="equipmentOwned"
          label="Equipment Owned"
          options={equipmentOptions}
          error={errors.equipmentOwned?.message}
        />

        {/* 2️⃣ Storage Facilities (REQUIRED) */}
        <CheckboxGroup
          control={control}
          name="storageFacility"
          label="Storage Facilities"
          options={storageOptions}
          error={errors.storageFacility?.message}
        />

        {/* 3️⃣ Farm Labor (OPTIONAL) */}
        <RadioGroup
          control={control}
          name="farmLabor"
          label="Farm Labor (Optional)"
          options={laborOptions}
          error={errors.farmLabor?.message}
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
