import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { TouchableOpacity } from "react-native";

interface ModeButtonProps {
  title: string;
  onPress: () => void;
}

export function ModeButton({ title, onPress }: ModeButtonProps) {
  const isRegisterMode = title.includes("Register");

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 4,
        paddingHorizontal: 20,
        alignSelf: "center",
        marginTop: 4,
        marginBottom: 20,
        flexDirection: "row",
      }}
    >
      {isRegisterMode ? (
        <>
          <CsText
            style={{
              color: "#6B7280", // gray
              fontSize: 13,
            }}
          >
            Don’t have an account?{" "}
          </CsText>
          <CsText
            style={{
              color: colors.primary,
              fontWeight: "700",
              fontSize: 13,
            }}
          >
            Register
          </CsText>
        </>
      ) : (
        <>
          <CsText
            style={{
              color: "#6B7280",
              fontSize: 14,
            }}
          >
            Already have an account?{" "}
          </CsText>
          <CsText
            style={{
              color: colors.primary,
              fontWeight: "700",
              fontSize: 14,
            }}
          >
            Login
          </CsText>
        </>
      )}
    </TouchableOpacity>
  );
}
