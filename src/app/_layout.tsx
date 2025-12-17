import { ToastPosition, Toasts } from "@backpackapp-io/react-native-toast";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import "../../styles/global.css";
import RouteGuard from "../components/RouteGuard";
import { DisableBackWrapper } from "../components/shared/DisableBackWrapper";
import { colors } from "../constants/colors";
import AppProvider from "../contexts/AppProvider";

registerTranslation("en-GB", enGB);

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" translucent animated />

      <AppProvider>
        <DisableBackWrapper>
          <RouteGuard>
            <LinearGradient
              colors={colors.bgGradient.colors}
              locations={colors.bgGradient.locations}
              start={{ x: 0.5, y: 0 }}   // top
              end={{ x: 0.5, y: 1 }}     // bottom
              style={{ flex: 1 }}
            >
              <SafeAreaView
                edges={["left", "right"]}
                style={{
                  flex: 1,
                  paddingTop: insets.top + 20,
                  paddingHorizontal: 10,
                  backgroundColor: "transparent",
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
            </LinearGradient>
          </RouteGuard>
        </DisableBackWrapper>
      </AppProvider>

      <Toasts defaultPosition={ToastPosition.TOP} />
    </GestureHandlerRootView>
  );
}
