import React from "react";
import { Platform, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.light,
        paddingTop: 18,
      }}
      edges={["bottom"]}
    >
      {scrollable ? (
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          extraScrollHeight={keyboardOffset}
          extraHeight={120}
          enableAutomaticScroll
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS === "android" ? 20 : 60,
            backgroundColor: colors.light,
          }}
        >
          <View style={{ flex: 1 }}>{children}</View>
        </KeyboardAwareScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.light,
            paddingBottom: Platform.OS === "android" ? 40 : 100,
          }}
        >
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}
