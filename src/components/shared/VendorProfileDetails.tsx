// import { View } from "react-native";
// import DetailCard from "@/src/components/shared/DetailsCard";

// interface VendorProfileDetailsProps {
//     data: {
//         email?: string;
//         contactNumberPrimary?: string;
//         contactNumberAlternate?: string;
//         village?: string;
//         tehsil?: string;
//         district?: string;
//         state?: string;
//         pincode?: string;
//     };
// }

// export default function VendorProfileDetails({ data }: VendorProfileDetailsProps) {
//     return (
//         <View className="w-full space-y-3 mb-4">
//             <DetailCard title="Email" value={data?.email || "N/A"} />
//             <DetailCard title="Primary Phone" value={data?.contactNumberPrimary || "N/A"} />
//             {data?.contactNumberAlternate && (
//                 <DetailCard title="Alternate Phone" value={data.contactNumberAlternate} />
//             )}
//             <DetailCard
//                 title="Address"
//                 value={`${data?.village || ""}, ${data?.tehsil || ""}, ${data?.district || ""}, ${data?.state || ""} - ${data?.pincode || ""}`}
//             />
//         </View>
//     );
// }

import DetailCard from "@/src/components/shared/DetailsCard";
import { colors } from "@/src/constants/colors";
import {
  Mail,
  MapPin,
  PencilLine,
  Phone,
  PhoneCall,
} from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import ZiraatCard from "./ZiraatProfileCard";

interface VendorProfileDetailsProps {
  data: {
    email?: string;
    contactNumberPrimary?: string;
    contactNumberAlternate?: string;
    village?: string;
    tehsil?: string;
    district?: string;
    state?: string;
    pincode?: string;
  };
  onEdit?: () => void;
}

export default function VendorProfileDetails({
  data,
  onEdit,
}: VendorProfileDetailsProps) {
  const address = `${data?.village || ""}, ${data?.tehsil || ""}, ${data?.district || ""}, ${data?.state || ""} - ${data?.pincode || ""}`;

  const fields = [
    {
      title: "Email",
      value: data?.email || "N/A",
      icon: <Mail size={20} color={colors.primary} />,
    },
    {
      title: "Primary Phone",
      value: data?.contactNumberPrimary || "N/A",
      icon: <Phone size={20} color={colors.primary} />,
    },
    data?.contactNumberAlternate
      ? {
          title: "Alternate Phone",
          value: data.contactNumberAlternate,
          icon: <PhoneCall size={20} color={colors.primary} />,
        }
      : null,
    {
      title: "Address",
      value: address,
      icon: <MapPin size={20} color={colors.primary} />,
    },
  ].filter(Boolean);

  return (
    <ZiraatCard
      width="100%"
      height={fields.length * 80 + 140}
      paddingHorizontal={1}
      paddingVertical={1.4}
      marginVertical={1}
      borderRadius={24}
      backgroundColor="#FFFFFF"
      borderWidth={1}
      borderColor="#f0f0f0"
    >
      {/* Header + Edit Button */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: colors.dark,
            letterSpacing: 0.4,
          }}
        >
          Vendor Details
        </Text>

        <TouchableOpacity
          onPress={onEdit}
          style={{
            padding: 8,
            paddingHorizontal: 12,
            borderRadius: 14,
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 3,
          }}
          activeOpacity={0.7}
        >
          <PencilLine size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
      {/* Accent Underline */}
      <View
        style={{
          height: 3,
          width: 80,
          backgroundColor: colors.primary,
          opacity: 0.25,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />
      {/* Render Fields */}
      {fields.map((item, index) => (
        <View key={index} style={{ marginBottom: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                marginTop: 5,
                backgroundColor: colors.primary + "15",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </View>

            <DetailCard title={item.title} value={item.value} />
          </View>

          {index < fields.length - 1 && (
            <View
              style={{
                marginTop: 3,
                marginLeft: 52,
                height: 1,
                backgroundColor: colors.neutral + "30",
              }}
            />
          )}
        </View>
      ))}
    </ZiraatCard>
  );
}
