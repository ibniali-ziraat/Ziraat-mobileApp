// components/discussion/DiscussionPanel.tsx

import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { colors } from "@/src/constants/colors";
import DiscussionHeader from "./ChatHeader";
import DiscussionInput from "./ChatInput";
import DiscussionMessages from "./ChatMessages";



const { height } = Dimensions.get("window");

export default function DiscussionPanel() {
  const [open, setOpen] = useState(false);
  const translateY = useSharedValue(height);

  const toggle = () => {
    if (open) {
      translateY.value = withSpring(height);
      setOpen(false);
    } else {
      setOpen(true);
      translateY.value = withSpring(0);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <TouchableOpacity style={styles.fab} onPress={toggle}>
          <Text style={styles.fabText}>💬</Text>
        </TouchableOpacity>
      )}

      {/* Chat Panel */}
      <Animated.View style={[styles.panel, animatedStyle]}>
        <DiscussionHeader onClose={toggle} />
        <DiscussionMessages />
        <DiscussionInput />
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 24,
    right: 20,
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 30,
    elevation: 6,
  },
  fabText: {
    color: colors.white,
    fontSize: 18,
  },
  panel: {
    position: "absolute",
    bottom: 0,
    height: "85%",
    width: "100%",
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
  },
});