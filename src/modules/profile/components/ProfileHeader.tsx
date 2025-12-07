import { default as DetailCard } from "@/src/components/shared/DetailsCard";
import { colors } from "@/src/constants/colors";
import { Feather } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ProfileHeader({ profileData, onEdit }) {
  return (
    <View className="items-center mb-5">
      <View className="relative mb-3">
        <Image
          source={{
            uri: profileData?.profilePic || "https://placehold.co/200x200",
          }}
          className="w-24 h-24 rounded-full"
        />
      </View>

      {/* Full Name */}
      <View className="flex-row items-center gap-2">
        <Text
          className="text-lg font-semibold"
          style={{ color: colors.primary }}
        >
          {profileData?.fullName}
        </Text>

        <TouchableOpacity onPress={onEdit}>
          <Feather name="edit-3" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Basic Details */}
      <View className="mt-4 w-full space-y-2 px-0">
        <DetailCard title="Email" value={profileData?.email} />
        <DetailCard title="Phone" value={profileData?.phone} />
        <DetailCard title="Age" value={String(profileData?.age)} />
        <DetailCard title="Gender" value={profileData?.gender} />
        <DetailCard title="User Since" value={profileData?.createdOn} />
      </View>
    </View>
  );
}
