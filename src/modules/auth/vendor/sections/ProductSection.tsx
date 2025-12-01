import FormInput from "@/src/components/form/inputs/FormInput";
import MultiSelectInput from "@/src/components/form/inputs/MultiSelectInput";
import { useFieldArray, useWatch } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export default function ProductSection({ control, errors }) {
  // Static fallback options (converted to {label, value})
  const STATIC_INPUTS = [
    "Pesticides",
    "Fungicides",
    "Herbicides",
    "Fertilizers",
    "Biopesticides",
    "Growth Regulators",
    "Equipment",
  ].map((x) => ({ label: x, value: x }));

  const STATIC_BRANDS = ["Bayer", "UPL", "FIL", "BASF"].map((x) => ({
    label: x,
    value: x,
  }));

  // Watch major brands field
  const majorBrandsStocked = useWatch({
    control,
    name: "majorBrandsStocked",
  });

  // Field array for optional inputs list
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customInputList",
  });

  return (
    <View style={{ padding: 20 }}>
      {/* Inputs Sold */}
      <MultiSelectInput
        name="inputTypesSold"
        control={control}
        label="Type of Inputs Sold"
        options={STATIC_INPUTS}
        error={errors?.inputTypesSold?.message}
      />

      {/* Major Brands (Multi Select) */}
      <MultiSelectInput
        name="majorBrandsStocked"
        control={control}
        label="Major Brands Stocked"
        options={STATIC_BRANDS}
        error={
          majorBrandsStocked?.length === 0
            ? { message: "At least one brand is required." }
            : errors.majorBrandsStocked?.message
        }
      />

      {/* Storage Capacity */}
      <FormInput
        control={control}
        optional
        name="storageCapacity"
        label="Storage Capacity (MT or Litres)"
        error={errors?.storageCapacity?.message}
      />

      {/* Other Inputs Section */}
      <Text
        style={{
          fontWeight: "700",
          marginTop: 20,
          fontSize: 16,
          marginBottom: 10,
        }}
      >
        Other Inputs (Optional)
      </Text>

      {fields.map((item, index) => (
        <View
          key={item.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <FormInput
              control={control}
              name={`customInputList[${index}].name`}
              label="Input Name"
              error={errors.customInputList?.[index]?.name?.message}
            />
          </View>

          <View style={{ width: 80 }}>
            <FormInput
              control={control}
              name={`customInputList[${index}].stockQuantity`}
              label="Stock"
              type="phone"
              error={errors.customInputList?.[index]?.stockQuantity?.message}
            />
          </View>

          <TouchableOpacity
            onPress={() => remove(index)}
            style={{
              backgroundColor: "#ff4444",
              padding: 6,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white" }}>X</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        onPress={() => append({ name: "", stock: "" })}
        style={{
          marginTop: 10,
          backgroundColor: "#4CAF50",
          padding: 10,
          borderRadius: 6,
          alignSelf: "flex-start",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>+ Add Input</Text>
      </TouchableOpacity>
    </View>
  );
}
