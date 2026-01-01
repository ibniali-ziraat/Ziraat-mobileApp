import { ToastPosition, Toasts } from "@backpackapp-io/react-native-toast";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

import "../../styles/global.css";
import RouteGuard from "../components/RouteGuard";
import { DisableBackWrapper } from "../components/shared/DisableBackWrapper";
import { fonts } from "../constants/fonts/font";
import AppProvider from "../contexts/AppProvider";

registerTranslation("en-GB", enGB);

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  /* ✅ LOAD ALL FONTS (MATCHES fonts.ts EXACTLY) */
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,

    Poppins_100Thin_Italic,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light_Italic,
    Poppins_400Regular_Italic,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return null; // or splash screen
  }

  const paperTheme = {
    ...MD3LightTheme,
    fonts: {
      bodyLarge: { fontFamily: fonts.poppins.regular },
      bodyMedium: { fontFamily: fonts.poppins.regular },
      bodySmall: { fontFamily: fonts.poppins.light },

      titleLarge: { fontFamily: fonts.poppins.semibold },
      titleMedium: { fontFamily: fonts.poppins.medium },
      titleSmall: { fontFamily: fonts.poppins.medium },

      labelLarge: { fontFamily: fonts.poppins.medium },
      labelMedium: { fontFamily: fonts.poppins.regular },
      labelSmall: { fontFamily: fonts.poppins.light },
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" translucent animated />

      <AppProvider>
        <DisableBackWrapper>
          <RouteGuard>
            <SafeAreaView
              edges={["left", "right"]}
              style={{
                flex: 1,
                paddingTop: insets.top + 20,
                // paddingHorizontal: 5,
                backgroundColor: "#FFFFFF",
              }}
            >
              <PaperProvider theme={paperTheme}>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                  }}
                />
              </PaperProvider>
            </SafeAreaView>
          </RouteGuard>
        </DisableBackWrapper>
      </AppProvider>

      <Toasts defaultPosition={ToastPosition.TOP} />
    </GestureHandlerRootView>
  );
}
