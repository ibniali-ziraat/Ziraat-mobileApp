import React from "react";
import {
  Platform,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, {
  type AnimatedScrollViewProps,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";

// Reanimated-wrapped so a `useAnimatedScrollHandler` worklet passed as
// `onScroll` runs on the UI thread (needed by screens driving a collapsing
// header off scroll position) — plain JS `onScroll` callbacks used by every
// other screen keep working exactly as before, this is purely additive.
const AnimatedKeyboardAwareScrollView = Animated.createAnimatedComponent(
  KeyboardAwareScrollView,
);

interface ScreenLayoutProps {
  children: React.ReactNode;
  keyboardOffset?: number;
  scrollable?: boolean;
  refreshControl?: React.ReactElement;
  onScroll?:
    | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
    | AnimatedScrollViewProps["onScroll"];
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
        <AnimatedKeyboardAwareScrollView
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
        </AnimatedKeyboardAwareScrollView>
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
