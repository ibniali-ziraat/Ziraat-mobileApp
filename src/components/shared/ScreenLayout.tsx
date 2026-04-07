import { colors } from "@/src/constants/colors";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface ScreenLayoutProps {
  children: React.ReactNode;
  keyboardOffset?: number;
  scrollable?: boolean;
}

export default function ScreenLayout({
  children,
  keyboardOffset = 30,
  scrollable = true,
}: ScreenLayoutProps) {
  // ⭐ Get dynamic safe area values
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={keyboardOffset}
    >
      {/* ⭐ Apply safe area properly */}
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.light,
        }}
        edges={["top", "bottom"]}
      >
        {scrollable ? (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,

              // ⭐ Dynamic bottom spacing
              paddingBottom: insets.bottom + 0,

              backgroundColor: colors.light,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1 }}>{children}</View>
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: colors.light,

              // ⭐ Dynamic bottom spacing
              paddingBottom: insets.bottom + 80,
            }}
          >
            {children}
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
