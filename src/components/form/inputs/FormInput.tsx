import { colors } from "@/src/constants/colors";
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
              contentStyle={{ color: colors.dark }}
              mode="outlined"
              label={labelWithRequired} // <-- floating label now works!

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
                backgroundColor: colors.light,
              }}
              {...props}
            />

            {showError && (
              <HelperText type="error" visible>
                {(fieldError || error)?.message}
              </HelperText>
            )}
          </View>
        );
      }}
    />
  );
}
