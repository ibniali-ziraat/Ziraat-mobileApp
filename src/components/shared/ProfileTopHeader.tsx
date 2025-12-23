import { colors } from "@/src/constants/colors";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import CsText from "./CsText";

interface ProfileTopHeaderProps {
    profilePic?: string;
    fullName?: string;
    onEdit?: () => void;
}

export default function ProfileTopHeader({ fullName, onEdit }: ProfileTopHeaderProps) {
    const initials = fullName
        ? fullName
              .split(" ")
              .map((w) => w[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()
        : "TA";

    return (
        <View
            style={{
                width: "100%",
                marginTop: 12,
                marginBottom: 8,
                alignItems: "center",
                paddingVertical: 20,
                paddingHorizontal: 16,
                backgroundColor: "#FFFFFF",
                borderRadius: 20,

                
            }}
        >
            {/* Avatar Container */}
            <TouchableOpacity activeOpacity={0.9} style={{ position: "relative" }}>

                {/* Avatar Circle */}
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
                    }}
                >
                    <CsText variant="bigSubHeading"
                        style={{
                            color: colors.primary,
                        }}
                    >
                        {initials}
                   </CsText>
                </View>

                {/* Edit Icon */}
                {onEdit && (
                    <TouchableOpacity
                        onPress={onEdit}
                        style={{
                            position: "absolute",
                            top: -4,
                            right: -4,
                            padding: 7,
                            backgroundColor: "#fff",
                            borderRadius: 20,

                            shadowColor: "#000",
                            shadowOpacity: 0.18,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 3,
                            elevation: 3,
                        }}
                    >
                        <Feather name="edit-3" size={17} color={colors.primary} />
                    </TouchableOpacity>
                )}

                {/* Camera Icon */}
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        padding: 7,
                        backgroundColor: colors.primary,
                        borderRadius: 20,

                        shadowColor: "#000",
                        shadowOpacity: 0.25,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 4,
                        elevation: 5,

                        borderWidth: 1,
                        borderColor: "#fff",
                    }}
                >
                    <Feather name="camera" size={18} color="#fff" />
                </View>
            </TouchableOpacity>

            {/* Full Name */}
            <CsText
            variant="subheading"
                style={{
                    marginTop: 13,
                    
                    
                    color: colors.primary,
                    textTransform: "capitalize",
                   
                }}
            >
                {fullName || "Tansha Ashraf"}
           </CsText>
        </View>
    );
}
