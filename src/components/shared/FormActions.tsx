// import { colors } from "@/src/constants/colors";
// import { View } from "react-native";
// import { Button } from "react-native-paper";

// interface FormActionsProps {
//   cancelLabel?: string;
//   submitLabel?: string;
//   onSubmit: () => void | Promise<void>;
//   onCancel?: () => void;
//   disabled?: boolean;
//   loading?: boolean; 
// }

// export default function FormActions({
//   cancelLabel,
//   submitLabel = "Submit",
//   onSubmit,
//   onCancel,
//   disabled = false,
//   loading = false, 
// }: FormActionsProps) {
//   const showCancel = !!cancelLabel && !!onCancel;
//   const isDisabled = disabled || loading;

//   return (
//     <View
//       className={`w-full mt-2 bg-light  gap-6   ${showCancel ? "flex-row" : "items-center"
//         }`}
//     >
//       {showCancel && (
//         <Button
//           mode="outlined"
//           textColor={colors.dark}
//           style={{ borderColor: colors.dark}}
//           className="flex-1 rounded-lg"
//           onPress={onCancel}
//           disabled={isDisabled}
//         >
//           {cancelLabel}
//         </Button>
//       )}

//       <Button
//         mode="contained"
//         buttonColor={colors.primary}
//         textColor={colors.light}
//         loading={loading}          
//         disabled={isDisabled}     
//         className={`${showCancel ? "flex-1" : "w-1/2"} rounded-lg`}
//         onPress={onSubmit}
//       >
//         {submitLabel}
//       </Button>
//     </View>
//   );
// }



// import { colors } from "@/src/constants/colors";
// import { View } from "react-native";
// import { Button } from "react-native-paper";

// interface FormActionsProps {
//   cancelLabel?: string;
//   submitLabel?: string;
//   onSubmit: () => void | Promise<void>;
//   onCancel?: () => void;
//   disabled?: boolean;
//   loading?: boolean;
// }

// export default function FormActions({
//   cancelLabel,
//   submitLabel = "Submit",
//   onSubmit,
//   onCancel,
//   disabled = false,
//   loading = false,
// }: FormActionsProps) {
//   const showCancel = !!cancelLabel && !!onCancel;
//   const isDisabled = disabled || loading;

//   return (
//     <View
//       style={{
//         width: "100%",
        
//         marginTop: 16,
//         flexDirection: showCancel ? "row" : "column",
//         gap: 14,
        
//         alignItems: showCancel ? "stretch" : "center",
        
//       }}
//     >
//       {/* Cancel Button */}
//       {showCancel && (
//         <Button
//           mode="outlined"
//           textColor={colors.dark}
//           onPress={onCancel}
//           disabled={isDisabled}
//           style={{
//             flex: 1,
//             borderRadius: 12,
//             borderColor: colors.darkHover,
//           }}
//           contentStyle={{
//             paddingVertical: 10,
//           }}
//         >
//           {cancelLabel}
//         </Button>
//       )}

//       {/* Submit Button */}
//       <Button
//         mode="contained"
//         buttonColor={colors.primary}
//         textColor={colors.light}
//         loading={loading}
//         disabled={isDisabled}
//         onPress={onSubmit}
//         style={{
//           flex: showCancel ? 1 : undefined,
//           width: showCancel ? undefined : "60%",
//           borderRadius: 12,
//           elevation: 2, // subtle depth
//         }}
//         contentStyle={{
//           paddingVertical: 5,
//         }}
//       >
//         {submitLabel}
//       </Button>
//     </View>
//   );
// }



import { colors } from "@/src/constants/colors";
import { View } from "react-native";
import { Button } from "react-native-paper";

interface FormActionsProps {
  cancelLabel?: string;
  submitLabel?: string;
  onSubmit: () => void | Promise<void>;
  onCancel?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function FormActions({
  cancelLabel,
  submitLabel = "Submit",
  onSubmit,
  onCancel,
  disabled = false,
  loading = false,
}: FormActionsProps) {
  const showCancel = !!cancelLabel && !!onCancel;
  const isDisabled = disabled || loading;

  return (
    <View
      style={{
        width: "100%",
        marginTop: 20,
        flexDirection: showCancel ? "row" : "column",
        gap: 16,
        alignItems: showCancel ? "stretch" : "center",
      }}
    >
      {/* Cancel Button */}
      {showCancel && (
        <Button
          mode="outlined"
          onPress={onCancel}
          disabled={isDisabled}
          textColor={colors.dark}
          style={{
            flex: 1,
            borderRadius: 14,
            borderColor: colors.darkHover,
            backgroundColor: colors.light,
          }}
          contentStyle={{
            paddingVertical: 12,
          }}
          labelStyle={{
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          {cancelLabel}
        </Button>
      )}

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={onSubmit}
        disabled={isDisabled}
        loading={loading}
        buttonColor={colors.primary}
        textColor={colors.light}
        style={{
          flex: showCancel ? 1 : undefined,
          width: showCancel ? undefined : "100%",
          borderRadius: 14,
          elevation: isDisabled ? 0 : 3,
          opacity: isDisabled ? 0.8 : 1,
        }}
        contentStyle={{
          paddingVertical: 5,
        }}
        labelStyle={{
          fontSize: 16,
          fontWeight: "600",
          letterSpacing: 0.3,
        }}
      >
        {submitLabel}
      </Button>
    </View>
  );
}
