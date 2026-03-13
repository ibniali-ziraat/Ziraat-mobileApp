import FormFileInput from "@/src/components/form/inputs/FormFileInput";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

type Props = {
  errors: any;
};

export default function SoilTestReportsSection({ errors }: Props) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "reports",
  });

  return (
    <View style={{ gap: 16 }}>
      {/* Add Button */}
      <Pressable
        onPress={() => append(null)}
        style={{
          padding: 12,
          backgroundColor: "#16a34a",
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>+ Add Report</Text>
      </Pressable>

      {/* Uploaded Files */}
      {fields.map((item, index) => (
        <View
          key={item.id}
          style={{
            backgroundColor: "#f3f4f6",
            padding: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>
            Report {index + 1}
          </Text>

          <FormFileInput
            name={`reports.${index}`}
            label="Select File"
            error={errors?.reports?.[index]?.message}
          />
        </View>
      ))}
    </View>
  );
}
