

import { colors } from "@/src/constants/colors";
import { shadows } from "@/src/constants/shadows";
import {
  CheckCircle,
  ChevronRight,
  XCircle,
} from "lucide-react-native";
import { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import CsText from "./CsText";

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
  const scrollRef = useRef<ScrollView>(null);

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
      style={[
        {
          backgroundColor: "#fff",
          borderRadius: 26,
          padding: 20,
          marginBottom: 16,
        },
        shadows.profile_card,
      ]}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <View>
          <CsText
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: colors.dark,
            }}
          >
            Profile Completion
          </CsText>

          <CsText
            style={{
              fontSize: 12,
              color: colors.neutral,
              marginTop: 4,
            }}
          >
            Complete all steps to unlock full access
          </CsText>
        </View>

        {/* % BADGE */}
        <View
          style={{
            backgroundColor: colors.primary + "12",
            paddingHorizontal: 14,
            paddingVertical: 6,
            borderRadius: 20,
          }}
        >
          <CsText
            style={{
              fontSize: 15,
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
          height: 8,
          borderRadius: 30,
          backgroundColor: "#F1F3F6",
          overflow: "hidden",
          marginBottom: 18,
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

      {/* SECTION PILLS + SCROLL */}
      <View style={{ position: "relative" }}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingRight: 60,
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
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor: isCompleted
                    ? colors.primary + "12"
                    : "#F8FAFC",
                  borderWidth: 1,
                  borderColor: isCompleted
                    ? colors.primary + "30"
                    : "#E5E7EB",

                  // subtle depth
                  shadowColor: "#000",
                  shadowOpacity: 0.03,
                  shadowRadius: 4,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: 1,
                }}
              >
                {isCompleted ? (
                  <CheckCircle size={14} color={colors.primary} />
                ) : (
                  <XCircle size={14} color="#E57373" />
                )}

                <CsText
                  style={{
                    marginLeft: 6,
                    fontSize: 12.5,
                    fontWeight: "600",
                    color: colors.dark,
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </CsText>
              </View>
            );
          })}
        </ScrollView>

        {/* RIGHT FADE + CLICKABLE CHEVRON */}
        <View
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* FADE */}
          <View
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 20,
              backgroundColor: "white",
            }}
          />

          {/* CLICKABLE ARROW */}
          <TouchableOpacity
            onPress={() => {
              scrollRef.current?.scrollTo({
                x: 120,
                animated: true,
              });
            }}
            style={{
              padding: 6,
              borderRadius: 20,
            }}
          >
            <ChevronRight size={20} color={colors.neutral} />
          </TouchableOpacity>
        </View>
      </View>

      {/* SUCCESS */}
      {isComplete && (
        <View
          style={{
            marginTop: 20,
            padding: 14,
            borderRadius: 18,
            backgroundColor: colors.primary + "12",
            alignItems: "center",
          }}
        >
          <CheckCircle size={20} color={colors.primary} />

          <CsText
            style={{
              marginTop: 6,
              fontWeight: "700",
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