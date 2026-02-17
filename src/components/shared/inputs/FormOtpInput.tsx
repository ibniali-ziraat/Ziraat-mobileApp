import React, { useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { Controller, useFormContext } from "react-hook-form";

import { colors } from "@/src/constants/colors";
import { FormOtpInputProps } from "./types";

const FormOtpInput: React.FC<FormOtpInputProps> = ({
  name,
  label,
  errors,
  required,
  length = 6,
}) => {
  const { control } = useFormContext();

  const refs = useRef<TextInput[]>([]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { value, onChange } }) => {
        const otp = value || "";

        const handleChange = (text: string, index: number) => {
          const digit = text.replace(/\D/g, "");

          const arr = otp.split("");
          arr[index] = digit;

          const newOtp = arr.join("").slice(0, length);

          onChange(newOtp);

          if (digit && index < length - 1) {
            refs.current[index + 1]?.focus();
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
                      borderColor: errors ? colors.error : colors.cardBorder,
                    },
                  ]}
                  keyboardType="numeric"
                  maxLength={1}
                  value={otp[index] || ""}
                  onChangeText={(text) => handleChange(text, index)}
                />
              ))}
            </View>

            {errors && <Text style={styles.error}>{errors.message}</Text>}
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
});
