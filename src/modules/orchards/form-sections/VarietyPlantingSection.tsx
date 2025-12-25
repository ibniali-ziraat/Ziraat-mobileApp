import FormInput from "@/src/components/form/inputs/FormInput";
import MultiSelectInput from "@/src/components/form/inputs/MultiSelectInput";

import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { useFieldArray } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";

export default function VarietAndPlatingDetails({ control, errors }) {
  const VARIETIES_LIST = [
    "Red Delicious",
    "Golden Delicious",
    "Gala",
    "Fuji",
    "Honeycrisp",
    "Ambri",
    "Other",
  ].map((x) => ({
    label: x,
    value: x,
  }));

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customInputs",
  });

  return (
    <View style={{ padding: 20 }}>
      <MultiSelectInput
        name="varieties"
        control={control}
        label="Varieties Planted"
        options={VARIETIES_LIST}
        error={errors?.varieties?.message}
      />

      <FormInput
        control={control}
        name="totalTrees"
        label="Total Number of Trees"
        type="phone"
        error={errors.totalTrees?.message}
      />

      {/* <FormInput
        control={control}
        name="treesPerVariety"
        label="Trees Per Variety"
        type="phone"
        error={errors}
      /> */}

      {/*  */}
      <CsText
        style={{
          fontWeight: "700",
          marginTop: 24,
          fontSize: 18,
          marginBottom: 12,
          color: colors.neutral,
        }}
      >
        Trees Per Variety
      </CsText>

      {fields.map((item, index) => (
        <View
          key={item.id}
          style={{
            backgroundColor: colors.light,
            borderRadius: 10,
            padding: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: colors.bgGradient.colors[2],
            shadowColor: colors.cardShadow,
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <FormInput
                control={control}
                name={`customInputs[${index}].productName`}
                label="Variety Name"
                error={errors.customInputs?.[index]?.productName?.message}
              />
            </View>

            <View style={{ width: 90 }}>
              <FormInput
                control={control}
                name={`customInputs[${index}].stockQuantity`}
                label="Trees"
                type="phone"
                error={errors.customInputs?.[index]?.stockQuantity?.message}
              />
            </View>

            <TouchableOpacity
              onPress={() => remove(index)}
              style={{
                backgroundColor: colors.error,
                height: 40,
                width: 40,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 4,
              }}
            >
              <CsText style={{ color: colors.light, fontWeight: "700" }}>
                ✕
              </CsText>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity
        onPress={() =>
          append({ productName: "", stockQuantity: "", unit: null })
        }
        style={{
          marginTop: 12,
          backgroundColor: colors.primary,
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderRadius: 8,
          alignSelf: "flex-start",
        }}
      >
        <CsText
          style={{
            color: colors.light,
            fontWeight: "600",
            fontSize: 14,
          }}
        >
          + Add Variety
        </CsText>
      </TouchableOpacity>

      {/*  */}

      <SingleSelectInput
        control={control}
        name="rootstock"
        label="Rootstock Used"
        options={rootstockOptions}
        modalLabel="Rootstock Used"
        error={errors.rootstock?.message}
      />

      <SingleSelectInput
        control={control}
        name="plantDensity"
        label="Plant Density"
        modalLabel="Plant Density"
        options={densityOptions}
        error={errors.plantDensity?.message}
      />

      <SingleSelectInput
        control={control}
        name="treeAge"
        label="Tree Age Distribution"
        modalLabel="Select Distribution"
        options={TREE_AGE_DISTRIBUTION}
        error={errors.treeAge?.message}
      />
      {/* 
      <RadioGroup
        control={control}
        name="treeAge"
        label="Tree Age Distribution"
        options={treeAgeOptions}
        error={errors.treeAge}
      /> */}
    </View>
  );
}
