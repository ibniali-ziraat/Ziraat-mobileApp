import { colors } from "@/src/constants/colors";
import { FormFieldProps } from "@/src/types/formFieldProps";
import { Asterisk } from "lucide-react-native";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Text, View } from "react-native";
import { Chip, TextInput } from "react-native-paper";

export default function ChipInput({
  control,
  name,
  label,
  error,
  placeholder = "Add Area",
  optional = false,
}: FormFieldProps & { optional?: boolean }) {
  const [value, setValue] = useState("");

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleAdd = () => {
    if (!value.trim()) return;
    append({ name: value.trim() });
    setValue("");
  };

  return (
    <View style={{ marginTop: 15 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{label}</Text>
        {!optional && (
          <Asterisk size={12} color={colors.error} style={{ marginLeft: 2 }} />
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: 6,
        }}
      >
        {fields.map((item, index) => (
          <Chip
            key={item.id}
            onClose={() => remove(index)}
            style={{ backgroundColor: "#E8F5E9" }}
          >
            {item.name}
          </Chip>
        ))}
      </View>

      <TextInput
        mode="outlined"
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        right={
          <TextInput.Icon
            icon="plus"
            onPress={handleAdd}
            forceTextInputFocus={false}
          />
        }
      />

      {error && (
        <Text style={{ color: "red", marginBottom: 16 }}>{error.message}</Text>
      )}
    </View>
  );
}
