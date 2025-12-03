import { colors } from "@/src/constants/colors";
import { FormFieldProps } from "@/src/types/formFieldProps";
import { Asterisk } from "lucide-react-native";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { HelperText } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";

export default function SingleSelectInput({
  control: controlProp,
  name,
  label,
  options,
  error,
  optional = false,
}: FormFieldProps) {

  // Try to get form context (only works if wrapped with <FormProvider>)
  let formContext;
  try {
    formContext = useFormContext();
  } catch (e) {
    formContext = null;
  }

  // Prefer controlProp if provided, else take from context
  const controllerControl = controlProp || formContext?.control;

  // clearErrors comes from form context, not from control
  const clearErrors = formContext?.clearErrors;

  return (
    <Controller
      control={controllerControl}
      name={name}
      render={({ field: { value, onChange }, fieldState }) => {
        const liveError = fieldState?.error || error;

        const handleSelect = (selectedValue) => {
          onChange(selectedValue);

          // Immediately clear error when selecting something
          if (selectedValue && typeof clearErrors === "function") {
            clearErrors(name);
          }
        };

        return (
          <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
              <View className="flex-row items-center mb-2">
                <Text className="text-dark text-xl font-semibold">{label}</Text>
                {!optional && <Asterisk size={14} color={colors.error} className="ml-1" />}
              </View>
            </View>

            <Dropdown
              placeholder={`Select ${label}`}
              options={options}
              value={value}
              onSelect={handleSelect}
            />

            {liveError && (
              <HelperText type="error" visible>
                {liveError.message}
              </HelperText>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
});
