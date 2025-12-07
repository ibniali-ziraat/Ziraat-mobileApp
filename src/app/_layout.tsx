import { Stack } from "expo-router";
import { KeyboardAvoidingView, Platform, View } from "react-native";
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
              paddingTop: insets.top,
              backgroundColor: "white",
              paddingBottom: insets.bottom,
            }}
          >
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <PaperProvider>
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 20, // <— your global padding
                    backgroundColor: "white",
                  }}
                >
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)/_layout" />
                  </Stack>
                </View>
              </PaperProvider>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </RouteGuard>
      </AppProvider>

      <Toasts />
    </GestureHandlerRootView>
  );
}
