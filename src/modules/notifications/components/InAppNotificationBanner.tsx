import { Bell, X } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  title: string;
  body?: string;
  onPress: () => void;
  onDismiss: () => void;
  duration?: number;
}

export default function InAppNotificationBanner({
  title,
  body,
  onPress,
  onDismiss,
  duration = 2000,
}: Props) {
  const insets = useSafeAreaInsets();

  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = () => {
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
    }

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
    ]).start(() => {
      onDismiss();
    });
  };

  useEffect(() => {
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

    dismissTimer.current = setTimeout(() => {
      dismiss();
    }, duration);

    return () => {
      if (dismissTimer.current) {
        clearTimeout(dismissTimer.current);
      }
    };
  }, []);

  return (
    <Animated.View
      style={{
        top: insets.top,
        transform: [{ translateY }],
        opacity,
      }}
      className="absolute left-3 right-3 z-[9999] elevation-20"
    >
      <View
        className="flex-row items-center rounded-2xl px-4 py-4"
        style={{
          backgroundColor: "#DCFCE7",
        }}
      >
        {/* Icon */}
        <View className="h-9 w-9 items-center justify-center rounded-[10px] me-2">
          <Bell size={18} color="#166534" strokeWidth={3} />
        </View>

        {/* Clickable Content */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          className="mx-2 flex-1"
        >
          <Text
            numberOfLines={1}
            className="text-[16px] font-bold"
            style={{
              color: "#166534", // dark green
            }}
          >
            {title}
          </Text>

          {body ? (
            <Text
              numberOfLines={1}
              className="mt-0.5 text-[12px]"
              style={{
                color: "#166534", // dark green
              }}
            >
              {body}
            </Text>
          ) : null}
        </TouchableOpacity>

        {/* Close Button */}
        <TouchableOpacity
          onPress={dismiss}
          hitSlop={15}
          className="p-2"
          activeOpacity={0.5}
        >
          <X size={18} color="#166534" strokeWidth={3} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
