// import { colors } from "@/src/constants/colors";
// import { Ionicons } from "@expo/vector-icons";
// import { Text, View } from "react-native";

// export default function LegalDisclaimer() {
//   return (
//     <View
//       style={{
//         backgroundColor: colors.bgColor,
//         borderColor: colors.secondary,
//         borderWidth: 1,
//         borderRadius: 14,
//         padding: 14,
//         marginHorizontal: 16,
//         marginBottom: 14,
//       }}
//     >
//       <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
//         <Ionicons
//           name="warning-outline"
//           size={20}
//           color={colors.secondary}
//           style={{ marginRight: 8, marginTop: 2 }}
//         />

//         <Text
//           style={{
//             flex: 1,
//             fontSize: 12,
//             lineHeight: 18,
//             color: colors.neutral,
//           }}
//         >
//           <Text
//             style={{
//               fontWeight: "600",
//               color: colors.dark,
//             }}
//           >
//             Disclaimer:{" "}
//           </Text>

//          ZIRAAT is a technology platform. Sale and supply of fertilizers and pesticides is carried out by licensed vendors in compliance with the Insecticides Act, 1968 and Fertilizer Control Order, 1985. Use pesticides strictly as per label instructions and expert advice
//         </Text>
//       </View>
//     </View>
//   );
// }

import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  UIManager,
  View,
} from "react-native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function LegalDisclaimer() {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View
      style={{
        backgroundColor: colors.bgColor,
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 16,
        // marginHorizontal: 16,
        marginBottom: 6,
        overflow: "hidden",
      }}
    >
      {/* Left Accent Bar */}
      <View
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          backgroundColor: colors.secondary,
        }}
      />

      {/* Header */}
      <Pressable
        activeOpacity={0.8}
        onPress={toggle}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 14,
          paddingHorizontal: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="warning-outline"
            size={18}
            color={colors.secondary}
            style={{ marginRight: 8 }}
          />

          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: colors.dark,
            }}
          >
            Legal Disclaimer
          </Text>
        </View>

        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color={colors.neutral}
        />
      </Pressable>

      {/* Divider */}
      {expanded && (
        <View
          style={{
            height: 1,
            backgroundColor: colors.secondary,
            opacity: 0.3,
            marginHorizontal: 16,
          }}
        />
      )}

      {/* Content */}
      {expanded && (
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 14,
          }}
        >
          <Text
            style={{
              fontSize: 12.5,
              lineHeight: 20,
              color: colors.neutral,
            }}
          >
            ZIRAAT is a technology platform. Sale and supply of fertilizers and
            pesticides is carried out by licensed vendors in compliance with the
            Insecticides Act, 1968 and Fertilizer Control Order, 1985. Use
            pesticides strictly as per label instructions and expert advice.
          </Text>
        </View>
      )}
    </View>
  );
}
