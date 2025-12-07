// src/components/auth/AuthForm.tsx
import { colors } from "@/src/constants/colors";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
        marginTop: 20,
      }}
    >
      <Text style={{ color: colors.primary, fontWeight: "600", fontSize: 16 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("register");

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.light,
          padding: 20,
          justifyContent: "center",
        }}
      >
        {/* Logo */}
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Image
            source={require("@/assets/images/logo.jpeg")} // replace with your logo path
            style={{ width: 120, height: 120, resizeMode: "contain" }}
          />
          <Text
            style={{
              color: colors.dark,
              fontSize: 22,
              fontWeight: "700",
              marginTop: 10,
            }}
          >
            Welcome
          </Text>
        </View>

        {/* Form */}
        {mode === "login" ? <LoginForm /> : <UserRegistrationScreen />}

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
    </ScrollView>
  );
}
