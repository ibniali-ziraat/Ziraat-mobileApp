// import { colors } from "@/src/constants/colors";
// import { fonts } from "@/src/constants/fonts/font";
// import { useState } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import { StyleSheet, Text, TextInput, View } from "react-native";

// const FormTextAreaInput = ({
//   name,
//   label,
//   error,
//   required = false,
//   placeholder,
//   disabled = false,
//   numberOfLines = 4,
//   maxLength = 250,
//   showCount = true,
// }) => {
//   const { control } = useFormContext();
//   if (!control) return null;

//   const [isFocused, setIsFocused] = useState(false);

//   const sanitizeInput = (text: string): string => {
//     return text.slice(0, maxLength);
//   };

//   return (
//     <Controller
//       control={control}
//       name={name}
//       defaultValue=""
//       render={({ field: { onChange, value } }) => {
//         const hasError = !!error;

//         const borderColor = hasError
//           ? colors.error
//           : isFocused
//             ? colors.primary
//             : colors.neutral;

//         const currentLength = value?.length || 0;

//         return (
//           <View style={styles.container}>
//             {/* Label + Counter */}
//             <View style={styles.headerRow}>
//               <View style={styles.labelRow}>
//                 <Text style={styles.label}>{label}</Text>
//                 {required && <Text style={styles.required}> *</Text>}
//               </View>

//               {showCount && (
//                 <Text style={styles.counter}>
//                   {currentLength}/{maxLength}
//                 </Text>
//               )}
//             </View>

//             {/* TextArea */}
//             <View style={[styles.inputContainer, { borderColor }]}>
//               <TextInput
//                 style={styles.input}
//                 value={value}
//                 placeholder={placeholder || label}
//                 placeholderTextColor={colors.neutral}
//                 multiline
//                 numberOfLines={numberOfLines}
//                 onChangeText={(text) => onChange(sanitizeInput(text))}
//                 onFocus={() => setIsFocused(true)}
//                 onBlur={() => setIsFocused(false)}
//                 underlineColorAndroid="transparent"
//                 selectionColor={colors.primary}
//                 editable={!disabled}
//                 textAlignVertical="top"
//                 maxLength={maxLength}
//               />
//             </View>

//             {/* Error */}
//             {hasError && (
//               <Text style={{ color: colors.error, marginTop: 6 }}>
//                 {error?.message}
//               </Text>
//             )}
//           </View>
//         );
//       }}
//     />
//   );
// };

// export default FormTextAreaInput;

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 18,
//   },

//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 6,
//   },

//   labelRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   label: {
//     fontSize: 14,
//     color: colors.dark,
//     fontFamily: fonts.poppins.medium,
//   },

//   required: {
//     color: colors.error,
//     fontFamily: fonts.poppins.medium,
//   },

//   counter: {
//     fontSize: 12,
//     color: colors.darkHover,
//     fontFamily: fonts.poppins.regular,
//   },

//   inputContainer: {
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     backgroundColor: colors.light,
//     minHeight: 100,
//   },

//   input: {
//     fontSize: 15,
//     color: colors.dark,
//     fontFamily: fonts.poppins.regular,
//     minHeight: 80,
//   },

//   error: {
//     color: colors.error,
//     marginTop: 6,
//     fontSize: 12,
//     fontFamily: fonts.poppins.regular,
//   },
// });

import { colors } from "@/src/constants/colors";
import { fonts } from "@/src/constants/fonts/font";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface FormTextAreaInputProps {
  name: string;
  label: string;
  error?: any;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  showCount?: boolean;

  // 👇 Added type prop
  type?: "default" | "address";
}

const FormTextAreaInput = ({
  name,
  label,
  error,
  required = false,
  placeholder,
  disabled = false,
  numberOfLines = 4,
  maxLength = 250,
  showCount = true,
  type = "default",
}: FormTextAreaInputProps) => {
  const { control } = useFormContext();

  if (!control) return null;

  const [isFocused, setIsFocused] = useState(false);

  // 👇 Input sanitizer
  const sanitizeInput = (text: string): string => {
    let sanitized = text;

    // Address type validation
    if (type === "address") {
      sanitized = text.replace(/[^a-zA-Z0-9\s,./#\-_]/g, "");
    }

    return sanitized.slice(0, maxLength);
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

        const currentLength = value?.length || 0;

        return (
          <View style={styles.container}>
            {/* Label + Counter */}
            <View style={styles.headerRow}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>{label}</Text>

                {required && <Text style={styles.required}> *</Text>}
              </View>

              {showCount && (
                <Text style={styles.counter}>
                  {currentLength}/{maxLength}
                </Text>
              )}
            </View>

            {/* TextArea */}
            <View style={[styles.inputContainer, { borderColor }]}>
              <TextInput
                style={styles.input}
                value={value}
                placeholder={placeholder || label}
                placeholderTextColor={colors.neutral}
                multiline
                numberOfLines={numberOfLines}
                onChangeText={(text) => onChange(sanitizeInput(text))}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                underlineColorAndroid="transparent"
                selectionColor={colors.primary}
                editable={!disabled}
                textAlignVertical="top"
                maxLength={maxLength}
              />
            </View>

            {/* Error */}
            {hasError && <Text style={styles.error}>{error?.message}</Text>}
          </View>
        );
      }}
    />
  );
};

export default FormTextAreaInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    fontSize: 14,
    color: colors.dark,
    fontFamily: fonts.poppins.medium,
  },

  required: {
    color: colors.error,
    fontFamily: fonts.poppins.medium,
  },

  counter: {
    fontSize: 12,
    color: colors.darkHover,
    fontFamily: fonts.poppins.regular,
  },

  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.light,
    minHeight: 100,
  },

  input: {
    fontSize: 15,
    color: colors.dark,
    fontFamily: fonts.poppins.regular,
    minHeight: 80,
  },

  error: {
    color: colors.error,
    marginTop: 6,
    fontSize: 12,
    fontFamily: fonts.poppins.regular,
  },
});
