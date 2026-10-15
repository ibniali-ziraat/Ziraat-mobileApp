import { colors } from "@/src/constants/colors";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import IllustrationBackground from "@/src/components/shared/IllustrationBackground";
import { typography } from "@/src/constants/fonts/typography";
import { profileArt } from "@/src/constants/iconArt";
import { illustrations } from "@/src/constants/illustrations";
import {
  useFileDeleteMutation,
  useFileUploadMutation,
  useUpdateProfile,
} from "@/src/hooks/useFileUpload";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Camera, ImageIcon, Pencil, Trash2, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

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

      console.log("upload response:", JSON.stringify(uploadRes?.data));

      // API returns the URL as a plain string; fall back to common
      // object shapes in case the backend response changes later.
      const raw = uploadRes?.data;
      const fileUrl =
        typeof raw === "string"
          ? raw.trim()
          : (raw?.fileUrl ?? raw?.url ?? raw?.blobUrl ?? raw?.data);

      if (!fileUrl || typeof fileUrl !== "string") {
        throw new Error("Upload failed");
      }

      await updateProfile({ ...profileData, profilePic: fileUrl });

      setProfilePic(fileUrl);
      showSuccessToast("Profile picture updated");
    } catch {
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
    } catch {
      showErrorToast("Failed to delete image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        paddingBottom: 20,
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: cardTokens.hairline,
        backgroundColor: cardTokens.surface,
      }}
    >
      {/* 2:1 matches the artwork, so the whole scene shows — sky included.
          Name and avatar sit on a dark gradient so white text stays legible. */}
      <IllustrationBackground
        xml={illustrations.profileCover}
        style={{ aspectRatio: 2, borderRadius: 20 }}
      >
        <LinearGradient
          colors={[
            "rgba(12,42,6,0)",
            "rgba(12,42,6,0.35)",
            "rgba(12,42,6,0.9)",
          ]}
          locations={[0, 0.45, 1]}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-end",
            padding: 14,
          }}
        >
          <View className="relative">
            <Pressable
              activeOpacity={0.9}
              onPress={() => profilePic && setIsPreviewVisible(true)}
              className="w-[84px] h-[84px] rounded-full items-center justify-center overflow-hidden"
              style={{
                backgroundColor: "#E8F5E9",
                borderWidth: 3,
                borderColor: "#FFFFFF",
              }}
            >
              {profilePic ? (
                <Image source={{ uri: profilePic }} className="w-full h-full" />
              ) : (
                <SvgXml xml={profileArt.avatar} width="100%" height="100%" />
              )}
            </Pressable>

            <Pressable
              onPress={() => setIsMenuVisible(true)}
              className="absolute bottom-0 right-0 w-[32px] h-[32px] rounded-full items-center justify-center"
              style={{
                backgroundColor: chartTokens.current,
                borderWidth: 2,
                borderColor: cardTokens.surface,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.light} />
              ) : (
                <Pencil size={15} color={colors.light} />
              )}
            </Pressable>
          </View>

          <View style={{ flex: 1, marginLeft: 14, marginBottom: 8 }}>
            <Text
              numberOfLines={1}
              style={[
                typography.Poppins_l_semibold,
                { color: "#FFFFFF", fontSize: 22 },
              ]}
            >
              {fullName || "Your profile"}
            </Text>

            {profileData?.phone ? (
              <Text
                numberOfLines={1}
                style={[
                  typography.Poppins_xs_regular,
                  {
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 14,
                    marginTop: 2,
                  },
                ]}
              >
                {profileData.phone}
              </Text>
            ) : null}
          </View>
        </LinearGradient>
      </IllustrationBackground>

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
              <Pressable
                onPress={() => openPicker("camera")}
                className="items-center"
              >
                <View className="w-14 h-14 bg-blue-50 rounded-full items-center justify-center mb-2">
                  <Camera size={24} color={colors.secondary} />
                </View>
                <Text
                  style={[{ color: colors.dark }, typography.Poppins_s_regular]}
                >
                  Camera
                </Text>
              </Pressable>

              <Pressable
                onPress={() => openPicker("library")}
                className="items-center"
              >
                <View className="w-14 h-14 bg-green-50 rounded-full items-center justify-center mb-2">
                  <ImageIcon size={24} color={colors.primary} />
                </View>
                <Text
                  style={[
                    { color: colors.primary },
                    typography.Poppins_s_regular,
                  ]}
                >
                  Gallery
                </Text>
              </Pressable>

              {profilePic && (
                <Pressable onPress={handleDeletePhoto} className="items-center">
                  <View className="w-14 h-14 bg-red-50 rounded-full items-center justify-center mb-2">
                    <Trash2 size={24} color={colors.error} />
                  </View>
                  <Text
                    style={[
                      { color: colors.error },
                      typography.Poppins_s_regular,
                    ]}
                  >
                    Remove
                  </Text>
                </Pressable>
              )}
            </View>

            <Pressable
              onPress={() => setIsMenuVisible(false)}
              className="mt-8 py-4 bg-gray-100 rounded-xl items-center"
            >
              <Text
                style={[{ color: colors.dark }, typography.Poppins_m_semibold]}
              >
                Close
              </Text>
            </Pressable>
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
          <Pressable
            className="absolute top-12 right-5"
            onPress={() => setIsPreviewVisible(false)}
          >
            <X size={30} color={colors.light} />
          </Pressable>
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
