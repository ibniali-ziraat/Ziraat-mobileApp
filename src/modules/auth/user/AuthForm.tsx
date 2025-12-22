// // src/components/auth/AuthForm.tsx
// import ScreenLayout from "@/src/components/shared/ScreenLayout";
// import { colors } from "@/src/constants/colors";
// import { useState } from "react";
// import { Image, Text, TouchableOpacity, View } from "react-native";
// import LoginForm from "./LoginForm";
// import UserRegistrationScreen from "./screens/UserRegistraitonScreen";

// interface ModeButtonProps {
//   title: string;
//   onPress: () => void;
// }

// function ModeButton({ title, onPress }: ModeButtonProps) {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={{
//         paddingVertical: 12,
//         paddingHorizontal: 20,
//         alignSelf: "center",
//         marginTop: 10,
//         marginBottom: 20,
//       }}
//     >
//       <Text style={{ color: colors.primary, fontWeight: "500", fontSize: 16 }}>
//         {title}
//       </Text>
//     </TouchableOpacity>
//   );
// }

// export default function AuthForm() {
//   const [mode, setMode] = useState<"login" | "register">("login");

//   return (
//     <ScreenLayout>
//       <View
//         style={{
//           backgroundColor: colors.light,
//           flex: 1,
//           minHeight: "100%",
//           justifyContent: "center",
//         }}
//       >
//         {/* Logo */}
//         <View style={{ alignItems: "center", marginBottom: 10 }}>
//           <Image
//             source={require("@/assets/images/logo.jpeg")} // replace with your logo path
//             style={{ width: 120, height: 120, resizeMode: "contain" }}
//           />
//         </View>

//         <View>
//           {mode === "login" ? <LoginForm /> : <UserRegistrationScreen />}
//         </View>
//         {/* Toggle Mode */}
//         <ModeButton
//           title={
//             mode === "login"
//               ? "Don't have an account? Register"
//               : "Already have an account? Login"
//           }
//           onPress={() => setMode(mode === "login" ? "register" : "login")}
//         />
//       </View>
//     </ScreenLayout>
//   );
// }


// src/components/auth/AuthForm.tsx
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import LoginForm from "./LoginForm";
import UserRegistrationScreen from "./screens/UserRegistraitonScreen";

interface ModeButtonProps {
  title: string;
  onPress: () => void;
}

function ModeButton({ title, onPress }: ModeButtonProps) {
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
          <Text
            style={{
              color: "#6B7280", // gray
              fontSize: 13,
            }}
          >
            Don’t have an account?{" "}
          </Text>
          <Text
            style={{
              color: colors.primary,
              fontWeight: "700",
              fontSize: 13,
            }}
          >
            Register
          </Text>
        </>
      ) : (
        <>
          <Text
            style={{
              color: "#6B7280", 
              fontSize: 14,
            }}
          >
            Already have an account?{" "}
          </Text>
          <Text
            style={{
              color: colors.primary,
              fontWeight: "700",
              fontSize: 14,
            }}
          >
            Login
          </Text>
        </>
      )}
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
            source={require("@/assets/images/logo.jpeg")}
            style={{ width: 140, height: 130, resizeMode: "contain" }}
          />
        </View>

        {/* Auth Form */}
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
