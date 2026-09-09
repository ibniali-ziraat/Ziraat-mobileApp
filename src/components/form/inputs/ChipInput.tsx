import { colors } from "@/src/constants/colors";
import { Plus, X } from "lucide-react-native"; // Lucide icons
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, TextInput, View } from "react-native";
import { HelperText } from "react-native-paper";
import CsText from "../../shared/CsText";
import { ChipInputProps } from "../../shared/inputs/types";

// Matches AskQuestionSchema's per-tag max (20 chars) — capping the raw
// TextInput here stops a large pasted block of text from ever landing in
// state, which is what was freezing the UI (a giant chip wrapping across
// the row on every keystroke).
const TAG_MAX_LENGTH = 20;

export default function ChipInput({
  name,
  label,
  placeholder = "Add",
  error,
  required = false,
}: ChipInputProps) {
  const [input, setInput] = useState("");
  const { control } = useFormContext();
  if (!control) return null;

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
            <CsText className="text-dark text-base font-semibold mb-2">
              {label}
              {required && <CsText className="text-red-500"> *</CsText>}
            </CsText>

            {/* Chips */}
            <View className="flex-row flex-wrap gap-2 mb-2">
              {value?.map((item: string, index: number) => (
                <View
                  key={item + index}
                  className="flex-row items-center bg-white border border-neutral px-3 py-1 rounded-full"
                >
                  <CsText className="text-dark text-sm">{item}</CsText>
                  <Pressable
                    className="ml-2"
                    onPress={() => handleRemove(index)}
                  >
                    <X size={14} color={colors.error} />
                  </Pressable>
                </View>
              ))}
            </View>

            <View className="flex-row items-center border border-neutral rounded-md bg-white px-3 py-4">
              <TextInput
                className="flex-1 text-dark text-base p-0 m-0"
                placeholder={placeholder}
                placeholderTextColor={colors.neutral}
                value={input}
                onChangeText={setInput}
                maxLength={TAG_MAX_LENGTH}
              />
              <Pressable onPress={handleAdd} className="ml-2">
                <Plus size={24} color={colors.primary} />
              </Pressable>
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
