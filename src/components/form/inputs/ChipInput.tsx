import { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { X, Plus } from "lucide-react-native"; // Lucide icons
import { colors } from "@/src/constants/colors";
import { HelperText } from "react-native-paper";

interface ChipInputProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  error?: any;
}

export default function ChipInput({
  control,
  name,
  label,
  placeholder = "Add",
  error,
  required = false,
}: ChipInputProps) {
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

        const handleRemove = (index: number) => {
          const filtered = value.filter((_: any, i: number) => i !== index);
          onChange(filtered);
        };

        return (
          <View style={{ marginBottom: 10 }}>
            <Text className="text-dark text-base font-semibold mb-2">
              {label}
              {required && <Text className="text-red-500"> *</Text>}
            </Text>

            {/* Chips */}
            <View className="flex-row flex-wrap gap-2 mb-2">
              {value?.map((item: string, index: number) => (
                <View
                  key={item + index}
                  className="flex-row items-center bg-white border border-neutral px-3 py-1 rounded-full"
                >
                  <Text className="text-dark text-sm">{item}</Text>
                  <TouchableOpacity
                    className="ml-2"
                    onPress={() => handleRemove(index)}
                  >
                    <X size={14} color={colors.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Input */}
            <View className="flex-row items-center border border-neutral rounded-md bg-white px-3 py-4">
              <TextInput
                className="flex-1 text-dark text-base p-0 m-0"
                placeholder={placeholder}
                placeholderTextColor={colors.neutral}
                value={input}
                onChangeText={setInput}
              />
              <TouchableOpacity onPress={handleAdd} className="ml-2">
                <Plus size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>

            {error && (
              <HelperText
                type="error"
                visible
                style={{
                  color: colors.error,
                  paddingVertical: 0,
                  paddingBottom: 0,
                  marginTop: 2,
                  marginBottom: 0,
                }}
              >
                {error?.message}
              </HelperText>
            )}
          </View>
        );
      }}
    />
  );
}
