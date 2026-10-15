import { FormFieldProps } from "@/src/types/formFieldProps";
import { showErrorToast } from "@/src/utils/toast";
import * as DocumentPicker from "expo-document-picker";
import { Eye, Upload, X } from "lucide-react-native";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
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
            <Pressable
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
                    fontSize: 16,
                  }}
                >
                  {hasFile ? fileName : label}
                </Text>
              </View>

              {/* Remove Action */}
              {hasFile && (
                <Pressable
                  onPress={() => onChange(null)}
                  style={{ padding: 4 }}
                >
                  <X size={18} color="#9CA3AF" />
                </Pressable>
              )}
            </Pressable>

            {isInvalid && (
              <Text
                style={{
                  color: "#EF4444",
                  fontSize: 14,
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
