import { colors } from "@/src/constants/colors";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenLayoutProps {
  children: React.ReactNode;
  keyboardOffset?: number;
}

export default function ScreenLayout({
  children,
  keyboardOffset = 30,
}: ScreenLayoutProps) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.light}}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardOffset}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <ScrollView
          contentContainerStyle={{  paddingBottom: Platform.OS=="android"?40:100 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1 }}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
