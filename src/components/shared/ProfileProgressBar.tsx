import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { profileArt } from "@/src/constants/iconArt";
import { CheckCircle, PlusCircle } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

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
            { fontSize: 17, color: cardTokens.inkPrimary },
          ]}
        >
          Profile completion
        </Text>

        <Text
          style={[
            typography.Poppins_xs_semibold,
            {
              fontSize: 13.5,
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

      {/* SECTION TILES — a picture per section, faded until it's filled in */}
      <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
        {allSections.map((section) => {
          const isCompleted = completedSections.includes(section);
          const key = section.toLowerCase();
          const art =
            key === "profile"
              ? profileArt.personal
              : (profileArt[key as keyof typeof profileArt] ??
                profileArt.personal);

          return (
            <View
              key={section}
              style={{
                flex: 1,
                alignItems: "center",
                paddingVertical: 10,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: isCompleted
                  ? chartTokens.tint
                  : cardTokens.hairline,
                backgroundColor: isCompleted
                  ? chartTokens.tint
                  : cardTokens.surface,
              }}
            >
              <View style={{ opacity: isCompleted ? 1 : 0.38 }}>
                <SvgXml xml={art} width={30} height={30} />
              </View>
              <View
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                }}
              >
                {isCompleted ? (
                  <CheckCircle
                    size={13}
                    color={cardTokens.surface}
                    fill={chartTokens.current}
                  />
                ) : (
                  <PlusCircle size={13} color={cardTokens.inkMuted} />
                )}
              </View>
              <Text
                numberOfLines={1}
                style={[
                  typography.Poppins_xs_medium,
                  {
                    marginTop: 6,
                    fontSize: 13,
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
      </View>

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
              { fontSize: 14, color: chartTokens.current },
            ]}
          >
            Profile complete
          </Text>
        </View>
      )}
    </View>
  );
}
