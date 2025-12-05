// AuthForm.tsx
import { useState } from "react";
import { Button, View } from "react-native";
import LoginForm from "./LoginForm";
import UserRegistrationScreen from "./screens/UserRegistraitonScreen";

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("register");

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {mode === "login" ? <LoginForm /> : <UserRegistrationScreen />}

      <Button
        title={mode === "login" ? "Go to Register" : "Go to Login"}
        onPress={() => setMode(mode === "login" ? "register" : "login")}
      />
    </View>
  );
}
