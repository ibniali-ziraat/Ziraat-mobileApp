import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { View } from "react-native";

import MultiSelectInput from "@/src/components/form/inputs/MultiSelectInput";
import {
  certificationOptions,
  digitalToolOptions,
} from "@/src/modules/orchards/schemas/OptionalFutureFieldsSchema";
import { yesNoOptions } from "../schemas/CropNutritionSchema";

export default function FutureFieldScreen({ control, errors }: any) {
  const digitalToolOpt = digitalToolOptions.map((x) => ({
    label: x,
    value: x,
  }));
  const certOpts = certificationOptions.map((x) => ({ label: x, value: x }));
  const yesNoOpt = yesNoOptions.map((x) => ({ label: x, value: x }));

  const GOVT_SCHEMES = [
    "Subsidy",
    "Crop Insurance",
    "Horticulture Mission Support",
    "PM-Kisan Support",
    "Other",
  ].map((x) => ({ label: x, value: x }));

  return (
    <View className="flex-1 w-full">
      <View className="bg-light w-full">
        {/* <CheckboxGroup
          control={control}
          name="govtSchemes"
          label="Government Schemes Availed (Multi-select)"
          options={schemeOptions}
          error={errors.govtSchemes?.message}
        /> */}

        <MultiSelectInput
          name="govtSchemes"
          control={control}
          label="Government Schemes Available"
          options={GOVT_SCHEMES}
          error={errors?.govtSchemes?.message}
        />
        {/* 
        <FormInput
          control={control}
          name="fpoMembership"
          label="FPO / Cooperative Membership (Optional)"
          optional={true}
          icon="account-group"
          iconColor="secondary"
          error={errors.fpoMembership?.message}
        /> */}

        <SingleSelectInput
          control={control}
          name="fpoMembership"
          label="FPO / Cooperative Membership"
          options={yesNoOpt}
          error={errors.fpoMembership?.message}
          modalLabel="Select (if any)"
          optional
        />

        {/* <SingleSelectInput
          control={control}
          name="certifications"
          label="Certifications"
          options={certOpts}
          error={errors.certifications?.message}
          modalLabel="Select (if any)"
        /> */}

        <MultiSelectInput
          name="certifications"
          control={control}
          label="Certifications"
          options={certOpts}
          error={errors?.certifications?.message}
        />

        <MultiSelectInput
          name="digitalTools"
          control={control}
          label="Digital Tools Used"
          options={digitalToolOpt}
          error={errors.digitalTools?.message}
        />

        {/* <CheckboxGroup
          control={control}
          name="digitalTools"
          label="Digital Tools Used (Multi-select)"
          options={digitalToolOptions}
          error={errors.digitalTools?.message}
        /> */}
      </View>
    </View>
  );
}
