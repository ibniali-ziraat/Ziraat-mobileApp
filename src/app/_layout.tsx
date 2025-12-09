import { Toasts } from "@backpackapp-io/react-native-toast";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import "../../styles/global.css";
import RouteGuard from "../components/RouteGuard";
import AppProvider from "../contexts/AppProvider";

registerTranslation("en-GB", enGB);

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppProvider>
          <RouteGuard>
            <SafeAreaView
              style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}
              edges={["top", "right", "left"]}
            >
              <PaperProvider>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(tabs)/_layout" />
                </Stack>
              </PaperProvider>
            </SafeAreaView>
          </RouteGuard>
        </AppProvider>

        <Toasts />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

