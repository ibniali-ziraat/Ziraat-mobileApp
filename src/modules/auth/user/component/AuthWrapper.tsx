// import ScreenLayout from "@/src/components/shared/ScreenLayout";
// import { colors } from "@/src/constants/colors";
// import { ROUTES } from "@/src/constants/routes";
// import { ModeButton } from "@/src/modules/auth/components/ModeButton";
// import { router } from "expo-router";
// import { Image, View } from "react-native";

// type Props = {
//   children: React.ReactNode;
//   mode: "login" | "register";
// };

// export default function AuthWrapper({ children, mode }: Props) {
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
//         <View style={{ alignItems: "center", marginBottom: 10 }}>
//           <Image
//             source={require("@/assets/images/logo.jpeg")}
//             style={{ width: 140, height: 130, resizeMode: "contain" }}
//           />
//         </View>

//         {children}

//         <ModeButton
//           title={
//             mode === "login"
//               ? "Don't have an account? Register"
//               : "Already have an account? Login"
//           }
//           onPress={() =>
//             mode === "login"
//               ? router.replace(ROUTES.AUTH.SIGNUP)
//               : router.replace(ROUTES.AUTH.LOGIN)
//           }
//         />
//       </View>
//     </ScreenLayout>
//   );
// }



import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { ModeButton } from "@/src/modules/auth/components/ModeButton";
import { router } from "expo-router";
import { Image, View } from "react-native";

type Props = {
  children: React.ReactNode;
  mode: "login" | "register";
};

export default function AuthWrapper({ children, mode }: Props) {
  return (
    <ScreenLayout>
      <View
        style={{
          backgroundColor: colors.light,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Image
            source={require("@/assets/images/logo.jpeg")}
            style={{
              width: 140,
              height: 130,
              resizeMode: "contain",
            }}
          />
        </View>

        {children}

        <ModeButton
          title={
            mode === "login"
              ? "Don't have an account? Register"
              : "Already have an account? Login"
          }
          onPress={() =>
            mode === "login"
              ? router.replace(ROUTES.AUTH.SIGNUP)
              : router.replace(ROUTES.AUTH.LOGIN)
          }
        />
      </View>
    </ScreenLayout>
  );
}