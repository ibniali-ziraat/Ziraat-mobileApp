import { colors } from "@/src/constants/colors";
import { CheckCircle, XCircle } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import ZiraatCard from "./ZiraatProfileCard";

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
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const animatedWidth = anim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  // Sections in UI order
  const allSections = [...completedSections, ...missingSections];

  return (
    <ZiraatCard width="100%" paddingHorizontal={1} marginBottom={0.5}>
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            marginTop: 19,
            fontSize: 22,
            fontWeight: "700",
            color: colors.dark,
            letterSpacing: 0.4,
          }}
        >
          Profile Completion
        </Text>

        <Text
          style={{
            fontWeight: "700",
            fontSize: 16,
            color: colors.primary,
            marginTop: 19,
          }}
        >
          {progress}%
        </Text>
      </View>

      {/* ANIMATED PROGRESS BAR */}
      <View
        style={{
          height: 5,
          borderRadius: 10,
          backgroundColor: colors.neutral + "33",
          overflow: "hidden",
          marginBottom: 20,
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

      {/* SECTION STATUS (3 items per row) */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          // spacing between rows and columns
          marginHorizontal: -8,
        }}
      >
        {allSections.map((section) => {
          const isCompleted = completedSections.includes(section);

          return (
            <View
              key={section}
              style={{
                width: "33.333%",
                paddingHorizontal: 8,
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {isCompleted ? (
                  <CheckCircle size={18} color={colors.primary} />
                ) : (
                  <XCircle size={18} color="#d9534f" />
                )}

                <Text
                  style={{
                    fontSize: 14,
                    color: isCompleted ? colors.dark : "#d9534f",
                    fontWeight: isCompleted ? "600" : "500",
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ZiraatCard>
  );
}
