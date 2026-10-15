
// import { useRef } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import { StyleSheet, Text, TextInput, View } from "react-native";

// import { colors } from "@/src/constants/colors";
// import { FormOtpInputProps } from "./types";

// const FormOtpInput = ({
//   name,
//   label,
//   required,
//   length = 6,
// }: FormOtpInputProps) => {

//   const {
//     control,
//     clearErrors,
//     formState: { errors },
//   } = useFormContext();

//   const refs = useRef<any[]>([]);

//   const fieldError = errors[name];

//   return (
//     <Controller
//       control={control}
//       name={name}
//       defaultValue=""
//       render={({ field: { value, onChange } }) => {

//         const otpValue = value || "";

//         const handleChange = (text: string, index: number) => {

//           const digit = text.replace(/\D/g, "");

//           const otpArray = otpValue.split("");

//           otpArray[index] = digit;

//           const newOtp = otpArray.join("").slice(0, length);

//           onChange(newOtp);

//           clearErrors(name);

//           // Move focus forward
//           if (digit && index < length - 1) {
//             refs.current[index + 1]?.focus();
//           }

//           // Move focus back on delete
//           if (!digit && index > 0) {
//             refs.current[index - 1]?.focus();
//           }
//         };

//         return (
//           <View style={styles.container}>

//             <Text style={styles.label}>
//               {label}
//               {required && <Text style={{ color: colors.error }}> *</Text>}
//             </Text>

//             <View style={styles.row}>

//               {[...Array(length)].map((_, index) => (
//                 <TextInput
//                   key={index}
//                   ref={(ref) => {
//                     if (ref) refs.current[index] = ref;
//                   }}
//                   style={[
//                     styles.input,
//                     {
//                       borderColor: fieldError
//                         ? colors.error
//                         : colors.neutral,
//                     },
//                   ]}
//                   keyboardType="numeric"
//                   maxLength={1}
//                   value={otpValue[index] || ""}
//                   onChangeText={(text) => handleChange(text, index)}
//                     autoComplete="sms-otp"
//   importantForAutofill="yes"
//                 />
//               ))}

//             </View>

//             {fieldError && (
//               <Text style={styles.error}>
//                 {fieldError.message}
//               </Text>
//             )}

//           </View>
//         );
//       }}
//     />
//   );
// };

// export default FormOtpInput;

// const styles = StyleSheet.create({

//   container: {
//     marginBottom: 16,
//   },

//   label: {
//     marginBottom: 8,
//     color: colors.neutral,
//   },

//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },

//   input: {
//     width: 48,
//     height: 54,
//     borderWidth: 1,
//     borderRadius: 10,
//     textAlign: "center",
//     fontSize: 18,
//     backgroundColor: colors.light,
//   },

//   error: {
//     marginTop: 6,
//     fontSize: 14,
//     color: colors.error,
//   },

// });

import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors } from "@/src/constants/colors";
import { FormOtpInputProps } from "./types";

const FormOtpInput = ({
  name,
  label,
  required,
  length = 6,
}: FormOtpInputProps) => {
  const {
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const inputRef = useRef<TextInput>(null);

  const fieldError = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { value, onChange } }) => {
        const otpValue = value || "";

        const handleChange = (text: string) => {
          const digits = text.replace(/\D/g, "").slice(0, length);

          onChange(digits);
          clearErrors(name);
        };

        return (
          <View style={styles.container}>
            <Text style={styles.label}>
              {label}
              {required && (
                <Text style={{ color: colors.error }}> *</Text>
              )}
            </Text>

            {/* Hidden Input */}
            <TextInput
              ref={inputRef}
              value={otpValue}
              onChangeText={handleChange}
              keyboardType="number-pad"
              maxLength={length}
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
              importantForAutofill="yes"
              style={styles.hiddenInput}
              autoFocus
            />

            {/* OTP Boxes */}
            <Pressable
              onPress={() => inputRef.current?.focus()}
              style={styles.row}
            >
              {[...Array(length)].map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.input,
                    {
                      borderColor: fieldError
                        ? colors.error
                        : colors.neutral,
                    },
                  ]}
                >
                  <Text style={styles.digit}>
                    {otpValue[index] || ""}
                  </Text>
                </View>
              ))}
            </Pressable>

            {fieldError && (
              <Text style={styles.error}>
                {String(fieldError.message)}
              </Text>
            )}
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

  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
  },

  digit: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.dark,
  },

  error: {
    marginTop: 6,
    fontSize: 14,
    color: colors.error,
  },
});