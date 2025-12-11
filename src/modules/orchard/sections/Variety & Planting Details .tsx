import CheckboxGroup from "@/src/components/form/inputs/Checkbox";
import FormInput from "@/src/components/form/inputs/FormInput";
import RadioGroup from "@/src/components/form/inputs/RadioButton";

import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { View } from "react-native";

export default function VarietAndPlatingDetails({ control, errors }) {

  const varietiesList = [
    "Red Delicious", "Golden Delicious", "Gala", "Fuji",
    "Honeycrisp", "Ambri", "Other",
  ];

  const rootstockOptions = [
    { label: "M9", value: "M9" },
    { label: "MM106", value: "MM106" },
    { label: "Seedling", value: "Seedling" },
    { label: "Other", value: "Other" },
  ];

  const densityOptions = [
    { label: "High Density", value: "High Density" },
    { label: "Medium Density", value: "Medium Density" },
    { label: "Traditional", value: "Traditional" },
  ];

  const treeAgeOptions = [
    "Less than 5 years", "5–10 years", "10+ years"
  ];

  return (
      <View style={{ padding: 20 }}>

        <CheckboxGroup
          control={control}
          name="varieties"
          label="Varieties Planted"
          options={varietiesList}
          error={errors.varieties}
        />

        <FormInput
          control={control}
          name="totalTrees"
          label="Total Number of Trees"
          type="phone"
          error={errors.totalTrees?.message}
        />

        <FormInput
          control={control}
          name="treesPerVariety"
          label="Trees Per Variety"
          type="phone"
          error={errors}
        />

        <SingleSelectInput
          control={control}
          name="rootstock"
          label="Rootstock Used"
          options={rootstockOptions}
          error={errors.rootstock?.message}
        />

        <SingleSelectInput
          control={control}
          name="plantDensity"
          label="Plant Density"
          options={densityOptions}
          error={errors.plantDensity?.message}
        />

        <RadioGroup
          control={control}
          name="treeAge"
          label="Tree Age Distribution"
          options={treeAgeOptions}
          error={errors.treeAge}
        />

      </View>
  );
}
