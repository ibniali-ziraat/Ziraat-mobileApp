import { colors } from "@/src/constants/colors";
import {
  Calendar,
  Mail,
  PencilLine,
  Phone,
  User,
  VenetianMask,
} from "lucide-react-native";
import { Dimensions, View } from "react-native";
import CsText from "./CsText";
import ZiraatCard from "./ZiraatProfileCard";

interface ProfileDetailsProps {
  email?: string;
  phone?: string;
  age?: number;
  gender?: string;
  createdOn?: string;
  onEdit?: () => void;
}

export default function ProfileDetails({
  email,
  phone,
  age,
  gender,
  createdOn,
  onEdit,
}: ProfileDetailsProps) {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth - 32;

  const fields = [
    {
      title: "Email",
      value: email,
      icon: <Mail size={22} color={colors.primary} />,
    },
    {
      title: "Phone",
      value: phone,
      icon: <Phone size={22} color={colors.primary} />,
    },
    {
      title: "Age",
      value: age,
      icon: <User size={22} color={colors.primary} />,
    },
    {
      title: "Gender",
      value: gender,
      icon: <VenetianMask size={22} color={colors.primary} />,
    },
    {
      title: "User Since",
      value: createdOn?.split("T")[0],
      icon: <Calendar size={22} color={colors.primary} />,
    },
  ];

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
      {/* Header Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <CsText
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: colors.dark,
            letterSpacing: 0.4,
          }}
        >
          Personal Details
        </CsText>

        <Pressable
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
        </Pressable>
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

      {/* Details List */}
      <View style={{ gap: 22 }}>
        {fields.map((item, index) => (
          <View key={item.title}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 6,
              }}
            >
              {/* Icon Badge */}
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: colors.primary + "18",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 14,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                }}
              >
                {item.icon}
              </View>

              {/* Text Block */}
              <View>
                <CsText
                  style={{
                    color: colors.dark,
                    fontSize: 15,
                    fontWeight: "600",
                    marginBottom: 2,
                  }}
                >
                  {item.title}
                </CsText>

                <CsText
                  style={{
                    color: colors.neutral,
                    fontSize: 16,
                    paddingVertical: 2,
                  }}
                >
                  {item.value || "—"}
                </CsText>
              </View>
            </View>

            {/* Divider */}
            {index < fields.length - 1 && (
              <View
                style={{
                  marginLeft: 62,
                  marginTop: 4,
                  height: 1,
                  backgroundColor: colors.neutral + "30",
                  borderRadius: 10,
                }}
              />
            )}
          </View>
        ))}
      </View>
    </ZiraatCard>
  );
}
