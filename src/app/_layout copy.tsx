import RouteGuard from "@/src/components/RouteGuard";
import { DisableBackWrapper } from "@/src/components/shared/DisableBackWrapper";
import AppProvider from "@/src/contexts/AppProvider";
import { useAppFonts } from "@/src/hooks/useAppFonts";
import { ToastPosition, Toasts } from "@backpackapp-io/react-native-toast";
import { firebase } from '@react-native-firebase/app';
import * as Notifications from "expo-notifications";
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
import NavigationReadyHandler from "../modules/notifications/components/NavigationReadyHandler";

const credentials = Platform.select({
  ios: {
    appId: '1:462562878618:ios:015b7f60458a16da4d6b23',
    apiKey: 'AIzaSyA3XGnfcWSEVu74f_oWgKlqbwQq8OcZjBE',
    projectId: 'ziraat-mobile-f5ff4',
    messagingSenderId: '462562878618',
    storageBucket: 'ziraat-mobile-f5ff4.firebasestorage.app',
    databaseURL: ''
  },
  android: {
    appId: '1:462562878618:android:e06e6b4f455891964d6b23',
    apiKey: 'AIzaSyCwP-z0v0cztvCeKftGr0cXtF6Ae0_mVMw',
    projectId: 'ziraat-mobile-f5ff4',
    messagingSenderId: '462562878618',
    storageBucket: 'ziraat-mobile-f5ff4.firebasestorage.app',
    databaseURL: ''
  },
});

// Only call if not already initialized natively
if (!firebase.apps.length && credentials) {
  firebase.initializeApp(credentials);
}

registerTranslation("en-GB", enGB);
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

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
                {!isWeb && <NavigationReadyHandler />}
              </PaperProvider>
            </SafeAreaView>
          </RouteGuard>
        </DisableBackWrapper>
      </AppProvider>

      <Toasts defaultPosition={ToastPosition.TOP} />
    </GestureHandlerRootView>
  );
}
