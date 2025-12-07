import { Toasts } from "@backpackapp-io/react-native-toast";
import { Stack } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "../../styles/global.css";
import RouteGuard from "../components/RouteGuard";
import AppProvider from "../contexts/AppProvider";
registerTranslation("en-GB", enGB);

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <RouteGuard>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <PaperProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)/_layout" />
              </Stack>
            </PaperProvider>
          </KeyboardAvoidingView>
        </RouteGuard>
      </AppProvider>

      <Toasts />
    </GestureHandlerRootView>
  );
}
