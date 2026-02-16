import CsText from "@/src/components/shared/CsText";
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
  rules,
  ...props
}: FormSectionProps & { rules?: any }) {
  const [showPassword, setShowPassword] = useState(false);

  const isSecure = type === "password";
  const labelWithRequired = !optional ? `${label} *` : label;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
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
          <View style={{ marginBottom: 9 }}>
            <CsText style={{ color: colors.dark }} className="mb-1  text-base">
              {labelWithRequired}
            </CsText>

            <View
              style={{
                borderRadius: 16,
                backgroundColor: "#fafafa",
                shadowColor: "#000",
                shadowOpacity: 0.04,
                shadowRadius: 6,
                elevation: 1,
              }}
            >
              <TextInput
                contentStyle={{ color: colors.dark, paddingVertical: 14 }}
                mode="outlined"
                value={value}
                onBlur={onBlur}
                onChangeText={(text) => {
                  const isNumericOnly =
                    resolvedKeyboard === "phone-pad" ||
                    resolvedKeyboard === "numeric";

                  onChange(
                    isNumericOnly
                      ? text === ""
                        ? null
                        : Number(text.replace(/\D/g, ""))
                      : text
                  );
                }}
                secureTextEntry={isSecure && !showPassword}
                keyboardType={resolvedKeyboard}
                error={showError}
                right={
                  isSecure ? (
                    <TextInput.Icon
                      icon={showPassword ? "eye-off" : "eye"}
                      onPress={() => setShowPassword((p) => !p)}
                      forceTextInputFocus={false}
                    />
                  ) : undefined
                }
                style={{ backgroundColor: "transparent", borderRadius: 16 }}
                theme={{
                  roundness: 16,
                  colors: {
                    primary: colors.primary,
                    placeholder: "#9ca3af",
                    text: colors.dark,
                    error: colors.error,
                  },
                }}
                {...props}
              />
            </View>

            {showError && (
              <HelperText
                type="error"
                visible
                style={{ color: colors.error, marginTop: 4 }}
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




// import { colors } from "@/src/constants/colors";
// import { FormSectionProps } from "@/src/types/formSectionProps";
// import { Eye, EyeOff, Lock, Mail, Phone } from "lucide-react-native";
// import { useState } from "react";
// import { Controller } from "react-hook-form";
// import { View } from "react-native";
// import { HelperText, TextInput } from "react-native-paper";

// export default function FormInput({
//   control,
//   name,
//   label,
//   type = "text",
//   optional = false,
//   defaultValue = "",
//   error,
//   keyboardType,
//   ...props
// }: FormSectionProps) {
//   const [showPassword, setShowPassword] = useState(false);

//   const isSecure = type === "password";
//   const labelWithRequired = !optional ? `${label} *` : label;

//   // 🔹 UI-only Lucide icon resolver
//   const LeftIcon = () => {
//     switch (type) {
//       case "email":
//         return <Mail size={18} color={colors.neutral} />;
//       case "phone":
//         return <Phone size={18} color={colors.neutral} />;
//       case "password":
//         return <Lock size={18} color={colors.neutral} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Controller
//       control={control}
//       name={name}
//       defaultValue={defaultValue}
//       render={({
//         field: { onChange, value, onBlur },
//         fieldState: { error: fieldError },
//       }) => {
//         const showError = Boolean(fieldError?.message || error?.message);

//         const resolvedKeyboard = keyboardType
//           ? keyboardType
//           : type === "email"
//           ? "email-address"
//           : type === "phone"
//           ? "phone-pad"
//           : "default";

//         return (
//           <View style={{ marginBottom: 16 }}>
//             <TextInput
//               mode="outlined"
//               label={labelWithRequired}
//               value={value}
//               onBlur={onBlur}
//               onChangeText={(text) => {
//                 const isNumericOnly =
//                   resolvedKeyboard === "phone-pad" ||
//                   resolvedKeyboard === "numeric";
//                 onChange(isNumericOnly ? text.replace(/\D/g, "") : text);
//               }}
//               secureTextEntry={isSecure && !showPassword}
//               keyboardType={resolvedKeyboard}
//               error={showError}
//               contentStyle={{ color: colors.dark }}

//               /* 🔹 Left Lucide Icon */
//               left={
//                 LeftIcon() ? (
//                   <TextInput.Icon icon={() => <LeftIcon />} />
//                 ) : undefined
//               }

//               /* 🔹 Password toggle (Lucide) */
//               right={
//                 isSecure ? (
//                   <TextInput.Icon
//                     icon={() =>
//                       showPassword ? (
//                         <EyeOff size={18} color={colors.neutral} />
//                       ) : (
//                         <Eye size={18} color={colors.neutral} />
//                       )
//                     }
//                     onPress={() => setShowPassword((p) => !p)}
//                   />
//                 ) : undefined
//               }

//               style={{
//                 backgroundColor: colors.light,
//                 borderColor: colors.primary,
//               }}
//               theme={{
//                 colors: {
//                   primary: colors.primary,
//                   placeholder: colors.neutral,
//                   text: colors.dark,
//                   error: colors.error,
//                 },
//               }}
//               {...props}
//             />

//             {showError && (
//               <HelperText
//                 type="error"
//                 visible
//                 style={{
//                   color: colors.error,
//                   paddingVertical: 0,
//                   marginTop: 2,
//                 }}
//               >
//                 {(fieldError || error)?.message}
//               </HelperText>
//             )}
//           </View>
//         );
//       }}
//     />
//   );
// }

// import { colors } from "@/src/constants/colors";
// import { FormSectionProps } from "@/src/types/formSectionProps";
// import { Eye, EyeOff, Lock, Mail, Phone } from "lucide-react-native";
// import { useEffect, useRef, useState } from "react";
// import { Controller } from "react-hook-form";
// import { Animated, View } from "react-native";
// import { HelperText, TextInput } from "react-native-paper";

// export default function FormInput({
//   control,
//   name,
//   label,
//   type = "text",
//   optional = false,
//   defaultValue = "",
//   error,
//   keyboardType,
//   ...props
// }: FormSectionProps) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);

//   const shakeAnim = useRef(new Animated.Value(0)).current;

//   const isSecure = type === "password";
//   const labelWithRequired = !optional ? `${label} *` : label;

//   const renderLeftIcon = (color: string) => {
//     switch (type) {
//       case "email":
//         return <Mail size={18} color={color} />;
//       case "phone":
//         return <Phone size={18} color={color} />;
//       case "password":
//         return <Lock size={18} color={color} />;
//       default:
//         return null;
//     }
//   };

//   useEffect(() => {
//     if (error?.message) {
//       Animated.sequence([
//         Animated.timing(shakeAnim, {
//           toValue: 6,
//           duration: 50,
//           useNativeDriver: true,
//         }),
//         Animated.timing(shakeAnim, {
//           toValue: -6,
//           duration: 50,
//           useNativeDriver: true,
//         }),
//         Animated.timing(shakeAnim, {
//           toValue: 0,
//           duration: 50,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     }
//   }, [error?.message]);

//   return (
//     <Controller
//       control={control}
//       name={name}
//       defaultValue={defaultValue}
//       render={({
//         field: { onChange, value, onBlur },
//         fieldState: { error: fieldError },
//       }) => {
//         const showError = Boolean(fieldError?.message || error?.message);

//         const resolvedKeyboard = keyboardType
//           ? keyboardType
//           : type === "email"
//           ? "email-address"
//           : type === "phone"
//           ? "phone-pad"
//           : "default";

//         const iconColor = showError
//           ? colors.error
//           : isFocused
//           ? colors.primary
//           : colors.neutral;

//         return (
//           <View style={{ marginBottom: 10   }}>
//             <TextInput

//               mode="outlined"
//               label={labelWithRequired}
//               value={value}
//               onFocus={() => setIsFocused(true)}
//               onBlur={() => {
//                 setIsFocused(false);
//                 onBlur();
//               }}
//               onChangeText={(text) => {
//                 const isNumericOnly =
//                   resolvedKeyboard === "phone-pad" ||
//                   resolvedKeyboard === "numeric";
//                 onChange(isNumericOnly ? text.replace(/\D/g, "") : text);
//               }}
//               secureTextEntry={isSecure && !showPassword}
//               keyboardType={resolvedKeyboard}
//               error={showError}
//               contentStyle={{ color: colors.dark }}

//               left={
//                 renderLeftIcon(iconColor) ? (
//                   <TextInput.Icon
//                     icon={() => (
//                       <Animated.View
//                         style={{ transform: [{ translateX: shakeAnim }] }}
//                       >
//                         {renderLeftIcon(iconColor)}
//                       </Animated.View>
//                     )}
//                   />
//                 ) : undefined
//               }

//               right={
//                 isSecure ? (
//                   <TextInput.Icon
//                     icon={() =>
//                       showPassword ? (
//                         <EyeOff size={18} color={colors.neutral} />
//                       ) : (
//                         <Eye size={18} color={colors.neutral} />
//                       )
//                     }
//                     onPress={() => setShowPassword((p) => !p)}
//                   />
//                 ) : undefined
//               }

//               style={{
//                 backgroundColor: colors.light,
//                 borderColor: colors.primary,
//              borderRadius:14,
//              overflow:"hidden"

//               }}
//               theme={{
//                   roundness: 14,
//                 colors: {
//                   primary: colors.primary,
//                   placeholder: colors.neutral,
//                   text: colors.dark,
//                   error: colors.error,
//                 },
//               }}
//               {...props}
//             />

//             {showError && (
//               <HelperText
//                 type="error"
//                 visible
//                 style={{
//                   color: colors.error,
//                   paddingVertical: 0,
//                   marginTop: 2,
//                 }}
//               >
//                 {(fieldError || error)?.message}
//               </HelperText>
//             )}
//           </View>
//         );
//       }}
//     />
//   );
// }
