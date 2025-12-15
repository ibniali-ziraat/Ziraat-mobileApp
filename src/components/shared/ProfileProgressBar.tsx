
import { colors } from "@/src/constants/colors";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

interface ProgressBarProps {
  progress: number;
  missingSections: string[];
  completedSections?: string[];
}

export default function ProfileProgressBar({
  progress,
  missingSections,
  completedSections = [],
}: ProgressBarProps) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: progress,
      duration: 600,
      useNativeDriver: false, // required for width animation
    }).start();
  }, [progress]);

  const animatedWidth = anim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 20,
        padding: 17,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        borderColor: "#f1f1f1",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 18, color: colors.dark }}>
          Profile Completion
        </Text>

        <Text
          style={{
            fontWeight: "700",
            fontSize: 16,
            color: colors.primary,
          }}
        >
          {progress}%
        </Text>
      </View>

      {/* ANIMATED PROGRESS BAR */}
      <View
        style={{
          height: 6,
          borderRadius: 10,
          backgroundColor: colors.neutral + "33",
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            height: "100%",
            width: animatedWidth,
            backgroundColor: colors.primary,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
}
