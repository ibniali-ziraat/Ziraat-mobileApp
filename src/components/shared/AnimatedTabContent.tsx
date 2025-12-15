// src/components/shared/AnimatedTabContent.tsx
import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { MotiView, AnimatePresence } from "moti";

interface AnimatedTabContentProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function AnimatedTabContent({
  children,
  style,
}: AnimatedTabContentProps) {
  return (
    <AnimatePresence>
      <MotiView
        from={{ opacity: 0, translateY: 8 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: 8 }}
        transition={{ type: "timing", duration: 200 }}
        style={[{ flex: 1 }, style]}
        key={Math.random()} // ensure AnimatePresence triggers on mount
      >
        {children}
      </MotiView>
    </AnimatePresence>
  );
}
