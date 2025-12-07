import { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { Chip, TextInput } from "react-native-paper";

export default function ChipInput({
  control,
  name,
  label,
  error,
  placeholder = "Add",
}) {
  const [input, setInput] = useState("");

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { value, onChange } }) => {
        const handleAdd = () => {
          const trimmed = input.trim();
          if (!trimmed) return;
          onChange([...value, trimmed]);
          setInput("");
        };

        const handleRemove = (index) => {
          const filtered = value.filter((_, i) => i !== index);
          onChange(filtered);
        };

        return (
          <View style={{ marginTop: 15 }}>
            <Text>{label}</Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
              {value?.map((item, index) => (
                <Chip key={item + index} onClose={() => handleRemove(index)}>
                  {item}
                </Chip>
              ))}
            </View>

            <TextInput
              placeholder={placeholder}
              value={input}
              onChangeText={setInput}
              right={
                <TextInput.Icon
                  icon="plus"
                  onPress={handleAdd}
                  forceTextInputFocus={false}
                />
              }
            />

            {error && <Text style={{ color: "red" }}>{error.message}</Text>}
          </View>
        );
      }}
    />
  );
}
