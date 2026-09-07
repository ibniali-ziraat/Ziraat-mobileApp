import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
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
  }, [barAnim, progress]);

  const animatedWidth = barAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  const allSections = [...completedSections, ...missingSections];

  return (
    <View
      style={{
        paddingBottom: 22,
        marginBottom: 26,
        borderBottomWidth: 1,
        borderBottomColor: cardTokens.hairline,
        backgroundColor: cardTokens.surface,
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
          style={[
            typography.Poppins_s_semibold,
            { fontSize: 15, color: cardTokens.inkPrimary },
          ]}
        >
          Profile completion
        </Text>

        <Text
          style={[
            typography.Poppins_xs_semibold,
            {
              fontSize: 11,
              color: chartTokens.current,
              paddingLeft: 10,
            },
          ]}
        >
          {Math.round(progress)}%
        </Text>
      </View>

      {/* PROGRESS BAR */}
      <View
        style={{
          height: 5,
          borderRadius: 30,
          backgroundColor: chartTokens.track,
          overflow: "hidden",
          marginBottom: 12,
        }}
      >
        <Animated.View
          style={{
            height: "100%",
            width: animatedWidth,
            backgroundColor: chartTokens.current,
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
                paddingRight: 14,
                paddingVertical: 4,
              }}
            >
              {isCompleted ? (
                <CheckCircle size={12} color={chartTokens.current} />
              ) : (
                <XCircle size={12} color={cardTokens.inkMuted} />
              )}
              <Text
                style={[
                  typography.Poppins_xs_medium,
                  {
                    marginLeft: 5,
                    fontSize: 11,
                    color: isCompleted
                      ? cardTokens.inkPrimary
                      : cardTokens.inkMuted,
                  },
                ]}
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
            backgroundColor: cardTokens.mutedSurface,
          }}
        >
          <CheckCircle size={15} color={chartTokens.current} />
          <Text
            style={[
              typography.Poppins_xs_semibold,
              { fontSize: 12, color: chartTokens.current },
            ]}
          >
            Profile complete
          </Text>
        </View>
      )}
    </View>
  );
}
