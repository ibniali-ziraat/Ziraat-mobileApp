import FormInput from "@/src/components/form/inputs/FormInput";
import MultiSelectInput from "@/src/components/form/inputs/MultiSelectInput";
import CsText from "@/src/components/shared/CsText";
import { useFieldArray, useWatch } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";

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

  // Watch major brands
  const majorBrands = useWatch({ control, name: "majorBrands" });

  // Field array for custom inputs
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customInputs",
  });

  return (
    <View>
   
      {/* Inputs Sold */}
      <MultiSelectInput
        name="inputTypes"
        control={control}
        label="Type of Inputs Sold"
        options={STATIC_INPUTS}
        error={errors?.inputTypes?.message}
      />

      {/* Major Brands (Multi Select) */}
      <MultiSelectInput
        name="majorBrands"
        control={control}
        label="Major Brands Stocked"
        options={STATIC_BRANDS}
        error={
          majorBrands?.length === 0
            ? { message: "At least one brand is required." }
            : errors?.majorBrands?.message
        }
      />

      {/* Storage Capacity */}
      <FormInput
        control={control}
        optional
        name="storageCapacityValue"
        label="Storage Capacity Value (MT or Litres)"
        error={errors?.storageCapacityValue?.message}
      />

      {/* <FormInput
        control={control}
        optional
        name="storageCapacityUnit"
        label="Storage Capacity Unit"
        error={errors?.storageCapacityUnit?.message}
      /> */}

      {/* Custom Inputs */}
      <CsText
        style={{
          fontWeight: "700",
          marginTop: 20,
          fontSize: 16,
          marginBottom: 10,
        }}
      >
        Other Inputs (Optional)
     </CsText>

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
              name={`customInputs[${index}].productName`}
              label="Input Name"
              error={errors.customInputs?.[index]?.productName?.message}
            />
          </View>

          <View style={{ width: 80 }}>
            <FormInput
              control={control}
              name={`customInputs[${index}].stockQuantity`}
              label="Stock"
              type="phone"
              error={errors.customInputs?.[index]?.stockQuantity?.message}
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
            <CsText style={{ color: "white" }}>X</CsText>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        onPress={() =>
          append({ productName: "", stockQuantity: "", unit: null })
        }
        style={{
          marginTop: 10,
          backgroundColor: "#4CAF50",
          padding: 10,
          borderRadius: 6,
          alignSelf: "flex-start",
        }}
      >
        <CsText style={{ color: "white", fontWeight: "600" }}>+ Add Input</CsText>
      </TouchableOpacity>
    </View>
  );
}
