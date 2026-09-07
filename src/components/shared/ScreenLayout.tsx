import React from "react";
import {
  Platform,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";

interface ScreenLayoutProps {
  children: React.ReactNode;
  keyboardOffset?: number;
  scrollable?: boolean;
  refreshControl?: React.ReactElement;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollEventThrottle?: number;
  topPadding?: number;
}

export default function ScreenLayout({
  children,
  keyboardOffset = 30,
  scrollable = true,
  refreshControl,
  onScroll,
  scrollEventThrottle = 16,
  topPadding = 18,
}: ScreenLayoutProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.light,
        paddingTop: topPadding,
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
          refreshControl={refreshControl}
          onScroll={onScroll}
          scrollEventThrottle={scrollEventThrottle}
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
