import { Toasts } from "@backpackapp-io/react-native-toast";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

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
          <SafeAreaView
            edges={['top', 'left', 'right',]}
            style={{
              flex: 1,
              paddingTop: 10,
              backgroundColor: "white",
              paddingHorizontal: 20,
            }}
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
    </GestureHandlerRootView>
  );
}
