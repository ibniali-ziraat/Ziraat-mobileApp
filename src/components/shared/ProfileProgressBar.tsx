import { colors } from "@/src/constants/colors";
import { useEffect, useRef } from "react";
import { Animated, Text, View, Dimensions } from "react-native";
import { CheckCircle } from "lucide-react-native";

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
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    const width = anim.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
    });

    const allSections = [...completedSections, ...missingSections];
    const screenWidth = Dimensions.get("window").width;
    const itemWidth = (screenWidth - 64) / 4; // 16px padding left/right + 12px gap

    return (
        <View
            style={{
                marginVertical: 20,
                padding: 16,
                borderRadius: 12,
                backgroundColor: colors.light,
                shadowColor: colors.cardShadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4,
            }}
        >
            {/* Header */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 12,
                }}
            >
                <Text style={{ fontWeight: "600", fontSize: 16, color: colors.dark }}>
                    Profile Completion
                </Text>
                <Text style={{ fontWeight: "600", fontSize: 14, color: colors.primary }}>
                    {progress}%
                </Text>
            </View>

            {/* Progress Bar */}
            <View
                style={{
                    height: 8,
                    backgroundColor: colors.neutral + "33",
                    borderRadius: 7,
                    overflow: "hidden",
                }}
            >
                <Animated.View
                    style={{
                        height: "100%",
                        width,
                        backgroundColor: colors.primary,
                        borderRadius: 7,
                    }}
                />
            </View>

            {/* Sections Grid */}
            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: 16,
                    gap: 12, // spacing between items
                }}
            >
                {allSections.map((section) => {
                    const isCompleted = completedSections.includes(section);

                    return (
                        <View
                            key={section}
                            style={{
                                width: itemWidth,
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            {isCompleted ? (
                                <CheckCircle size={20} color={colors.primary} />
                            ) : (
                                <View
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 10,
                                        borderWidth: 2,
                                        borderColor: colors.warning,
                                    }}
                                />
                            )}
                            <Text
                                style={{
                                    marginLeft: 6,
                                    color: isCompleted ? colors.dark : colors.neutral,
                                    fontWeight: isCompleted ? "600" : "400",
                                    fontSize: 13,
                                    flexWrap: "wrap",
                                }}
                            >
                                {section}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
