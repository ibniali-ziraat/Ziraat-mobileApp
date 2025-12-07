import { Stack } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

registerTranslation("en-GB", enGB);

import { Toasts } from "@backpackapp-io/react-native-toast";
import "../../styles/global.css";
import RouteGuard from "../components/RouteGuard";
import AppProvider from "../contexts/AppProvider";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <RouteGuard>
          <SafeAreaView
            style={{
              flex: 1,
              paddingTop: insets.top, // only top inset
              paddingBottom: insets.bottom, // bottom handled by tabs
            }}
          >
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <PaperProvider>
                <Stack screenOptions={{ headerShown: false }} />
              </PaperProvider>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </RouteGuard>
      </AppProvider>

      <Toasts />
    </GestureHandlerRootView>
  );
}
