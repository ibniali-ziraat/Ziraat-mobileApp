// // import { colors } from "@/src/constants/colors";
// // import { useEffect, useRef } from "react";
// // import { Animated, Text, View, Dimensions } from "react-native";
// // import { CheckCircle } from "lucide-react-native";

// // interface ProgressBarProps {
// //     progress: number;
// //     missingSections: string[];
// //     completedSections?: string[];
// // }

// // export default function ProfileProgressBar({
// //     progress,
// //     missingSections,
// //     completedSections = [],
// // }: ProgressBarProps) {
// //     const anim = useRef(new Animated.Value(0)).current;

// //     useEffect(() => {
// //         Animated.timing(anim, {
// //             toValue: progress,
// //             duration: 500,
// //             useNativeDriver: false,
// //         }).start();
// //     }, [progress]);

// //     const width = anim.interpolate({
// //         inputRange: [0, 100],
// //         outputRange: ["0%", "100%"],
// //     });

// //     const allSections = [...completedSections, ...missingSections];
// //     const screenWidth = Dimensions.get("window").width;
// //     const itemWidth = (screenWidth - 64) / 4; // 16px padding left/right + 12px gap

// //     return (
// //         <View
// //             style={{
// //                 marginVertical: 20,
// //                 padding: 16,
// //                 borderRadius: 12,
// //                 backgroundColor: colors.light,
// //                 shadowColor: colors.cardShadow,
// //                 shadowOffset: { width: 0, height: 2 },
// //                 shadowOpacity: 0.3,
// //                 shadowRadius: 4,
// //                 elevation: 4,
// //             }}
// //         >
// //             {/* Header */}
// //             <View
// //                 style={{
// //                     flexDirection: "row",
// //                     justifyContent: "space-between",
// //                     marginBottom: 12,
// //                 }}
// //             >
// //                 <Text style={{ fontWeight: "600", fontSize: 16, color: colors.dark }}>
// //                     Profile Completion
// //                 </Text>
// //                 <Text style={{ fontWeight: "600", fontSize: 14, color: colors.primary }}>
// //                     {progress}%
// //                 </Text>
// //             </View>

// //             {/* Progress Bar */}
// //             <View
// //                 style={{
// //                     height: 8,
// //                     backgroundColor: colors.neutral + "33",
// //                     borderRadius: 7,
// //                     overflow: "hidden",
// //                 }}
// //             >
// //                 <Animated.View
// //                     style={{
// //                         height: "100%",
// //                         width,
// //                         backgroundColor: colors.primary,
// //                         borderRadius: 7,
// //                     }}
// //                 />
// //             </View>

// //             {/* Sections Grid */}
// //             <View
// //                 style={{
// //                     flexDirection: "row",
// //                     flexWrap: "wrap",
// //                     marginTop: 16,
// //                     gap: 12, // spacing between items
// //                 }}
// //             >
// //                 {allSections.map((section) => {
// //                     const isCompleted = completedSections.includes(section);

// //                     return (
// //                         <View
// //                             key={section}
// //                             style={{
// //                                 width: itemWidth,
// //                                 flexDirection: "row",
// //                                 alignItems: "center",
// //                             }}
// //                         >
// //                             {isCompleted ? (
// //                                 <CheckCircle size={20} color={colors.primary} />
// //                             ) : (
// //                                 <View
// //                                     style={{
// //                                         width: 20,
// //                                         height: 20,
// //                                         borderRadius: 10,
// //                                         borderWidth: 2,
// //                                         borderColor: colors.warning,
// //                                     }}
// //                                 />
// //                             )}
// //                             <Text
// //                                 style={{
// //                                     marginLeft: 6,
// //                                     color: isCompleted ? colors.dark : colors.neutral,
// //                                     fontWeight: isCompleted ? "600" : "400",
// //                                     fontSize: 13,
// //                                     flexWrap: "wrap",
// //                                 }}
// //                             >
// //                                 {section}
// //                             </Text>
// //                         </View>
// //                     );
// //                 })}
// //             </View>
// //         </View>
// //     );
// // }


// import { colors } from "@/src/constants/colors";
// import { CheckCircle } from "lucide-react-native";
// import { useEffect, useRef } from "react";
// import { Animated, Dimensions, Text, View } from "react-native";

// interface ProgressBarProps {
//     progress: number;
//     missingSections: string[];
//     completedSections?: string[];
// }

// export default function ProfileProgressBar({
//     progress,
//     missingSections,
//     completedSections = [],
// }: ProgressBarProps) {
//     const anim = useRef(new Animated.Value(0)).current;

//     useEffect(() => {
//         Animated.timing(anim, {
//             toValue: progress,
//             duration: 500,
//             useNativeDriver: false,
//         }).start();
//     }, [progress]);

//     const width = anim.interpolate({
//         inputRange: [0, 100],
//         outputRange: ["0%", "100%"],
//     });

//     const allSections = [...completedSections, ...missingSections];
//     const screenWidth = Dimensions.get("window").width;
//     const itemWidth = (screenWidth - 64) / 4; // 16px padding left/right + 12px gap

//     return (
//         <View
//             style={{
//                 marginVertical: 20,
//                 padding: 18,
//                 borderRadius: 14,
//                 backgroundColor: "#fff",
//                 shadowColor: "#000",
//                 shadowOffset: { width: 0, height: 3 },
//                 shadowOpacity: 0.15,
//                 shadowRadius: 6,
//                 elevation: 5,
//             }}
//         >
//             {/* Header */}
//             <View
//                 style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                     marginBottom: 16,
//                 }}
//             >
//                 <Text style={{ fontWeight: "700", fontSize: 17, color: colors.dark }}>
//                     Profile Completion
//                 </Text>
//                 <Text style={{ fontWeight: "700", fontSize: 15, color: colors.primary }}>
//                     {progress}%
//                 </Text>
//             </View>

//             {/* Progress Bar */}
//             <View
//                 style={{
//                     height: 10,
//                     backgroundColor: colors.neutral + "22",
//                     borderRadius: 20,
//                     overflow: "hidden",
//                 }}
//             >
//                 <Animated.View
//                     style={{
//                         height: "100%",
//                         width,
//                         backgroundColor: colors.primary,
//                         borderRadius: 20,
//                     }}
//                 />
//             </View>

//             {/* Sections Grid */}
//             <View
//                 style={{
//                     flexDirection: "row",
//                     flexWrap: "wrap",
//                     marginTop: 20,
//                     gap: 14,
//                 }}
//             >
//                 {allSections.map((section) => {
//                     const isCompleted = completedSections.includes(section);

//                     return (
//                         <View
//                             key={section}
//                             style={{
//                                 width: itemWidth,
//                                 flexDirection: "row",
//                                 alignItems: "center",
//                             }}
//                         >
//                             {isCompleted ? (
//                                 <CheckCircle size={20} color={colors.primary} />
//                             ) : (
//                                 <View
//                                     style={{
//                                         width: 20,
//                                         height: 20,
//                                         borderRadius: 10,
//                                         borderWidth: 2,
//                                         borderColor: colors.warning,
//                                         backgroundColor: colors.warning + "11",
//                                     }}
//                                 />
//                             )}
//                             <Text
//                                 style={{
//                                     marginLeft: 6,
//                                     color: isCompleted ? colors.dark : colors.neutral,
//                                     fontWeight: isCompleted ? "600" : "400",
//                                     fontSize: 13,
//                                     flexWrap: "wrap",
//                                 }}
//                             >
//                                 {section}
//                             </Text>
//                         </View>
//                     );
//                 })}
//             </View>
//         </View>
//     );
// }



import { colors } from "@/src/constants/colors";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, Text, View } from "react-native";

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
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, []);

    const screenWidth = Dimensions.get("window").width;
    const allSections = ["Profile", "Address", "Education", "Profession"];

    return (
        <View
            style={{
                marginVertical: 20,
                padding: 20,
                borderRadius: 18,
                backgroundColor: "#fff",
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 5,
                borderColor: "#f1f1f1",
                borderWidth: 1,
            }}
        >
            {/* HEADER */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 25,
                }}
            >
                <Text style={{ fontWeight: "700", fontSize: 22, color: colors.dark }}>
                    Profile Completion
                </Text>

                <Text
                    style={{
                        fontWeight: "700",
                        fontSize: 15,
                        color: colors.primary,
                        backgroundColor: colors.primary + "22",
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 10,
                    }}
                >
                    {progress}%
                </Text>
            </View>

            {/* DOT INDICATOR */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                    paddingHorizontal: 4,
                }}
            >
                {allSections.map((section, index) => {
                    const completed = completedSections.includes(section.toLowerCase());

                    const scaleAnim = anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.6, 1],
                    });

                    return (
                        <Animated.View
                            key={section}
                            style={{
                                alignItems: "center",
                                transform: [{ scale: scaleAnim }],
                                opacity: anim,
                            }}
                        >
                            {/* DOT */}
                            <View
                                style={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: 8,
                                    backgroundColor: completed
                                        ? colors.primary
                                        : colors.secondary + "20",
                                    borderWidth: completed ? 0 : 2,
                                    borderColor: colors.secondary,
                                    shadowColor: completed ? colors.primary : "transparent",
                                    shadowOpacity: completed ? 0.35 : 0,
                                    shadowRadius: completed ? 5 : 0,
                                    shadowOffset: { width: 0, height: 1 },
                                }}
                            />

                            {/* LABEL */}
                            <Text
                                style={{
                                    marginTop: 6,
                                    fontSize: 11,
                                    fontWeight: "500",
                                    color: completed ? colors.primary : colors.neutral,
                                    textTransform: "capitalize",
                                }}
                            >
                                {section}
                            </Text>
                        </Animated.View>
                    );
                })}
            </View>

            
            
        </View>
    );
}

