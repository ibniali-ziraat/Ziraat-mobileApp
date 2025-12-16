// import { default as DetailCard } from "@/src/components/shared/DetailsCard";
// import { colors } from "@/src/constants/colors";
// import { Feather } from "@expo/vector-icons";
// import { Image, Text, TouchableOpacity, View } from "react-native";

// interface VendorProfileHeaderProps {
//     data: {
//         profilePic?: string;
//         shopName?: string;
//         ownerName?: string;
//     };
//     onEdit?: () => void;
// }

// export default function VendorProfileHeader({ data, onEdit }: VendorProfileHeaderProps) {
//     return (
//         <View className="items-center mb-6">
//             {/* Profile Image */}
//             <View className="relative mb-4">
//                 <Image
//                     source={{ uri: data?.profilePic || "https://placehold.co/200x200" }}
//                     className="w-28 h-28 rounded-full"
//                     style={{
//                         borderWidth: 2,
//                         borderColor: colors.primary,
//                         shadowColor: colors.neutral,
//                         shadowOffset: { width: 0, height: 2 },
//                         shadowOpacity: 0.2,
//                         shadowRadius: 4,
//                     }}
//                 />
//             </View>

//             {/* Shop/Owner Name */}
//             <View className="flex-row items-center gap-2">
//                 <Text className="text-xl font-bold" style={{ color: colors.primary }}>
//                     {data?.shopName || data?.ownerName || "N/A"}
//                 </Text>
//                 {onEdit && (
//                     <TouchableOpacity onPress={onEdit}>
//                         <Feather name="edit-3" size={20} color={colors.primary} />
//                     </TouchableOpacity>
//                 )}
//             </View>
//         </View>
//     );
// }

import { colors } from "@/src/constants/colors";
import { Feather } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface VendorProfileHeaderProps {
  data: {
    profilePic?: string;
    shopName?: string;
    ownerName?: string;
  };
  onEdit?: () => void;
}

export default function VendorProfileHeader({
  data,
  onEdit,
}: VendorProfileHeaderProps) {
  const name = data?.shopName || data?.ownerName || "NA";

  // Generate initials (max 2 letters)
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const showImage = !!data?.profilePic;

  return (
    <View style={{ alignItems: "center", marginBottom: 26 }}>
      {/* Avatar Container */}
      <View style={{ position: "relative", marginBottom: 12 }}>
        {/* If profilePic exists → show image, else show initials */}
        {showImage ? (
          <Image
            source={{ uri: data.profilePic }}
            style={{
              width: 110,
              height: 110,
              borderRadius: 60,
              borderWidth: 3,
              borderColor: colors.primary,
              backgroundColor: colors.primary + "10",
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 6,
            }}
          />
        ) : (
          <View
            style={{
              width: 95,
              height: 95,
              borderRadius: 60,
              backgroundColor: colors.primary + "15",
              borderWidth: 3,
              borderColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 6,
            }}
          >
            <Text
              style={{
                fontSize: 40,
                fontWeight: "600",
                color: colors.primary,
              }}
            >
              {initials}
            </Text>
          </View>
        )}

        {/* CAMERA ICON (bottom-right) */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            padding: 7,
            backgroundColor: colors.primary,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#fff",

            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Feather name="camera" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Shop / Owner Name + Edit Button */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Text
          style={{
            marginTop: 13,
            fontSize: 20,
            fontWeight: "700",
            color: colors.primary,
            textTransform: "capitalize",
            letterSpacing: 0.6,
          }}
        >
          {name}
        </Text>

        {/* {onEdit && (
          <TouchableOpacity onPress={onEdit} activeOpacity={0.8}>
            <Feather name="edit-3" size={20} color={colors.primary} />
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
}
