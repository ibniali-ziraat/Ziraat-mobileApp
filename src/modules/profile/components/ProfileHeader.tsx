import { default as DetailCard } from "@/src/components/shared/DetailsCard";
import { colors } from "@/src/constants/colors";
import { Feather } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ProfileHeader({ data, onEdit }) {
  return (
    <View className="items-center mb-6">
      {/* Profile Image */}
      <View className="relative mb-4">
        <Image
          source={{
            uri: data?.profilePic || "https://placehold.co/200x200",
          }}
          className="w-28 h-28 rounded-full"
          style={{
            borderWidth: 2,
            borderColor: colors.primary,
            shadowColor: colors.neutral,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
        />
      </View>
      {/* Full Name with Edit */}
      <View className="flex-row items-center gap-2">
        <Text className="text-xl font-bold" style={{ color: colors.primary }}>
          {data?.fullName || "N/A"}
        </Text>
        {onEdit && (
          <TouchableOpacity onPress={onEdit}>
            <Feather name="edit-3" size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Basic Details Cards */}
      <View className="mt-5 w-full space-y-3">
        <DetailCard title="Email" value={data?.email} />
        <DetailCard title="Phone" value={data?.phone} />
        <DetailCard title="Age" value={(data?.age)} />
        <DetailCard title="Gender" value={data?.gender} />
        <DetailCard title="User Since" value={data?.createdOn?.split("T")[0]} />
      </View>
    </View>
  );
}
