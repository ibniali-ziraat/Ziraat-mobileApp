import { colors } from "@/src/constants/colors"; // Importing colors from root
import { FormSectionProps } from "@/src/types/formSectionProps";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

export default function FormInput({
  control,
  name,
  label,
  type = "text",
  optional = false,
  defaultValue = "",
  error,
  keyboardType,
  ...props
}: FormSectionProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isSecure = type === "password";

  const labelWithRequired = !optional ? `${label} *` : label;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error: fieldError },
      }) => {
        const showError = Boolean(fieldError?.message || error?.message);

        const resolvedKeyboard = keyboardType
          ? keyboardType
          : type === "email"
            ? "email-address"
            : type === "phone"
              ? "phone-pad"
              : "default";

        return (
          <View style={{ marginBottom: 16 }}>
            <TextInput
              contentStyle={{ color: colors.dark }} // Use dark color for input text
              mode="outlined"
              label={labelWithRequired} // Use label with required asterisk
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => {
                const isNumericOnly =
                  resolvedKeyboard === "phone-pad" ||
                  resolvedKeyboard === "numeric";
                onChange(isNumericOnly ? text.replace(/\D/g, "") : text);
              }}
              secureTextEntry={isSecure && !showPassword}
              keyboardType={resolvedKeyboard}
              error={showError}
              right={
                isSecure ? (
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword((p) => !p)}
                  />
                ) : undefined
              }
              style={{
                backgroundColor: colors.light, // Use light color for background
                borderColor: colors.primary, // Set border color to primary
              }}
              theme={{
                colors: {
                  primary: colors.primary, // Set primary color for outline
                  placeholder: colors.neutral, // Placeholder text color
                  text: colors.dark, // Input text color
                  error: colors.error, // Error color
                },
              }}
              {...props}
            />

            {/* {showError && (
              <HelperText type="error" visible style={{ color: colors.error }}>
                {(fieldError || error)?.message}
              </HelperText>
            )} */}

            {showError && (
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
                {(fieldError || error)?.message}
              </HelperText>
            )}
          </View>
        );
      }}
    />
  );
}
