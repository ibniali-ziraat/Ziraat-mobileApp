// StepF_FarmInfrastructure.js

import { View } from "react-native";

import MultiSelectInput from "@/src/components/form/inputs/MultiSelectInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import {
  EQUIPMENT_OPTIONS,
  STORAGE_OPTIONS,
  TOOLS,
} from "../constants/orchardOptions";

export default function FarmInfrastructureScreen({ control, errors }) {
  return (
    <View className="bg-light w-full">
      <MultiSelectInput
        name="equipmentOwned"
        control={control}
        label="Equipment Owned"
        placeholder="Equipment Owned"
        options={EQUIPMENT_OPTIONS}
        error={errors?.equipmentOwned?.message}
      />
      <MultiSelectInput
        name="storageFacilities"
        control={control}
        label="Storage Facilities"
        options={STORAGE_OPTIONS}
        error={errors?.storageFacilities?.message}
      />
      <FormTextInput
        name="permanentLabor"
        label="Permanent Labour"
        placeholder="Labours"
        type="age"
        error={errors.permanentLabor}
        required
      />{" "}
      <FormTextInput
        name="seasonalLabor"
        label="Seasonal Labor"
        type="age"
        error={errors.seasonalLabor}
        required
      />{" "}
      <FormTextInput
        name="contractBasedLabor"
        label="Contract Based Labor"
        type="age"
        error={errors.contractBasedLabor}
        required
      />
      <MultiSelectInput
        name="otherTools"
        control={control}
        label="Tools"
        options={TOOLS}
        error={errors?.otherTools?.message}
      />
    </View>
  );
}
