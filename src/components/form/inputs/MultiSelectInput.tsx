import { colors } from "@/src/constants/colors";
import { FormFieldProps } from "@/src/types/formFieldProps";
import { Asterisk } from "lucide-react-native";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { MultiSelectDropdown } from "react-native-paper-dropdown";

export default function MultiSelectInput({
  control,
  name,
  label,
  options = [], // Ensure default empty array
  error,
  optional = false,
}: FormFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View style={styles.container}>
          <View className="flex-row items-center mb-2">
            <Text className="text-dark text-xl font-semibold">{label}</Text>
            {!optional && (
              <Asterisk size={14} color={colors.error} className="ml-1" />
            )}
          </View>

          <MultiSelectDropdown
            placeholder={`Select ${label}`}
            value={Array.isArray(value) ? value : []} // Always an array
            onSelect={(selected) => onChange(selected ?? [])} // Safe fallback
            options={Array.isArray(options) ? options : []} // Always an array
          />

          {error && <Text style={styles.error}>{error.message || error}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  error: { color: "red", marginTop: 5 },
});
