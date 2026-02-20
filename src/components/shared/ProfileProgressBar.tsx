import { colors } from "@/src/constants/colors";
import { shadows } from "@/src/constants/shadows";
import { CheckCircle, XCircle } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import CsText from "./CsText";

interface ProgressBarProps {
  progress: number; // expect 0–100
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
  const isComplete = Math.round(progress) === 100;

  return (
    <View 
      style={[{
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: 18,
        marginBottom: 16,
        // shadowColor: isComplete ? colors.primary : "#000",
        // shadowOffset: { width: 0, height: 6 },
        // shadowOpacity: isComplete ? 0.18 : 0.08,
        // shadowRadius: 10,

        // elevation: 4,
        // borderWidth: 1,
        // borderColor: isComplete ? colors.primary + "55" : "#F0F0F0",
      } ,shadows.profile_card,]}
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
        <View>
          <CsText
            style={{
              fontSize: 19,
              fontWeight: "600",
              color: colors.dark,
            }}
          >
            Profile Completion
          </CsText>

          <CsText
            style={{
              fontSize: 12,
              color: colors.neutral,
              marginTop: 2,
            }}
          >
            Finish remaining sections
          </CsText>
        </View>

        {/* INTEGER % ONLY */}
        <View
          style={{
            backgroundColor: colors.primary + "15",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 14,
          }}
        >
          <CsText
            style={{
              fontSize: 14,
              fontWeight: "800",
              color: colors.primary,
            }}
          >
            {Math.round(progress)}%
          </CsText>
        </View>
      </View>

      {/* PROGRESS BAR */}
      <View
        style={{
          height: 6,
          borderRadius: 20,
          backgroundColor: "#EFEFEF",
          overflow: "hidden",
          marginBottom: 20,
        }}
      >
        <Animated.View
          style={{
            height: "100%",
            width: animatedWidth,
            backgroundColor: colors.primary,
            borderRadius: 20,
          }}
        />
      </View>

      {/* SECTION PILLS */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 17,
        }}
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
                paddingVertical: 7,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: isCompleted
                  ? colors.primary + "40"
                  : "#F5B7B1",
                backgroundColor: isCompleted
                  ? colors.primary + "12"
                  : "#FFF3F3",
              }}
            >
              {isCompleted ? (
                <CheckCircle size={16} color={colors.primary} />
              ) : (
                <XCircle size={16} color="#d9534f" />
              )}

              <CsText
                style={{
                  marginLeft: 6,
                  fontSize: 13,
                  fontWeight: "600",
                  color: isCompleted ? colors.dark : "#d9534f",
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </CsText>
            </View>
          );
        })}
      </View>

      {/* SUCCESS */}
      {isComplete && (
        <View
          style={{
            marginTop: 18,
            padding: 12,
            borderRadius: 14,
            backgroundColor: colors.primary + "15",
            alignItems: "center",
          }}
        >
          <CsText
            style={{
              fontWeight: "600",
              color: colors.primary,
            }}
          >
            Profile completed
          </CsText>
        </View>
      )}
    </View>
  );
}
