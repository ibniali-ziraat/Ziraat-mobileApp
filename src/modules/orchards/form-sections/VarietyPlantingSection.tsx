import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { Pressable, View } from "react-native";
import { VARIETIES_LIST } from "../constants/orchardOptions";

export default function VarietAndPlatingDetails({ control, errors }) {
  const { fields, append } = useFieldArray({
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
    <View style={{ paddingVertical: 20 }}>
      {fields.map((field, index) => {
        const varietyError = errors?.varieties?.[index];

        return (
          <View key={field.id}>
            <SingleSelectInput
              control={control}
              name={`varieties.${index}.varietyName`}
              label="Apple variety"
              placeholder="Select apple variety"
              options={VARIETIES_LIST}
              error={varietyError?.varietyName?.message}
              modalLabel="Select Soil Type"
            />

            <FormTextInput
              name={`varieties.${index}.numberOfTrees`}
              label="Total number of trees"
              placeholder="e.g. 150"
              type="pincode"
              required
              error={varietyError?.numberOfTrees}
            />

            <FormTextInput
              name={`varieties.${index}.treesLessThan5Years`}
              label="Young trees (less than 5 years)"
              placeholder="e.g. 50"
              type="pincode"
              required
              error={varietyError?.treesLessThan5Years}
            />

            <FormTextInput
              name={`varieties.${index}.treesFiveToTenYears`}
              label="Trees aged 5 to 10 years"
              placeholder="e.g. 50"
              type="pincode"
              required
              error={varietyError?.treesFiveToTenYears}
            />

            <FormTextInput
              name={`varieties.${index}.treesMoreThan10Years`}
              label="Old trees (more than 10 years)"
              placeholder="e.g. 50"
              type="pincode"
              required
              error={varietyError?.treesMoreThan10Years}
            />
            <SingleSelectInput
              control={control}
              optional
              name={`varieties.${index}.rootstockUsed`}
              label="Rootstock used (optional)"
              placeholder="Select rootstock type"
              options={[
                { label: "M9", value: "M9" },
                { label: "MM106", value: "MM106" },
                { label: "Seedling", value: "Seedling" },
                { label: "Other", value: "Other" },
              ]}
              // error={errors?.varieties?.[index]?.rootstockUsed?.message}
            />

            <SingleSelectInput
              control={control}
              optional
              name={`varieties.${index}.plantDensity`}
              label="Planting density (optional)"
              placeholder="Select planting density"
              options={[
                { label: "High Density", value: "High Density" },
                { label: "Medium Density", value: "Medium Density" },
                { label: "Traditional", value: "Traditional" },
              ]}
              // error={errors?.varieties?.[index]?.plantDensity?.message}
            />
          </View>
        );
      })}

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
