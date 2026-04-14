import RouteGuard from "@/src/components/RouteGuard";
import { DisableBackWrapper } from "@/src/components/shared/DisableBackWrapper";
import AppProvider from "@/src/contexts/AppProvider";
import { useAppFonts } from "@/src/hooks/useAppFonts";
import { ToastPosition, Toasts } from "@backpackapp-io/react-native-toast";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
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

registerTranslation("en-GB", enGB);

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const fontsLoaded = useAppFonts();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

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
          </RouteGuard>
        </DisableBackWrapper>
      </AppProvider>

      <Toasts defaultPosition={ToastPosition.TOP} />
    </GestureHandlerRootView>
  );
}
