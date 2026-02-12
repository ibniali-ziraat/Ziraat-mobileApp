import { colors } from "@/src/constants/colors";
import { LogOut } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import CsText from "../shared/CsText";

export default function LogoutButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 16,
       
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        borderWidth: 1,
        borderColor: colors.error + "40",
      }}
    >
      {/* ICON CONTAINER */}
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 12,
          
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
        }}
      >
        <LogOut size={18} color={colors.error} strokeWidth={2.5} />
      </View>

      <CsText
        style={{
          fontSize: 15,
          fontWeight: "700",
          color: colors.error,
          letterSpacing: 0.3,
        }}
      >
        Logout
      </CsText>
    </TouchableOpacity>
  );
}
