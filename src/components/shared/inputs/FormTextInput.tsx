import { colors } from "@/src/constants/colors";
import { fonts } from "@/src/constants/fonts/font";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FormInputProps } from "./types";

const FormTextInput = ({
  name,
  label,
  type = "text",
  error,
  required = false,
  countryCode = "+91",
  placeholder,
  disabled = false,
  warning,
  onChangeText,
}: FormInputProps) => {
  const { control } = useFormContext();
  if (!control) return null;

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getKeyboardType = (): KeyboardTypeOptions => {
    switch (type) {
      case "phone":
      case "age":
      case "pincode":
      case "bankaccount":
      case "year":
      case "marlas":
        return "numeric";

      case "email":
        return "email-address";

      case "number":
        return "decimal-pad";

      default:
        return "default";
    }
  };

  const sanitizeInput = (text: string): string => {
    switch (type) {
      case "phone":
        return text.replace(/\D/g, "").slice(0, 10);

      case "age":
        return text.replace(/\D/g, "").slice(0, 3);

      case "pincode":
        return text.replace(/\D/g, "").slice(0, 6);

      case "marlas": {
        const digits = text.replace(/\D/g, "").slice(0, 2);
        return Number(digits) > 19 ? "19" : digits;
      }

      case "year":
        return text.replace(/\D/g, "").slice(0, 4);

      // digits with one optional decimal point, e.g. "12.5"
      case "number": {
        const [whole, ...rest] = text.replace(/[^\d.]/g, "").split(".");
        const decimal = rest.length ? `.${rest.join("")}` : "";
        return `${whole}${decimal}`.slice(0, 12);
      }

      case "bankaccount":
        return text.replace(/\D/g, "").slice(0, 18);

      case "gst":
        return text
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, "")
          .slice(0, 15);

      case "pan":
        return text
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, "")
          .slice(0, 10);

      case "ifsc":
        return text
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, "")
          .slice(0, 11);

      case "email":
        return text
          .replace(/[^a-zA-Z0-9@._-]/g, "")
          .replace(/@(?=.*@)/g, "")
          .slice(0, 32);
      case "username":
        return text.replace(/[^a-zA-Z0-9._]/g, "").slice(0, 24);
      case "city":
        return text.replace(/[^a-zA-Z0-9._]/g, "").slice(0, 14);

      case "name":
        return text.replace(/[^a-zA-Z\s]/g, "").slice(0, 32);

      case "alphanumeric":
        return text.replace(/[^a-zA-Z0-9\s]/g, "").slice(0, 32);

      case "password":
        return text.slice(0, 24);
      case "address":
        return text.replace(/[^a-zA-Z0-9\s,.\-/#]/g, "").slice(0, 120);

      default:
        return text;
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { onChange, value } }) => {
        const hasError = !!error;

        const borderColor = hasError
          ? colors.error
          : isFocused
            ? colors.primary
            : colors.neutral;

        return (
          <View style={styles.container}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>{label}</Text>

              {required && <Text style={styles.required}> *</Text>}
            </View>

            <View style={[styles.inputContainer, { borderColor }]}>
              {type === "phone" && (
                <Text style={styles.countryCode}>{countryCode}</Text>
              )}

              <TextInput
                style={styles.input}
                value={value}
                placeholder={placeholder || label}
                placeholderTextColor={colors.neutral}
                keyboardType={getKeyboardType()}
                secureTextEntry={type === "password" && !showPassword}
                onChangeText={(text) => {
                  onChange(sanitizeInput(text));
                  onChangeText?.(text);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                underlineColorAndroid="transparent"
                editable={!disabled}
                pointerEvents={disabled ? "none" : "auto"}
                autoCorrect={false}
                contextMenuHidden
                cursorColor={colors.dark}
                selectionColor={colors.primary}
              />

              {type === "password" && (
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color={colors.darkHover}
                  />
                </Pressable>
              )}
            </View>

            {hasError && (
              <Text style={{ color: colors.error, marginTop: 6 }}>
                {error?.message}
              </Text>
            )}

            {!hasError && warning && (
              <Text style={{ color: colors.warning, marginTop: 6 }}>
                {warning}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
};

export default FormTextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  label: {
    fontSize: 16,
    color: colors.dark,
    fontFamily: fonts.poppins.medium,
  },

  required: {
    color: colors.error,
    fontFamily: fonts.poppins.medium,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 54,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: colors.light,
  },

  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    paddingVertical: 0,
    color: colors.dark,
    fontFamily: fonts.poppins.regular,
    includeFontPadding: false,
  },

  countryCode: {
    marginRight: 8,
    color: colors.darkHover,
    fontFamily: fonts.poppins.medium,
    fontSize: 16,
  },

  error: {
    color: colors.error,
    marginTop: 6,
    fontSize: 14,
    fontFamily: fonts.poppins.regular,
  },
});
