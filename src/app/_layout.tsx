import { ToastPosition, Toasts } from "@backpackapp-io/react-native-toast";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import "../../styles/global.css";
import { colors } from "../constants/colors";
import AppProvider from "../contexts/AppProvider";
import { DisableBackWrapper } from "../components/shared/DisableBackWrapper";
import RouteGuard from "../components/RouteGuard";

registerTranslation("en-GB", enGB);

export default function RootLayout() {
  const insets = useSafeAreaInsets();

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
                backgroundColor: colors.bgColor,
                paddingTop: insets.top + 20,
                paddingHorizontal: 10,
              }}
            >
              <PaperProvider>
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
