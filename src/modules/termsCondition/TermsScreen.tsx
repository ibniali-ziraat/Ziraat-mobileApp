// import BackHeader from "@/src/components/shared/BackHeader";
// import ScreenLayout from "@/src/components/shared/ScreenLayout";
// import { colors } from "@/src/constants/colors";
// import { ScrollView, Text, View } from "react-native";

// const TermsScreen = () => {
//   return (
//     <ScreenLayout>
//       <BackHeader title="Terms & Conditions" />

//       <View
//         style={{
//           flex: 1,
//           backgroundColor: colors.bgColor,
//         }}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//             paddingHorizontal: 20,
//             paddingTop: 10,
//             paddingBottom: 40,
//           }}
//         >
//           {/* Intro Section */}
//           <View style={{ marginBottom: 18 }}>
//             <Text
//               style={{
//                 fontSize: 22,
//                 fontWeight: "700",
//                 color: colors.primary,
//                 marginBottom: 6,
//               }}
//             >
//               Ziraat Terms & Conditions
//             </Text>

//             <Text
//               style={{
//                 fontSize: 14,
//                 color: colors.darkHover,
//                 lineHeight: 20,
//               }}
//             >
//               Please read these terms carefully before using the Ziraat
//               agriculture management application.
//             </Text>
//           </View>

//           {/* Main Card */}
//           <View
//             style={{
//               backgroundColor: colors.light,
//               borderRadius: 16,
//               padding: 18,
//               borderWidth: 1,
//               borderColor: colors.cardBorder,
//             }}
//           >
//             {/* Helper function-style section UI */}
//             {[
//               {
//                 title: "1. Acceptance of Terms",
//                 content:
//                   "By accessing and using the Ziraat application, you agree to comply with these Terms and Conditions. If you do not agree with any part of these terms, you must discontinue use of the app immediately.",
//               },
//               {
//                 title: "2. Lawful Agricultural Use",
//                 content:
//                   "Ziraat is designed for agricultural management, orchard tracking, and pesticide record keeping. Users must comply with all applicable local, regional, and national agricultural laws and regulations.",
//               },
//               {
//                 title: "3. Pesticide Usage Disclaimer",
//                 content:
//                   "Ziraat provides general informational guidance only. Users must strictly follow manufacturer instructions and certified agricultural guidelines when applying pesticides. The company is not responsible for crop damage, misuse, health risks, or environmental impact.",
//               },
//               {
//                 title: "4. User Responsibilities",
//                 content:
//                   "Users are responsible for maintaining accurate crop, orchard, and pesticide records within the application. Unauthorized modification, reverse engineering, or misuse of the platform is strictly prohibited.",
//               },
//               {
//                 title: "5. Data & Privacy",
//                 content:
//                   "Agricultural data such as crop varieties, orchard details, and pesticide logs are stored to enhance user experience. We do not sell user data and only share information when legally required.",
//               },
//               {
//                 title: "6. Limitation of Liability",
//                 content:
//                   "Ziraat shall not be liable for any direct, indirect, incidental, or consequential damages including financial loss, yield reduction, or environmental impact arising from use of the application.",
//               },
//               {
//                 title: "7. Updates & Modifications",
//                 content:
//                   "We reserve the right to modify or update these Terms at any time. Continued use of the application constitutes acceptance of the updated Terms.",
//               },
//             ].map((item, index) => (
//               <View key={index} style={{ marginBottom: 18 }}>
//                 <Text
//                   style={{
//                     fontSize: 16,
//                     fontWeight: "600",
//                     color: colors.primary,
//                     marginBottom: 6,
//                   }}
//                 >
//                   {item.title}
//                 </Text>

//                 <Text
//                   style={{
//                     fontSize: 14,
//                     lineHeight: 22,
//                     color: colors.neutral,
//                   }}
//                 >
//                   {item.content}
//                 </Text>
//               </View>
//             ))}

//             {/* Footer */}
//             <View
//               style={{
//                 borderTopWidth: 1,
//                 borderTopColor: colors.cardBorder,
//                 paddingTop: 12,
//                 marginTop: 10,
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 12,
//                   color: colors.darkHover,
//                   textAlign: "center",
//                 }}
//               >
//                 Last Updated: February 2026
//               </Text>
//             </View>
//           </View>
//         </ScrollView>
//       </View>
//     </ScreenLayout>
//   );
// };

// export default TermsScreen;

import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import {
  AlertTriangle,
  Check,
  Database,
  FileText,
  Leaf,
  Scale,
  ShieldCheck,
  Sprout,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const TermsScreen = () => {
  const [agreed, setAgreed] = useState(false);

  const sections = [
    {
      title: "Acceptance of Terms",
      content:
        "By using Ziraat, you agree to comply with these Terms and all applicable agricultural safety regulations.",
      icon: <FileText size={18} color={colors.primary} />,
    },
    {
      title: "Agricultural Usage",
      content:
        "The application is intended for lawful crop management, orchard tracking, and pesticide record keeping.",
      icon: <Leaf size={18} color={colors.primary} />,
    },
    {
      title: "Pesticide Responsibility",
      content:
        "Users are responsible for safe pesticide handling, correct dosage, and compliance with manufacturer instructions.",
      icon: <Sprout size={18} color={colors.primary} />,
    },
    {
      title: "Environmental Responsibility",
      content:
        "Ensure pesticide use does not cause harm to the environment, water sources, or public health.",
      icon: <ShieldCheck size={18} color={colors.primary} />,
    },
    {
      title: "Data Protection",
      content:
        "Your agricultural data is securely stored and never sold to third parties.",
      icon: <Database size={18} color={colors.primary} />,
    },
    {
      title: "Limitation of Liability",
      content:
        "Ziraat is not liable for crop loss, financial damages, or regulatory penalties resulting from improper usage.",
      icon: <Scale size={18} color={colors.primary} />,
    },
  ];

  return (
    <ScreenLayout>
      <BackHeader title="Terms & Conditions" />

      <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 40,
          }}
        >
          {/* Header */}
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              color: colors.primary,
            }}
          >
            Ziraat Agriculture Platform
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: colors.darkHover,
              marginBottom: 18,
              marginTop: 4,
            }}
          >
            Safe. Smart. Sustainable Farming.
          </Text>

          {/* Important Notice */}
          <View
            style={{
              backgroundColor: colors.secondary,
              borderRadius: 14,
              padding: 16,
              marginBottom: 22,
              borderWidth: 1,
              borderColor: colors.cardBorder,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <AlertTriangle
                size={20}
                color={colors.secondary}
              />
              <Text
                style={{
                  fontWeight: "600",
                  color: colors.secondary,
                  marginLeft: 8,
                  fontSize: 15,
                }}
              >
                Important Notice
              </Text>
            </View>

            <Text
              style={{
                fontSize: 13,
                color: colors.neutral,
                lineHeight: 20,
              }}
            >
              This application provides agricultural guidance only. Always
              follow certified pesticide instructions and local regulations.
            </Text>
          </View>

          {/* Terms Card */}
          <View
            style={{
              backgroundColor: colors.light,
              borderRadius: 18,
              padding: 18,
              borderWidth: 1,
              borderColor: colors.cardBorder,
              marginBottom: 22,
            }}
          >
            {sections.map((item, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  {item.icon}
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: colors.primary,
                      marginLeft: 8,
                    }}
                  >
                    {index + 1}. {item.title}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 22,
                    color: colors.neutral,
                  }}
                >
                  {item.content}
                </Text>
              </View>
            ))}
          </View>

          {/* Regulatory Compliance */}
          <View
            style={{
              backgroundColor: colors.light,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.cardBorder,
              marginBottom: 25,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <ShieldCheck size={18} color={colors.primary} />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: colors.primary,
                  marginLeft: 8,
                }}
              >
                Regulatory Compliance
              </Text>
            </View>

            {[
              "Local Agricultural Guidelines",
              "Government Pesticide Regulations",
              "Environmental Protection Standards",
            ].map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Check size={14} color={colors.primary} />
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.neutral,
                    marginLeft: 6,
                  }}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>

          {/* Agreement */}
          <Pressable
            onPress={() => setAgreed(!agreed)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 22,
            }}
          >
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                borderWidth: 1.5,
                borderColor: colors.primary,
                backgroundColor: agreed
                  ? colors.primary
                  : colors.light,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              {agreed && (
                <Check size={14} color={colors.light} />
              )}
            </View>

            <Text style={{ color: colors.neutral }}>
              I agree to the Terms & Conditions
            </Text>
          </Pressable>

          {/* Accept Button */}
          <Pressable
            disabled={!agreed}
            style={{
              backgroundColor: agreed
                ? colors.primary
                : colors.darkHover,
              paddingVertical: 15,
              borderRadius: 14,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Check size={18} color={colors.light} />
            <Text
              style={{
                color: colors.light,
                fontWeight: "600",
                fontSize: 16,
                marginLeft: 8,
              }}
            >
              Accept & Continue
            </Text>
          </Pressable>

          {/* Footer */}
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              color: colors.darkHover,
            }}
          >
            Last Updated: February 2026
          </Text>

          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              color: colors.darkHover,
              marginTop: 4,
            }}
          >
            Ziraat © 2026
          </Text>
        </ScrollView>
      </View>
    </ScreenLayout>
  );
};

export default TermsScreen;