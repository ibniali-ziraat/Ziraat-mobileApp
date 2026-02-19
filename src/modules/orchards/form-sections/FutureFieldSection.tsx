import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { View } from "react-native";

import MultiSelectInput from "@/src/components/form/inputs/MultiSelectInput";

import { yesNoOptions } from "../schemas/CropNutritionSchema";

export default function FutureFieldScreen({ control, errors }: any) {
  const schemeOptions = [
    "Subsidy",
    "Crop Insurance",
    "Horticulture Mission Support",
    "PM-Kisan Support",
    "Other",
  ] as const;

  const certificationOptions = [
    "Organic",
    "GAP",
    "Fair Trade",
    "Global GAP",
    "Other",
  ] as const;

  const digitalToolOptions = [
    "Weather Apps",
    "Advisory Apps",
    "Farm Management Tools",
    "Soil Health Apps",
    "Mobile-based Irrigation Advisory",
    "Other",
  ] as const;
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
        <MultiSelectInput
          name="governmentSchemesAvailed"
          control={control}
          label="Government Schemes Available (optional)"
          placeholder="Government Schemes Available"
          options={GOVT_SCHEMES}
          error={errors?.governmentSchemesAvailed?.message}
          optional
        />

        <SingleSelectInput
          control={control}
          name="isFpoOrCooperativeMember"
          label="FPO / Cooperative Membership (optional)"
          placeholder="FPO / Cooperative Membership"
          options={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
          error={errors.fpoMembership?.message}
          modalLabel="Select (if any)"
          optional
        />

        <MultiSelectInput
          name="certifications"
          control={control}
          label="Certifications (optional)"
          placeholder="Certifications"
          options={certOpts}
          error={errors?.certifications?.message}
          optional
        />

        <MultiSelectInput
          name="digitalToolsUsed"
          control={control}
          label="Digital Tools Used (optional)"
          placeholder="Digital Tools Used"
          options={digitalToolOpt}
          error={errors.digitalTools?.message}
          optional
        />
      </View>
    </View>
  );
}
