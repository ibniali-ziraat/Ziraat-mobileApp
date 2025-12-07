import { default as DetailCard } from "@/src/components/shared/DetailsCard";
import { colors } from "@/src/constants/colors";
import { Feather } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function VendorProfileHeader({ vendorData, onEdit }) {
  console.log(vendorData, "vendordata");

  return (
    <View className="items-center mb-5">
      {/* Profile Image */}
      <View className="relative mb-3">
        <Image
          source={{
            uri: vendorData?.profilePic || "https://placehold.co/200x200",
          }}
          className="w-24 h-24 rounded-full"
        />
      </View>

      {/* Shop / Owner Name */}
      <View className="flex-row items-center gap-2">
        <Text
          className="text-lg font-semibold"
          style={{ color: colors.primary }}
        >
          {vendorData?.ownerName}
        </Text>

        <TouchableOpacity onPress={onEdit}>
          <Feather name="edit-3" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Shop Name */}
      <Text className="text-sm text-gray-500">{vendorData?.shopName}</Text>

      {/* Vendor Details */}
      <View className="mt-4 w-full space-y-2 px-0">
        <DetailCard title="Email" value={vendorData?.email} />
        <DetailCard
          title="Primary Phone"
          value={vendorData?.contactNumberPrimary}
        />
        <DetailCard
          title="Alternate Phone"
          value={vendorData?.contactNumberAlternate}
        />
        <DetailCard title="Village" value={vendorData?.village} />
        <DetailCard title="Tehsil" value={vendorData?.tehsil} />
        <DetailCard title="District" value={vendorData?.district} />
        <DetailCard title="State" value={vendorData?.state} />
        <DetailCard title="Pincode" value={vendorData?.pincode} />
      </View>
    </View>
  );
}
