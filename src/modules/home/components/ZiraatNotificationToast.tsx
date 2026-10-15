import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";

type NotifType = "success" | "warning" | "danger";

interface ZiraatNotificationToastProps {
  title: string;
  message: string;
  time?: string;
  tag?: string;
  type?: NotifType;
  duration?: number;
  onDismiss?: () => void;
}

const TYPE_CONFIG: Record<
  NotifType,
  {
    accentColor: string;
    iconName: string;
    iconColor: string;
    iconBg: string;
    tagDot: string;
    tagLabel: string;
    tagColor: string;
    progressColor: string;
  }
> = {
  success: {
    accentColor: "#1D9E75",
    iconName: "leaf-outline",
    iconColor: "#1D9E75",
    iconBg: "bg-emerald-50",
    tagDot: "bg-emerald-500",
    tagLabel: "Weather",
    tagColor: "text-emerald-800",
    progressColor: "#1D9E75",
  },
  warning: {
    accentColor: "#EF9F27",
    iconName: "alert-circle-outline",
    iconColor: "#EF9F27",
    iconBg: "bg-amber-50",
    tagDot: "bg-amber-400",
    tagLabel: "Crop Health",
    tagColor: "text-amber-800",
    progressColor: "#EF9F27",
  },
  danger: {
    accentColor: "#E24B4A",
    iconName: "warning-outline",
    iconColor: "#E24B4A",
    iconBg: "bg-red-50",
    tagDot: "bg-red-400",
    tagLabel: "Urgent",
    tagColor: "text-red-800",
    progressColor: "#E24B4A",
  },
};

export default function ZiraatNotificationToast({
  title,
  message,
  time = "just now",
  tag,
  type = "success",
  duration = 4000,
  onDismiss,
}: ZiraatNotificationToastProps) {
  const cfg = TYPE_CONFIG[type];

  const slideAnim = useRef(new Animated.Value(-120)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 18,
        stiffness: 180,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(progressAnim, {
      toValue: 0,
      duration,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => dismiss(), duration);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -140,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss?.());
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <Animated.View
      style={{ transform: [{ translateY: slideAnim }], opacity: opacityAnim }}
      className="absolute top-14 left-4 right-4 z-50"
    >
      {/* Card */}
      <View
        className="bg-white rounded-2xl overflow-hidden border border-black/[0.07] flex-row items-start px-3.5 py-3 pl-5 gap-2.5"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        {/* Left accent bar — dynamic color requires inline style */}
        <View
          style={{ backgroundColor: cfg.accentColor }}
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
        />

        {/* Icon bubble */}
        <View
          className={`w-9 h-9 rounded-xl items-center justify-center mt-0.5 ${cfg.iconBg}`}
        >
          <Ionicons
            name={cfg.iconName as any}
            size={18}
            color={cfg.iconColor}
          />
        </View>

        {/* Body */}
        <View className="flex-1 min-w-0">
          {/* Title + time row */}
          <View className="flex-row items-center justify-between gap-2 mb-0.5">
            <Text
              className="text-[15px] font-semibold text-gray-900 flex-1"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className="text-[12.5px] text-gray-400">{time}</Text>
          </View>

          {/* Message */}
          <Text
            className="text-[14px] text-gray-500 leading-[17px]"
            numberOfLines={2}
          >
            {message}
          </Text>

          {/* Tag pill */}
          <View className="flex-row items-center gap-1.5 mt-1.5">
            <View className={`w-1.5 h-1.5 rounded-full ${cfg.tagDot}`} />
            <Text className={`text-[13px] font-medium ${cfg.tagColor}`}>
              {tag ?? cfg.tagLabel}
            </Text>
          </View>
        </View>

        {/* Close button */}
        <Pressable
          onPress={dismiss}
          className="w-5 h-5 rounded-full bg-gray-100 items-center justify-center mt-0.5"
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={11} color="#9ca3af" />
        </Pressable>

        {/* Animated progress bar — width is animated so inline style required */}
        <Animated.View
          style={{ width: progressWidth, backgroundColor: cfg.progressColor }}
          className="absolute bottom-0 left-0 h-[2px] rounded-bl-2xl"
        />
      </View>
    </Animated.View>
  );
}
