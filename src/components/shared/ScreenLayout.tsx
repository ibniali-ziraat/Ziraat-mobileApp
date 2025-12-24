import { colors } from "@/src/constants/colors";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

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
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardOffset}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        {scrollable ? (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: Platform.OS === "android" ? 40 : 100,
              paddingHorizontal: 5,
              backgroundColor: colors.light,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1 }}>{children}</View>
          </ScrollView>
        ) : (
          <View style={{ flex: 1, backgroundColor: colors.light,
            paddingBottom: Platform.OS === "android" ? 40 : 100,
              paddingHorizontal: 5,
           }}>
            {children}
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
