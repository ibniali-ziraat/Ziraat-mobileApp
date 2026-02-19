import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import {
  useFileDeleteMutation,
  useFileUploadMutation,
  useUpdateProfile,
} from "@/src/hooks/useFileUpload";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface ProfileTopHeaderProps {
  profilePic?: string;
  fullName?: string;
  profileData: any;
}

export default function ProfileTopHeader({
  profilePic: initialProfilePic,
  fullName,
  profileData,
}: ProfileTopHeaderProps) {
  const [profilePic, setProfilePic] = useState<string | undefined>(
    initialProfilePic,
  );
  const [uploading, setUploading] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const { mutateAsync: uploadFileAsync } = useFileUploadMutation();
  const { mutateAsync: deleteFileAsync } = useFileDeleteMutation();
  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateProfile();

  useEffect(() => {
    setProfilePic(initialProfilePic);
  }, [initialProfilePic]);

  const isLoading = uploading || isUpdating;

  const initials = fullName
    ? fullName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "??";

  const openPicker = async (mode: "camera" | "library") => {
    setIsMenuVisible(false); // Close menu first
    const permission =
      mode === "camera"
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      showErrorToast("Permission Required to access photos");
      return;
    }

    const result =
      mode === "camera"
        ? await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
          })
        : await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
          });

    if (!result.canceled) {
      processPickedImage(result.assets[0]);
    }
  };

  const processPickedImage = async (asset: ImagePicker.ImagePickerAsset) => {
    try {
      if (!profileData?.id) return;
      setUploading(true);

      const uploadRes = await uploadFileAsync({
        file: {
          uri: asset.uri,
          name: asset.fileName || `profile_${Date.now()}.jpg`,
          mimeType: asset.mimeType || "image/jpeg",
        },
        UserType: "supplier",
        UserId: profileData.coreUserId.toString(),
        FileCategory: "profile",
      });

      const fileUrl = uploadRes?.data?.fileUrl;
      if (!fileUrl) throw new Error("Upload failed");

      await updateProfile({ ...profileData, profilePic: fileUrl });

      setProfilePic(fileUrl);
      showSuccessToast("Profile picture updated");
    } catch (error) {
      showErrorToast("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async () => {
    setIsMenuVisible(false);
    try {
      setUploading(true);
      await deleteFileAsync({ blobName: profilePic });
      await updateProfile({ ...profileData, profilePic: "" });

      setProfilePic("");
      showSuccessToast("Photo removed");
    } catch (error) {
      showErrorToast("Failed to delete image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="w-full items-center py-5 bg-white rounded-[20px]">
      <View className="relative">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => profilePic && setIsPreviewVisible(true)}
          className="w-[100px] h-[100px] rounded-full border-[3px] items-center justify-center overflow-hidden bg-slate-100"
          style={{ borderColor: colors.primary }}
        >
          {profilePic ? (
            <Image source={{ uri: profilePic }} className="w-full h-full" />
          ) : (
            <Text
              style={[{ color: colors.dark }, typography.Poppins_m_regular]}
            >
              {initials}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsMenuVisible(true)}
          className="absolute bottom-0 right-0 w-[34px] h-[34px] rounded-full items-center justify-center border-2 border-white shadow-md"
          style={{ backgroundColor: colors.primary }}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Feather name="edit-2" size={16} color="#fff" />
          )}
        </TouchableOpacity>
      </View>

      <Text
        style={[
          { color: colors.primary, paddingTop: 14 },
          typography.Poppins_m_bold,
        ]}
      >
        {fullName?.toUpperCase() || "User Name"}
      </Text>

      <Modal
        visible={isMenuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/40 justify-end"
          onPress={() => setIsMenuVisible(false)}
        >
          <View className="bg-white rounded-t-[30px] p-6 pb-10">
            <View className="w-10 h-1 bg-gray-300 self-center rounded-full mb-6" />
            <Text
              style={[
                { color: colors.dark, paddingBottom: 15 },
                typography.Poppins_m_semibold,
              ]}
            >
              Change Profile Photo
            </Text>

            <View className="flex-row justify-around">
              <TouchableOpacity
                onPress={() => openPicker("camera")}
                className="items-center"
              >
                <View className="w-14 h-14 bg-blue-50 rounded-full items-center justify-center mb-2">
                  <Feather name="camera" size={24} color={colors.secondary} />
                </View>
                <Text
                  style={[{ color: colors.dark }, typography.Poppins_s_regular]}
                >
                  Camera
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => openPicker("library")}
                className="items-center"
              >
                <View className="w-14 h-14 bg-green-50 rounded-full items-center justify-center mb-2">
                  <Feather name="image" size={24} color="#10b981" />
                </View>
                <Text
                  style={[
                    { color: colors.primary },
                    typography.Poppins_s_regular,
                  ]}
                >
                  Gallery
                </Text>
              </TouchableOpacity>

              {profilePic && (
                <TouchableOpacity
                  onPress={handleDeletePhoto}
                  className="items-center"
                >
                  <View className="w-14 h-14 bg-red-50 rounded-full items-center justify-center mb-2">
                    <Feather name="trash-2" size={24} color="#ef4444" />
                  </View>
                  <Text
                    style={[
                      { color: colors.error },
                      typography.Poppins_s_regular,
                    ]}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              onPress={() => setIsMenuVisible(false)}
              className="mt-8 py-4 bg-gray-100 rounded-xl items-center"
            >
              <Text
                style={[{ color: colors.dark }, typography.Poppins_m_semibold]}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* 2. FULL SCREEN PREVIEW MODAL */}
      <Modal
        visible={isPreviewVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsPreviewVisible(false)}
      >
        <View className="flex-1 bg-black justify-center items-center">
          <TouchableOpacity
            className="absolute top-12 right-5"
            onPress={() => setIsPreviewVisible(false)}
          >
            <Feather name="x" size={30} color="#fff" />
          </TouchableOpacity>
          <Image
            source={{ uri: profilePic }}
            style={{ width: width, height: width }}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
}
