import { colors } from "@/src/constants/colors";
import { CheckCircle, XCircle } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, ScrollView, Text, View } from "react-native";

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
  const barAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(barAnim, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const animatedWidth = barAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  const allSections = [...completedSections, ...missingSections];

  return (
    <View
      style={{
        backgroundColor: colors.light,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        elevation: 2,
        shadowColor: colors.cardShadow,
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text
          style={{ fontSize: 14, fontWeight: "700", color: colors.neutral }}
        >
          Profile Completion
        </Text>

        <Text
          style={{
            fontSize: 13,
            fontWeight: "800",
            color: colors.primary,
            backgroundColor: colors.primary + "15",
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 20,
          }}
        >
          {Math.round(progress)}%
        </Text>
      </View>

      {/* PROGRESS BAR */}
      <View
        style={{
          height: 6,
          borderRadius: 30,
          backgroundColor: "#F1F3F6",
          overflow: "hidden",
          marginBottom: 14,
        }}
      >
        <Animated.View
          style={{
            height: "100%",
            width: animatedWidth,
            backgroundColor: colors.primary,
            borderRadius: 30,
          }}
        />
      </View>

      {/* SECTION PILLS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: "row", gap: 8 }}
      >
        {allSections.map((section) => {
          const isCompleted = completedSections.includes(section);
          return (
            <View
              key={section}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                backgroundColor: isCompleted
                  ? colors.primary + "12"
                  : colors.error + "10",
                borderWidth: 1,
                borderColor: isCompleted
                  ? colors.primary + "30"
                  : colors.error + "30",
              }}
            >
              {isCompleted ? (
                <CheckCircle size={13} color={colors.primary} />
              ) : (
                <XCircle size={13} color={colors.error} />
              )}
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 12,
                  fontWeight: "600",
                  color: isCompleted ? colors.primary : colors.error,
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {/* COMPLETE STATE */}
      {Math.round(progress) === 100 && (
        <View
          style={{
            marginTop: 14,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            paddingVertical: 10,
            borderRadius: 12,
            backgroundColor: colors.primary + "12",
          }}
        >
          <CheckCircle size={16} color={colors.primary} />
          <Text
            style={{ fontWeight: "700", fontSize: 13, color: colors.primary }}
          >
            Profile Complete
          </Text>
        </View>
      )}
    </View>
  );
}
