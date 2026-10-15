import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
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
  duration = 4000,
}: Props) {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;

  const translateY = useRef(new Animated.Value(-200)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = () => {
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
    }

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -200,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
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
        damping: 15,
        stiffness: 150,
        mass: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
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
        position: "absolute",
        top: insets.top + 8,
        alignSelf: "center",
        width: screenWidth - 32,
        zIndex: 9999,
        opacity,
        transform: [{ translateY }],
      }}
    >
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 16,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        {/* App Icon */}
        <Image
          source={require("../../../../assets/images/Icon.png")}
          resizeMode="contain"
          style={{
            width: 40,
            height: 40,
            marginRight: 14,
            borderRadius: 8,
          }}
        />

        {/* Content */}
        <View style={{ flex: 1 }}>
          {/* Title */}
          <Text
            numberOfLines={2}
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: "#000",
              marginBottom: body ? 2 : 0,
            }}
          >
            New Notification
            {/* {title} */}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
