import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { Toasts } from "@backpackapp-io/react-native-toast";
import "../../styles/global.css";
import RouteGuard from "../components/RouteGuard";
import AppProvider from "../contexts/AppProvider";

export default function RootLayout() {
  return (
    <>
      <AppProvider>
        <RouteGuard>
          <SafeAreaView style={{ flex: 1 }}>
            <PaperProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </PaperProvider>
          </SafeAreaView>
        </RouteGuard>
      </AppProvider>
      <Toasts /> {/* Works on Web + Mobile */}
    </>
  );
}
