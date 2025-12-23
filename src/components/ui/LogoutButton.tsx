import { colors } from "@/src/constants/colors";
import { LogOut } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import CsText from "../shared/CsText";

export default function LogoutButton({ onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="w- py-4 rounded-xl flex-row items-center justify-center"
            style={{ backgroundColor: colors.error }} // root color only
        >
            <LogOut size={20} color={colors.light} strokeWidth={2.5} />
            <CsText
                className="ml-2 text-base font-bold"
                style={{ color: colors.light }}
            >
                Logout
           </CsText>
        </TouchableOpacity>
    );
}
