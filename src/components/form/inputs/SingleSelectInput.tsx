import { colors } from "@/src/constants/colors";
import { FormFieldProps } from "@/src/types/formFieldProps";
import { Asterisk } from "lucide-react-native";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { HelperText } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";

export default function SingleSelectInput({
  control,
  name,
  label,
  options,
  error,
  optional = false,
}: FormFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View className="flex-row items-center mb-2">
              <Text className="text-dark text-xl font-semibold">{label}</Text>
              {!optional && (
                <Asterisk size={14} color={colors.error} className="ml-1" />
              )}
            </View>
          </View>
          <Dropdown
            placeholder={`Select ${label}`}
            options={options}
            value={value}
            onSelect={onChange}
          />
          {error && (
            <HelperText type="error" visible>
              {error.message}
            </HelperText>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  error: { color: "red", marginTop: 5 },
});
