import { TouchableOpacity, Text, View } from "react-native";
import { LogOut } from "lucide-react-native";
import { colors } from "@/src/constants/colors";

export default function LogoutButton({ onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="w- py-4 rounded-xl flex-row items-center justify-center"
            style={{ backgroundColor: colors.error }} // root color only
        >
            <LogOut size={20} color={colors.light} strokeWidth={2.5} />
            <Text
                className="ml-2 text-base font-bold"
                style={{ color: colors.light }}
            >
                Logout
            </Text>
        </TouchableOpacity>
    );
}
