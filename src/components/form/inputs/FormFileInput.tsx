import { colors } from "@/src/constants/colors"; // Import root colors
import { FormFieldProps } from "@/src/types/formFieldProps";
import * as DocumentPicker from "expo-document-picker";
import { Eye, Upload, X } from "lucide-react-native";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { HelperText } from "react-native-paper";
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
        type: "*/*", // Pick any file
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        onChange(result.assets[0]);
      }
    } catch (err) {
      console.log("Picker Error:", err);
    }
  };

  // Function to handle file preview (only for images)
  const previewFile = (fileUri) => {
    if (!fileUri) return;
    const fileExtension = fileUri.split(".").pop()?.toLowerCase();
    if (
      fileExtension === "jpg" ||
      fileExtension === "jpeg" ||
      fileExtension === "png" ||
      fileExtension === "gif"
    ) {
      setImageUri(fileUri); // Set the image URI to show in modal
      setIsModalVisible(true); // Show modal
    } else {
      alert("File type not supported for preview");
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
                <Text
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
                </Text>
              </TouchableOpacity>

              <View style={{ flexDirection: "row", gap: 14 }}>
                {hasFile ? (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => previewFile(value.uri)}
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
            {showError && (
              <HelperText
                type="error"
                visible
                style={{
                  color: colors.error,
                  paddingVertical: 0,
                  paddingBottom: 0,
                  marginTop: 2,
                  marginBottom: 0,
                }}
              >
                Required Field
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
