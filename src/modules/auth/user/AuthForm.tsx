import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { useState } from "react";
import { Image, View } from "react-native";
import { ModeButton } from "../components/ModeButton";
import LoginForm from "./LoginForm";
import UserRegistrationScreen from "./screens/UserRegistraitonScreen";

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
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Image
            source={require("@/assets/images/logo.jpeg")}
            style={{ width: 140, height: 130, resizeMode: "contain" }}
          />
        </View>

        <View>
          {mode === "login" ? <LoginForm /> : <UserRegistrationScreen />}
        </View>

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
