import { ToastPosition, Toasts } from "@backpackapp-io/react-native-toast";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Platform, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import "../../styles/global.css";
import RouteGuard from "../components/RouteGuard";
import { colors } from "../constants/colors";
import AppProvider from "../contexts/AppProvider";

registerTranslation("en-GB", enGB);

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* STATUS BAR */}
      <StatusBar
        style="dark"
        // backgroundColor={colors.primary}
        translucent
        animated
      />

      {/* STATUS BAR EXTENSION (THIS IS THE KEY) */}
      {/* {Platform.OS !== "web" && (
        <View
          style={{
            height: insets.top + 20, // 👈 extra bottom padding
            backgroundColor: colors.primary,
          }}
        />
      )} */}

      <AppProvider>
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
                  animationDuration: 280,
                }}
              >
                <Stack.Screen name="(tabs)/_layout" />
              </Stack>
            </PaperProvider>
          </SafeAreaView>
        </RouteGuard>
      </AppProvider>

      <Toasts defaultPosition={ToastPosition.TOP} />
    </GestureHandlerRootView>
  );
}
