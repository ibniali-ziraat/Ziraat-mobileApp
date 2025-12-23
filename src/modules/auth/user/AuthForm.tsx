// src/components/auth/AuthForm.tsx
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import LoginForm from "./LoginForm";
import UserRegistrationScreen from "./screens/UserRegistraitonScreen";

interface ModeButtonProps {
  title: string;
  onPress: () => void;
}

function ModeButton({ title, onPress }: ModeButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 20,
      }}
    >
      <CsText style={{ color: colors.primary, fontWeight: "600", fontSize: 16 }}>
        {title}
     </CsText>
    </TouchableOpacity>
  );
}

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <ScreenLayout>
      <View
        style={{
          backgroundColor: colors.light,
          flex: 1,
          minHeight: "100%",
          justifyContent: "center",
        }}
      >
        {/* Logo */}
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Image
            source={require("@/assets/images/logo.jpeg")} // replace with your logo path
            style={{ width: 120, height: 120, resizeMode: "contain" }}
          />
        </View>

        <View>
          {mode === "login" ? <LoginForm /> : <UserRegistrationScreen />}
        </View>
        {/* Toggle Mode */}
        <ModeButton
          title={
            mode === "login"
              ? "Don't have an account? Register"
              : "Already have an account? Login"
          }
          onPress={() => setMode(mode === "login" ? "register" : "login")}
        />
      </View>
    </ScreenLayout>
  );
}
