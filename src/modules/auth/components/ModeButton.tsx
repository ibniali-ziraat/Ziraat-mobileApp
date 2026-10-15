import CsText from "@/src/components/shared/CsText";
import { Pressable } from "react-native";
import { ModeButtonProps } from "../types/auth.types";

export function ModeButton({ title, onPress }: ModeButtonProps) {
  const isRegisterMode = title.includes("Register");

  return (
    <Pressable
      onPress={onPress}
      className="flex-row self-center mt-1 mb-5 px-5 py-1"
    >
      {isRegisterMode ? (
        <>
          <CsText className="text-gray-500 text-[14px]">
            Don’t have an account?{" "}
          </CsText>
          <CsText className="text-primary font-bold text-[14px]">
            Register
          </CsText>
        </>
      ) : (
        <>
          <CsText className="text-gray-500 text-sm">
            Already have an account?{" "}
          </CsText>
          <CsText className="text-primary font-bold text-sm">Login</CsText>
        </>
      )}
    </Pressable>
  );
}
