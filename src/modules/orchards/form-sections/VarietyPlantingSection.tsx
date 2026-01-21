import FormInput from "@/src/components/form/inputs/FormInput";

import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { soilTypeOptions } from "../schemas/SoilWaterProfileSchema";

export default function VarietAndPlatingDetails({ control, errors }) {
  const VARIETIES_LIST = [
    "Red Delicious",
    "Golden Delicious",
    "Gala",
    "Fuji",
    "Honeycrisp",
    "Ambri",
    "Other",
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

  const TREE_AGE_DISTRIBUTION = [
    "Less than 5 years",
    "5–10 years",
    "10+ years",
  ].map((x) => ({
    label: x,
    value: x,
  }));

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "customInputs",
  // });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "varieties",
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({
        varietyName: "",
        numberOfTrees: "",
        rootstockUsed: "",
        plantDensity: "",
        treesLessThan5Years: "",
        treesFiveToTenYears: "",
        treesMoreThan10Years: "",
      });
    }
  }, [fields.length, append]);

  return (
    <View style={{ padding: 20 }}>
      {fields.map((field, index) => (
        <View
          key={field.id}
          style={{
            marginBottom: 20,
            padding: 12,
            borderRadius: 10,
            backgroundColor: "#fff",
          }}
        >
          <SingleSelectInput
            control={control}
            name={`varieties.${index}.varietyName`}
            label="Variety Name"
            options={soilTypeOptions.map((v) => ({ label: v, value: v }))}
            error={errors?.varieties?.[index]?.varietyName?.message}
          />

          <FormInput
            control={control}
            name={`varieties.${index}.numberOfTrees`}
            label="Total Trees"
            type="phone"
          />

          <SingleSelectInput
            control={control}
            name={`varieties.${index}.rootstockUsed`}
            label="Rootstock Used"
            options={rootstockOptions}
          />

          <SingleSelectInput
            control={control}
            name={`varieties.${index}.plantDensity`}
            label="Plant Density"
            options={densityOptions}
          />

          <FormInput
            control={control}
            name={`varieties.${index}.treesLessThan5Years`}
            label="Trees (<5 Years)"
            type="phone"
          />

          <FormInput
            control={control}
            name={`varieties.${index}.treesFiveToTenYears`}
            label="Trees (5–10 Years)"
            type="phone"
          />

          <FormInput
            control={control}
            name={`varieties.${index}.treesMoreThan10Years`}
            label="Trees (>10 Years)"
            type="phone"
          />

          {fields.length > 1 && (
            <Pressable onPress={() => remove(index)}>
              <Text style={{ color: "red", marginTop: 8 }}>Remove Variety</Text>
            </Pressable>
          )}
        </View>
      ))}

      <Pressable
        onPress={() =>
          append({
            varietyName: "",
            numberOfTrees: "",
            rootstockUsed: "",
            plantDensity: "",
            treesLessThan5Years: "",
            treesFiveToTenYears: "",
            treesMoreThan10Years: "",
          })
        }
      >
        {/* <Text style={{ color: "green", fontWeight: "600" }}>
          + Add Another Variety
        </Text> */}
      </Pressable>
    </View>
  );
}
