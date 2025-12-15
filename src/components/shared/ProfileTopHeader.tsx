// // // import { colors } from "@/src/constants/colors";
// // // import { Feather } from "@expo/vector-icons";
// // // import { Image, Text, TouchableOpacity, View } from "react-native";

// // // interface ProfileTopHeaderProps {
// // //     profilePic?: string;
// // //     fullName?: string;
// // //     onEdit?: () => void;
// // // }

// // // export default function ProfileTopHeader({ profilePic, fullName, onEdit }: ProfileTopHeaderProps) {
// // //     return (
// // //         <View className="items-center mb-4">
// // //             {/* Profile Image */}
// // //             <View className="relative mb-4">
// // //                 <Image
// // //                     source={{ uri: profilePic || "https://placehold.co/200x200" }}
// // //                     className="w-28 h-28 rounded-full"
// // //                     style={{
// // //                         borderWidth: 2,
// // //                         borderColor: colors.primary,
// // //                         shadowColor: colors.neutral,
// // //                         shadowOffset: { width: 0, height: 2 },
// // //                         shadowOpacity: 0.2,
// // //                         shadowRadius: 4,
// // //                     }}
// // //                 />
// // //             </View>

// // //             {/* Full Name with Edit */}
// // //             <View className="flex-row items-center gap-2">
// // //                 <Text className="text-xl font-bold" style={{ color: colors.primary }}>
// // //                     {fullName || "N/A"}
// // //                 </Text>
// // //                 {onEdit && (
// // //                     <TouchableOpacity onPress={onEdit}>
// // //                         <Feather name="edit-3" size={20} color={colors.primary} />
// // //                     </TouchableOpacity>
// // //                 )}
// // //             </View>
// // //         </View>
// // //     );
// // // }


// // import { colors } from "@/src/constants/colors";
// // import { Feather } from "@expo/vector-icons";
// // import { Image, Text, TouchableOpacity, View } from "react-native";

// // interface ProfileTopHeaderProps {
// //     profilePic?: string;
// //     fullName?: string;
// //     onEdit?: () => void;
// // }

// // export default function ProfileTopHeader({ profilePic, fullName, onEdit }: ProfileTopHeaderProps) {
// //     const initials = fullName
// //         ? fullName
// //               .split(" ")
// //               .map((w) => w[0])
// //               .join("")
// //               .substring(0, 2)
// //               .toUpperCase()
// //         : "TA"

// //     return (
// //         <View className="items-center mb-4">

// //             {/* Avatar Container */}
// //             <TouchableOpacity activeOpacity={0.8} className="relative mb-4">

// //                 {/* If image exists → show image, otherwise show initials avatar */}
// //                 {profilePic ? (
// //                     <Image
// //                         source={{ uri: profilePic }}
// //                         className="w-32 h-32 rounded-full"
// //                         style={{
// //                             borderWidth: 3,
// //                             borderColor: colors.primary,
// //                             shadowColor: "#000",
// //                             shadowOffset: { width: 0, height: 3 },
// //                             shadowOpacity: 0.25,
// //                             shadowRadius: 5,
// //                         }}
// //                     />
// //                 ) : (
// //                     <View
// //                         className="w-32 h-32 rounded-full items-center justify-center"
// //                         style={{
// //                             backgroundColor: colors.primary + "33",
// //                             borderWidth: 3,
// //                             borderColor: colors.primary,
// //                             shadowColor: "#000",
// //                             shadowOffset: { width: 0, height: 3 },
// //                             shadowOpacity: 0.25,
// //                             shadowRadius: 5,
// //                         }}
// //                     >
// //                         <Text
// //                             className="text-4xl font-bold"
// //                             style={{ color: colors.primary }}
// //                         >
// //                             {initials}
// //                         </Text>
// //                     </View>
// //                 )}

// //                 {/* Camera Icon Overlay */}
// //                 <View
// //                     className="absolute bottom-1 right-1 rounded-full p-2"
// //                     style={{
// //                         backgroundColor: colors.primary,
// //                         shadowColor: "#000",
// //                         shadowOffset: { width: 0, height: 2 },
// //                         shadowOpacity: 0.3,
// //                         shadowRadius: 3,
// //                     }}
// //                 >
// //                     <Feather name="camera" size={18} color="#fff" />
// //                 </View>
// //             </TouchableOpacity>

// //             {/* Full Name + Edit Icon */}
// //             <View className="flex-row items-center gap-2">
// //                 <Text className="text-xl font-bold" style={{ color: colors.primary }}>
// //                     {fullName || "Tansha ashraf"}
// //                 </Text>

// //                 {onEdit && (
// //                     <TouchableOpacity onPress={onEdit}>
// //                         <Feather name="edit-3" size={20} color={colors.primary} />
// //                     </TouchableOpacity>
// //                 )}
// //             </View>
// //         </View>
// //     );
// // }


// import { colors } from "@/src/constants/colors";
// import { Feather } from "@expo/vector-icons";
// import { Image, Text, TouchableOpacity, View } from "react-native";

// interface ProfileTopHeaderProps {
//     profilePic?: string;
//     fullName?: string;
//     onEdit?: () => void;
// }

// // Default avatar image (replace with your local asset if needed)
// const defaultAvatar =
//     "https://cdn-icons-png.flaticon.com/512/847/847969.png";

// export default function ProfileTopHeader({ profilePic, fullName, onEdit }: ProfileTopHeaderProps) {
//     const initials = fullName
//         ? fullName
//               .split(" ")
//               .map((w) => w[0])
//               .join("")
//               .substring(0, 2)
//               .toUpperCase()
//         : "TA";

//     return (
//         <View className="items-center mb-6">

//             {/* Avatar Container */}
//             <TouchableOpacity activeOpacity={0.9} className="relative mb-4">

//                 {/* Profile Image OR Default Avatar */}
//                 <Image
//                     source={{ uri: profilePic || defaultAvatar }}
//                     className="w-32 h-32 rounded-full"
//                     style={{
//                         borderWidth: 4,
//                         borderColor: colors.primary,
//                         shadowColor: "#000",
//                         shadowOffset: { width: 0, height: 4 },
//                         shadowOpacity: 0.3,
//                         shadowRadius: 6,
//                         backgroundColor: colors.primary + "22",
//                     }}
//                 />

//                 {/* Camera Icon */}
//                 <View
//                     className="absolute bottom-1 right-1 rounded-full p-2"
//                     style={{
//                         backgroundColor: colors.primary,
//                         shadowColor: "#000",
//                         shadowOffset: { width: 0, height: 2 },
//                         shadowOpacity: 0.3,
//                         shadowRadius: 4,
//                         elevation: 4,
//                         borderWidth: 2,
//                         borderColor: "#fff",
//                     }}
//                 >
//                     <Feather name="camera" size={18} color="#fff" />
//                 </View>
//             </TouchableOpacity>

//             {/* Full Name + Edit */}
//             <View className="flex-row items-center gap-2">
//                 <Text
//                     className="font-bold"
//                     style={{
//                         fontSize: 22,
//                         color: colors.primary,
//                         textTransform: "capitalize",
//                     }}
//                 >
//                     {fullName || "Tansha ashraf"}
//                 </Text>

//                 {onEdit && (
//                     <TouchableOpacity onPress={onEdit} style={{ padding: 4 }}>
//                         <Feather name="edit-3" size={20} color={colors.primary} />
//                     </TouchableOpacity>
//                 )}
//             </View>
//         </View>
//     );
// }

import { colors } from "@/src/constants/colors";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import ZiraatCard from "./ZiraatProfileCard";

interface ProfileTopHeaderProps {
    profilePic?: string;
    fullName?: string;
    onEdit?: () => void;
}

export default function ProfileTopHeader({ fullName, onEdit }: ProfileTopHeaderProps) {
    const initials = fullName
        ? fullName
              .split(" ")
              .map((w) => w[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()
        : "TA";

    return (
        <ZiraatCard
            width="100%"
            height="15%"
            paddingHorizontal={1}
            paddingVertical={1}
        >
            <View style={{ alignItems: "center", marginTop: 10 }}>

                {/* Initials Avatar */}
                <TouchableOpacity activeOpacity={0.9} style={{ position: "relative" }}>
                    
                    <View
                        style={{
                            width: 110,
                            height: 110,
                            borderRadius: 65,
                            backgroundColor: colors.primary + "22",
                            borderWidth: 4,
                            borderColor: colors.primary,
                            alignItems: "center",
                            justifyContent: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            
                            shadowRadius: 6,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 48,
                                fontWeight: "700",
                                color: colors.primary,
                            }}
                        >
                            {initials}
                        </Text>
                    </View>

                    {/* Edit Button */}
                    {onEdit && (
                        <TouchableOpacity
                            onPress={onEdit}
                            style={{
                                position: "absolute",
                                top: -6,
                                right: -6,
                                padding: 6,
                                backgroundColor: "#fff",
                                borderRadius: 50,
                                shadowColor: "#000",
                                shadowOpacity: 0.2,
                                shadowOffset: { width: 0, height: 2 },
                                shadowRadius: 3,
                                elevation: 3,
                            }}
                        >
                            <Feather name="edit-3" size={16} color={colors.primary} />
                        </TouchableOpacity>
                    )}

                    {/* Camera Icon */}
                    <View
                        style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            padding: 6,
                            backgroundColor: colors.primary,
                            borderRadius: 50,
                            shadowColor: "#000",
                            shadowOpacity: 0.3,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 4,
                            elevation: 4,
                            borderWidth: 2,
                            borderColor: "#fff",
                        }}
                    >
                        <Feather name="camera" size={18} color="#fff" />
                    </View>
                </TouchableOpacity>

                {/* Full Name */}
                <Text
                    style={{
                        marginTop: 12,
                        fontSize: 24,
                        fontWeight: "700",
                        color: colors.primary,
                        textTransform: "capitalize",
                        letterSpacing: 0.4,
                    }}
                >
                    {fullName || "Tansha Ashraf"}
                </Text>

            </View>
        </ZiraatCard>
    );
}
