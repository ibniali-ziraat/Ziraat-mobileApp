import { colors } from "@/src/constants/colors";
import { FormSectionProps } from "@/src/types/formSectionProps";
import { Asterisk } from "lucide-react-native";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
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
          <View style={{ marginBottom: 20 }}>
            <TextInput
              label={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>{label}</Text>
                  {!optional && (
                    <Asterisk
                      size={12}
                      color={colors.error}
                      style={{ marginLeft: 2 }}
                    />
                  )}
                </View>
              }
              placeholder={optional ? `${label}` : label}
              mode="outlined"
              value={value}
              onChangeText={(text) => {
                const isNumericOnly =
                  resolvedKeyboard === "phone-pad" ||
                  resolvedKeyboard === "numeric";
                onChange(isNumericOnly ? text.replace(/\D/g, "") : text);
              }}
              onBlur={onBlur}
              secureTextEntry={isSecure && !showPassword}
              keyboardType={resolvedKeyboard}
              error={showError}
              right={
                isSecure && (
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword((p) => !p)}
                  />
                )
              }
              style={{ backgroundColor: colors.light }}
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