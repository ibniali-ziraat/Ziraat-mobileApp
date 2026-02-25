import { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { colors } from "@/src/constants/colors";
import { FormOtpInputProps } from "./types";

const STATIC_OTP = "123456";

const FormOtpInput = ({
  name,
  label,
  required,
  length = 6,
}: FormOtpInputProps) => {
  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const refs = useRef([]);
  const [successMessage, setSuccessMessage] = useState("");

  const fieldError = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { value, onChange } }) => {
        const otpValue = value || "";

        const handleChange = (text: string, index: number) => {
          const digit = text.replace(/\D/g, "");

          const arr = otpValue.split("");
          arr[index] = digit;
          const newOtp = arr.join("").slice(0, length);

          onChange(newOtp);

          if (digit && index < length - 1) {
            refs.current[index + 1]?.focus();
          }

          if (!digit && index > 0) {
            refs.current[index - 1]?.focus();
          }

          setSuccessMessage("");
          clearErrors(name);

          if (newOtp.length === length) {
            if (newOtp === STATIC_OTP) {
              setSuccessMessage("OTP verified successfully");
            } else {
              setError(name, {
                type: "manual",
                message: "entered OTP is incorrect",
              });
            }
          }
        };

        return (
          <View style={styles.container}>
            <Text style={styles.label}>
              {label}
              {required && <Text style={{ color: colors.error }}> *</Text>}
            </Text>

            <View style={styles.row}>
              {[...Array(length)].map((_, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    if (ref) refs.current[index] = ref;
                  }}
                  style={[
                    styles.input,
                    {
                      borderColor: fieldError
                        ? colors.error
                        : successMessage
                          ? colors.primary
                          : colors.neutral,
                    },
                  ]}
                  keyboardType="numeric"
                  maxLength={1}
                  value={otpValue[index] || ""}
                  onChangeText={(text) => handleChange(text, index)}
                />
              ))}
            </View>

            {/* Error */}
            {fieldError && (
              <Text style={styles.error}>{fieldError.message}</Text>
            )}

            {/* Success */}
            {!fieldError && successMessage ? (
              <Text style={styles.success}>{successMessage}</Text>
            ) : null}
          </View>
        );
      }}
    />
  );
};

export default FormOtpInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    marginBottom: 8,
    color: colors.neutral,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  input: {
    width: 48,
    height: 54,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: colors.light,
  },

  error: {
    marginTop: 6,
    fontSize: 12,
    color: colors.error,
  },

  success: {
    marginTop: 6,
    fontSize: 12,
    color: colors.primary,
  },
});
