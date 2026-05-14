import { colors } from "@/src/constants/colors";
import { Bell, X } from "lucide-react-native";
import { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  title: string;
  body?: string;
  onPress: () => void;
  onDismiss: () => void;
  /** Auto-dismiss after ms. Default 4000 */
  duration?: number;
}

export default function InAppNotificationBanner({
  title,
  body,
  onPress,
  onDismiss,
  duration = 4000,
}: Props) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = () => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -120,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss());
  };

  useEffect(() => {
    // Slide in
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 18,
        stiffness: 200,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-dismiss
    dismissTimer.current = setTimeout(dismiss, duration);
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          top: insets.top + 8,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Pressable
        style={styles.inner}
        onPress={onPress}
        android_ripple={{ color: colors.primary + "22" }}
      >
        {/* Icon */}
        <View style={styles.iconWrap}>
          <Bell size={18} color={colors.primary} strokeWidth={1.8} />
        </View>

        {/* Text */}
        <View style={styles.textWrap}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {body ? (
            <Text style={styles.body} numberOfLines={1}>
              {body}
            </Text>
          ) : null}
        </View>

        {/* Dismiss */}
        <TouchableOpacity
          onPress={dismiss}
          hitSlop={12}
          style={styles.closeBtn}
        >
          <X size={14} color={colors.darkHover} />
        </TouchableOpacity>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 12,
    right: 12,
    zIndex: 9999,
    elevation: 20, // Android
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.primary + "22",
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primary + "12",
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 13.5,
    fontWeight: "700",
    color: colors.dark,
  },
  body: {
    fontSize: 12.5,
    color: colors.darkHover,
    fontWeight: "400",
  },
  closeBtn: {
    padding: 4,
  },
});
