import { Controller, useFormContext } from "react-hook-form";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

export default function RadioGroup({
  control: controlProp,
  name,
  label,
  options,
  error,
}) {

  // Attempt to read form context (if using FormProvider)
  let formContext;
  try {
    formContext = useFormContext();
  } catch (e) {
    formContext = null;
  }

  // Prefer passed control, otherwise take from context
  const controllerControl = controlProp || formContext?.control;

  // Clear errors must come from form context — NOT from control
  const clearErrors = formContext?.clearErrors;

  return (
    <Controller
      control={controllerControl}
      name={name}
      render={({ field: { value, onChange }, fieldState }) => {
        const liveError = fieldState?.error || error;

        const handleSelect = (selected) => {
          onChange(selected);

          // Clear error immediately after selecting a radio option
          if (selected && typeof clearErrors === "function") {
            clearErrors(name);
          }
        };

        return (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 6 }}>
              {label}
            </Text>

            <RadioButton.Group onValueChange={handleSelect} value={value}>
              {options.map((opt) => (
                <View
                  key={opt}
                  style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}
                >
                  <RadioButton value={opt} />
                  <Text>{opt}</Text>
                </View>
              ))}
            </RadioButton.Group>

            {liveError && (
              <Text style={{ color: "red", marginTop: 4 }}>
                {liveError.message}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
}
