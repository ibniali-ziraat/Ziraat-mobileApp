import { colors } from "@/src/constants/colors"; // Import root colors
import { FormFieldProps } from "@/src/types/formFieldProps";
import { showErrorToast } from "@/src/utils/toast"; // adjust path if needed
import * as DocumentPicker from "expo-document-picker";
import { Eye, Upload, X } from "lucide-react-native";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { HelperText } from "react-native-paper";
import CsText from "../../shared/CsText";
import FilePreviewModal from "../../shared/FilePreviewModal";

export default function FormFileInput({
  control,
  name,
  label = "Upload License Copy",
  optional = false, // if true → no error shown
  error,
}: FormFieldProps) {
  const [isModalVisible, setIsModalVisible] = useState(false); // To control modal visibility
  const [imageUri, setImageUri] = useState(""); // To store image URI for preview

  const pickFile = async (onChange) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        onChange(result.assets[0]); // store file object only
      }
    } catch {
      showErrorToast("File picker failed");
    }
  };

  const previewFile = (file: any) => {
    if (!file?.uri) return;

    if (file.mimeType?.startsWith("image/")) {
      setImageUri(file.uri);
      setIsModalVisible(true);
    } else {
      showErrorToast("Preview is available only for image files");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false); // Close the modal
    setImageUri(""); // Clear the image URI
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error: fieldError },
      }) => {
        const hasFile = !!value?.uri;
        const showError = !optional && !!(fieldError || error);

        return (
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                borderWidth: 1.6,
                borderColor: showError ? colors.error : colors.neutral,
                backgroundColor: colors.light, // White background
                paddingVertical: 16,
                paddingHorizontal: 14,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => !hasFile && pickFile(onChange)}
                activeOpacity={0.7}
                style={{ flex: 1 }}
              >
                <CsText
                  style={{
                    color: colors.dark, // Text color based on root color
                    fontSize: 15,
                    fontWeight: hasFile ? "500" : "400",
                  }}
                  numberOfLines={1}
                >
                  {hasFile
                    ? value?.name.split(" ")[0] // Display the file name if available
                    : `${label}${optional ? " (Optional)" : ""}`}
                </CsText>
              </TouchableOpacity>

              <View style={{ flexDirection: "row", gap: 14 }}>
                {hasFile ? (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => previewFile(value)}
                      style={{ marginRight: 14 }}
                    >
                      <Eye size={22} color={colors.primary} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onChange(null)}>
                      <View>
                        <X size={22} color={colors.error} />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => pickFile(onChange)}>
                    <View>
                      <Upload size={22} color={colors.primary} />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* ERROR TEXT (only if required) */}
            {(fieldError || error) && (
              <HelperText
                type="error"
                visible
                style={{ color: colors.error, marginTop: 2 }}
              >
                {fieldError?.message || error}
              </HelperText>
            )}

            {/* File preview modal */}
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
