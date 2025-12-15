import { Animated, Pressable, View, StyleSheet } from "react-native";
import { useEffect, useRef, useState } from "react";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  overlayColor?: string;
  animationDuration?: number;
}

export default function CustomModal({
  visible,
  onClose,
  children,
  overlayColor = "rgba(0,0,0,0.5)",
  animationDuration = 200,
}: CustomModalProps) {
  const [show, setShow] = useState(visible);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShow(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }).start(() => setShow(false));
    }
  }, [visible]);

  if (!show) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Pressable
        style={[styles.backdrop, { backgroundColor: overlayColor }]}
        onPress={onClose}
      />
      <View style={styles.content}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    width: "80%",
    maxHeight: 400,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
