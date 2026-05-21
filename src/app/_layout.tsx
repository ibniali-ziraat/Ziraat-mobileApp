import RouteGuard from "@/src/components/RouteGuard";
import { DisableBackWrapper } from "@/src/components/shared/DisableBackWrapper";
import AppProvider from "@/src/contexts/AppProvider";
import { useAppFonts } from "@/src/hooks/useAppFonts";
import { ToastPosition, Toasts } from "@backpackapp-io/react-native-toast";
import { firebase } from "@react-native-firebase/app";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import "../../styles/global.css";
import { colors } from "../constants/colors";
import { paperTheme } from "../constants/theme";
import GlobalBanner from "../modules/notifications/components/GlobalBanner";

const credentials = Platform.select({
  ios: {
    appId: process.env.EXPO_PUBLIC_FIREBASE_IOS_APP_ID!,
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_IOS_API_KEY!,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL ?? "",
  },
  android: {
    appId: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_APP_ID!,
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_API_KEY!,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL ?? "",
  },
});

if (!firebase.apps.length && credentials) {
  firebase.initializeApp(credentials);
}

registerTranslation("en-GB", enGB);

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const fontsLoaded = useAppFonts();

  const isWeb = Platform.OS === "web";
  if (!fontsLoaded) return null;

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
                paddingTop: insets.top,
                backgroundColor: colors.light,
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
            {!isWeb && <GlobalBanner />}
          </RouteGuard>
        </DisableBackWrapper>
      </AppProvider>

      <Toasts defaultPosition={ToastPosition.TOP} />
    </GestureHandlerRootView>
  );
}
