// import { colors } from "@/src/constants/colors"; // Import root colors
// import { FormFieldProps } from "@/src/types/formFieldProps";
// import { showErrorToast } from "@/src/utils/toast"; // adjust path if needed
// import * as DocumentPicker from "expo-document-picker";
// import { Eye, Upload, X } from "lucide-react-native";
// import { useState } from "react";
// import { Controller } from "react-hook-form";
// import { TouchableOpacity, View } from "react-native";
// import { HelperText } from "react-native-paper";
// import CsText from "../../shared/CsText";
// import FilePreviewModal from "../../shared/FilePreviewModal";

// export default function FormFileInput({
//   control,
//   name,
//   label = "Upload License Copy",
//   optional = false, // if true → no error shown
//   error,
// }: FormFieldProps) {
//   const [isModalVisible, setIsModalVisible] = useState(false); // To control modal visibility
//   const [imageUri, setImageUri] = useState(""); // To store image URI for preview

//   const pickFile = async (onChange) => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: ["application/pdf", "image/*"],
//         copyToCacheDirectory: true,
//       });

//       if (!result.canceled) {
//         onChange(result.assets[0]); // store file object only
//       }
//     } catch {
//       showErrorToast("File picker failed");
//     }
//   };

//   const previewFile = (file: any) => {
//     if (!file?.uri) return;

//     if (file.mimeType?.startsWith("image/")) {
//       setImageUri(file.uri);
//       setIsModalVisible(true);
//     } else {
//       showErrorToast("Preview is available only for image files");
//     }
//   };

//   const closeModal = () => {
//     setIsModalVisible(false); // Close the modal
//     setImageUri(""); // Clear the image URI
//   };

//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({
//         field: { onChange, value },
//         fieldState: { error: fieldError },
//       }) => {
//         const hasFile = !!value?.uri;
//         const showError = !optional && !!(fieldError || error);

//         return (
//           <View style={{ marginBottom: 20 }}>
//             <View
//               style={{
//                 borderWidth: 1.6,
//                 borderColor: showError ? colors.error : colors.neutral,
//                 backgroundColor: colors.light, // White background
//                 paddingVertical: 16,
//                 paddingHorizontal: 14,
//                 borderRadius: 10,
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <TouchableOpacity
//                 onPress={() => !hasFile && pickFile(onChange)}
//                 activeOpacity={0.7}
//                 style={{ flex: 1 }}
//               >
//                 <CsText
//                   style={{
//                     color: colors.dark, // Text color based on root color
//                     fontSize: 15,
//                     fontWeight: hasFile ? "500" : "400",
//                   }}
//                   numberOfLines={1}
//                 >
//                   {hasFile
//                     ? value?.name.split(" ")[0] // Display the file name if available
//                     : `${label}${optional ? " (Optional)" : ""}`}
//                 </CsText>
//               </TouchableOpacity>

//               <View style={{ flexDirection: "row", gap: 14 }}>
//                 {hasFile ? (
//                   <View style={{ flexDirection: "row" }}>
//                     <TouchableOpacity
//                       onPress={() => previewFile(value)}
//                       style={{ marginRight: 14 }}
//                     >
//                       <Eye size={22} color={colors.primary} />
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress={() => onChange(null)}>
//                       <View>
//                         <X size={22} color={colors.error} />
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                 ) : (
//                   <TouchableOpacity onPress={() => pickFile(onChange)}>
//                     <View>
//                       <Upload size={22} color={colors.primary} />
//                     </View>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>

//             {/* ERROR TEXT (only if required) */}
//             {(fieldError || error) && (
//               <HelperText
//                 type="error"
//                 visible
//                 style={{ color: colors.error, marginTop: 2 }}
//               >
//                 {fieldError?.message || error}
//               </HelperText>
//             )}

//             {/* File preview modal */}
//             <FilePreviewModal
//               isVisible={isModalVisible}
//               fileUri={imageUri}
//               closeModal={closeModal}
//             />
//           </View>
//         );
//       }}
//     />
//   );
// }
import { FormFieldProps } from "@/src/types/formFieldProps";
import { showErrorToast } from "@/src/utils/toast";
import * as DocumentPicker from "expo-document-picker";
import { Eye, Upload, X } from "lucide-react-native";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import FilePreviewModal from "../../shared/FilePreviewModal";

export default function FormFileInput({
  name,
  label = "Upload File",
  optional = false,
  error,
}: FormFieldProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState("");

  const { control } = useFormContext();
  if (!control) return;

  const pickFile = async (onChange: any) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets?.length > 0) {
        onChange(result.assets[0]); // store full file object
      }
    } catch (err) {
      showErrorToast("File picker failed");
    }
  };

  // 📌 Preview file (supports URL string OR file object)
  const previewFile = (value: any) => {
    const uri = typeof value === "string" ? value : value?.uri;

    if (!uri) return;

    // Check if it's image
    if (uri.match(/\.(jpeg|jpg|png|gif|webp)$/i)) {
      setImageUri(uri);
      setIsModalVisible(true);
    } else {
      showErrorToast("Preview available only for image files");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setImageUri("");
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error: fieldError },
      }) => {
        const fileUri = typeof value === "string" ? value : value?.uri;
        const fileName =
          typeof value === "string" ? value.split("/").pop() : value?.name;
        const hasFile = !!fileUri;
        const isInvalid = !optional && !!(fieldError || error);

        return (
          <View>
            <TouchableOpacity
              onPress={() => !hasFile && pickFile(onChange)}
              activeOpacity={0.8}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                padding: 14,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: isInvalid ? "#EF4444" : "#D1D5DB",
              }}
            >
              {/* Icon Section */}
              <View style={{ marginRight: 12 }}>
                {hasFile ? (
                  <Eye
                    size={20}
                    color="#2563EB"
                    onPress={() => previewFile(value)}
                  />
                ) : (
                  <Upload size={20} color="#6B7280" />
                )}
              </View>

              {/* Text Section */}
              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: hasFile ? "#1F2937" : "#9CA3AF",
                    fontSize: 15,
                  }}
                >
                  {hasFile ? fileName : label}
                </Text>
              </View>

              {/* Remove Action */}
              {hasFile && (
                <TouchableOpacity
                  onPress={() => onChange(null)}
                  style={{ padding: 4 }}
                >
                  <X size={18} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            {isInvalid && (
              <Text
                style={{
                  color: "#EF4444",
                  fontSize: 12,
                  marginTop: 4,
                  marginLeft: 4,
                }}
              >
                {fieldError?.message || error}
              </Text>
            )}

            <FilePreviewModal
              isVisible={isModalVisible}
              fileUri={imageUri}
              closeModal={closeModal}
            />
          </View>
        );
      }}
    />
  );
}
