import { colors } from "@/src/constants/colors";
import { Feather } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProfileTopHeaderProps {
    profilePic?: string;
    fullName?: string;
    onEdit?: () => void;
}

export default function ProfileTopHeader({ profilePic, fullName, onEdit }: ProfileTopHeaderProps) {
    return (
        <View className="items-center mb-4">
            {/* Profile Image */}
            <View className="relative mb-4">
                <Image
                    source={{ uri: profilePic || "https://placehold.co/200x200" }}
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
                    {fullName || "N/A"}
                </Text>
                {onEdit && (
                    <TouchableOpacity onPress={onEdit}>
                        <Feather name="edit-3" size={20} color={colors.primary} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
